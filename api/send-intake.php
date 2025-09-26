<?php
// --- CORS: allow Next.js dev origin, handle preflight early ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['http://localhost:3000', 'http://127.0.0.1:3000'];

if (in_array($origin, $allowed, true)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Vary: Origin");
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

// JSON responses from here
header('Content-Type: application/json');

// Load config
$cfgPath = __DIR__ . '/config.php';
if (!file_exists($cfgPath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Missing config.php']);
  exit;
}
$cfg = require $cfgPath;

// Read JSON
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  echo json_encode(['ok' => false, 'message' => 'Invalid JSON']);
  exit;
}

// Honeypot
if (!empty($data['hp'] ?? '')) {
  echo json_encode(['ok' => true, 'message' => 'Thanks']);
  exit;
}

// Helpers
function s($v) { return htmlspecialchars(trim((string)$v), ENT_QUOTES, 'UTF-8'); }
function chips($arr) {
  if (!is_array($arr) || !count($arr)) return '<em>None</em>';
  $out = [];
  foreach ($arr as $x) {
    $x = s($x);
    $out[] = '<span style="display:inline-block;margin:2px 4px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;font-size:12px;line-height:1;color:#111827;background:#fff;">'.$x.'</span>';
  }
  return implode('', $out);
}

// Server-side validation
$errors = [];
$required = ['name','email','age','gender','height','weight','typicalDay','consent'];
foreach ($required as $f) {
  if (!isset($data[$f]) || $data[$f] === '' || $data[$f] === false) {
    $errors[$f] = 'Required';
  }
}
if (!empty($data['email']) && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
  $errors['email'] = 'Invalid email';
}
if (!empty($errors)) {
  echo json_encode(['ok' => false, 'errors' => $errors, 'message' => 'Validation failed']);
  exit;
}

// Values
$name  = s($data['name']);
$email = s($data['email']);
$brand = $cfg['BRAND_NAME'] ?? 'Your Brand';

// Email content builders
$section = function($title, $rowsHtml) {
  return '
  <tr>
    <td style="padding:16px 0;border-top:1px solid #eef0f3;">
      <h3 style="margin:0 0 8px;font-size:16px;color:#0f172a;">'.$title.'</h3>
      '.$rowsHtml.'
    </td>
  </tr>';
};
$row = function($label, $valueHtml) {
  return '
  <div style="margin:6px 0;">
    <div style="font-size:12px;color:#6b7280;margin-bottom:2px;">'.$label.'</div>
    <div style="font-size:14px;color:#111827;">'.$valueHtml.'</div>
  </div>';
};

$basicRows =
  $row('Name', s($data['name'])) .
  $row('Email', s($data['email'])) .
  $row('Age', s($data['age'])) .
  $row('Gender', s($data['gender'])) .
  $row('Height', s($data['height'])) .
  $row('Weight', s($data['weight'])) .
  $row('Weight Goal', s($data['weightGoal'] ?? ''));

$medicalRows =
  $row('Diagnosed conditions', nl2br(s($data['medicalConditions'] ?? ''))) .
  $row('Medications or supplements', nl2br(s($data['medsSupps'] ?? ''))) .
  $row('Allergies or sensitivities', nl2br(s($data['allergies'] ?? ''))) .
  $row('Diagnosed deficiencies', nl2br(s($data['deficiencies'] ?? ''))) .
  $row('Family history', chips($data['familyHistory'] ?? []) ) .
  $row('Regular symptoms', chips($data['symptoms'] ?? []) );

$lifestyleRows =
  $row('Typical day of eating', nl2br(s($data['typicalDay'] ?? ''))) .
  $row('How often home-cooked', s($data['homeCooked'] ?? '')) .
  $row('Water intake', s($data['waterIntake'] ?? '')) .
  $row('Coffee', s(($data['coffeeYes'] ?? '') . ($data['coffeeCups'] ? ' — ' . $data['coffeeCups'].' cups/day' : ''))) .
  $row('Tea', s(($data['teaYes'] ?? '') . ($data['teaType'] ? ' — ' . $data['teaType'] : ''))) .
  $row('Alcohol', s(($data['alcoholYes'] ?? '') . ($data['alcoholFrequency'] ? ' — ' . $data['alcoholFrequency'] : ''))) .
  $row('Sugary drinks', s(($data['sugaryYes'] ?? '') . ($data['sugaryFrequency'] ? ' — ' . $data['sugaryFrequency'] : ''))) .
  $row('Restrictions', nl2br(s($data['restrictions'] ?? ''))) .
  $row('Sleep hours', s($data['sleepHours'] ?? '')) .
  $row('Sleep quality', s($data['sleepQuality'] ?? '')) .
  $row('Exercise', s($data['exercise'] ?? '')) .
  $row('Exercise frequency', s($data['exerciseFreq'] ?? '')) .
  $row('Stress', nl2br(s($data['stress'] ?? '')));

$digestionRows =
  $row('Regular bowel movements', s($data['bowelRegular'] ?? '')) .
  $row('Frequency', s($data['bowelFreq'] ?? '')) .
  $row('Bloating after eating', s($data['bloatAfterEat'] ?? '')) .
  $row('Food intolerances', nl2br(s($data['foodIntolerances'] ?? '')));

$goalsRows =
  $row('Primary goals', chips($data['goals'] ?? [])) .
  $row('Challenges', nl2br(s($data['challenges'] ?? ''))) .
  $row('Foods to add or reduce', nl2br(s($data['foodsToAdjust'] ?? ''))) .
  $row('Support requested', chips($data['support'] ?? [])) .
  $row('Additional notes', nl2br(s($data['notes'] ?? '')));

$adminContent =
  $section('Basic Info', $basicRows) .
  $section('Health & Medical History', $medicalRows) .
  $section('Lifestyle & Dietary Habits', $lifestyleRows) .
  $section('Digestion & Metabolic Health', $digestionRows) .
  $section('Goals & Expectations', $goalsRows);

// Templates (with fallback)
$adminTplPath = __DIR__.'/templates/intake-admin.html';
$userTplPath  = __DIR__.'/templates/intake-user.html';
$adminTpl = file_exists($adminTplPath) ? file_get_contents($adminTplPath) : '<html><body>{{CONTENT}}</body></html>';
$userTpl  = file_exists($userTplPath)  ? file_get_contents($userTplPath)  : '<html><body>{{CONTENT}}</body></html>';

$adminHtml = str_replace(
  ['{{TITLE}}','{{PREHEADER}}','{{CONTENT}}','{{BRAND}}'],
  ['New Intake Submission','New intake received',$adminContent,$brand],
  $adminTpl
);

$userContent = '
  <tr><td style="padding:12px 0;color:#111827;font-size:14px;">Hi '. $name .',</td></tr>
  <tr><td style="padding:4px 0 12px;color:#111827;font-size:14px;">Thanks for completing the Holistic Nutrition Evaluation. We have received your details and will review your intake shortly.</td></tr>
  <tr><td style="padding:12px 0;color:#6b7280;font-size:12px;">If you did not submit this form, you can ignore this email.</td></tr>
';
$userHtml = str_replace(
  ['{{TITLE}}','{{PREHEADER}}','{{CONTENT}}','{{BRAND}}'],
  ['We received your intake','Thank you for your submission',$userContent,$brand],
  $userTpl
);

// PHPMailer includes: Composer or manual
$autoload1 = __DIR__ . '/vendor/autoload.php';
$manualDir = __DIR__ . '/vendor/PHPMailer/src';
if (file_exists($autoload1)) {
  require $autoload1;
} else {
  require $manualDir . '/PHPMailer.php';
  require $manualDir . '/SMTP.php';
  require $manualDir . '/Exception.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Mailer factory with optional SMTP debug to file
function mailer($cfg, $label = 'mailer') {
  $m = new PHPMailer(true);
  $m->isSMTP();
  $m->Host       = $cfg['SMTP_HOST'];
  $m->SMTPAuth   = true;
  $m->Username   = $cfg['SMTP_USER'];
  $m->Password   = $cfg['SMTP_PASS'];
  $m->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
  $m->Port       = (int)$cfg['SMTP_PORT'];      // 465
  $m->CharSet    = 'UTF-8';
  $m->isHTML(true);
  $m->setFrom($cfg['FROM_EMAIL'], $cfg['FROM_NAME']);

  if (!empty($cfg['DEBUG_SMTP'])) {
    $m->SMTPDebug = 2; // client + server
    $m->Debugoutput = function($str, $level) use ($cfg, $label) {
      $log = $cfg['DEBUG_LOG'] ?? (__DIR__.'/mail.log');
      $line = '['.date('c')."] [$label][$level] $str\n";
      file_put_contents($log, $line, FILE_APPEND);
    };
  }
  return $m;
}

// Send both emails
try {
  // Admin email
  $m1 = mailer($cfg, 'admin');
  $m1->addAddress($cfg['ADMIN_EMAIL']);
  if ($email) $m1->addReplyTo($email, $name);
  $m1->Subject = 'New Intake Submission: '.$name;
  $m1->Body    = $adminHtml;
  $m1->AltBody = "New intake submission from $name <$email>";
  $m1->send();
  if (!empty($cfg['DEBUG_SMTP'])) {
    $log = $cfg['DEBUG_LOG'] ?? (__DIR__.'/mail.log');
    file_put_contents($log, '['.date('c')."] [admin] Message-ID: ".$m1->getLastMessageID()."\n", FILE_APPEND);
  }

  // Auto-reply to user
  $m2 = mailer($cfg, 'user');
  $m2->addAddress($email, $name);
  $m2->Subject = ($cfg['BRAND_NAME'] ?? 'Our Team').' — We received your intake';
  $m2->Body    = $userHtml;
  $m2->AltBody = "Thanks $name, we received your intake at ".($cfg['BRAND_NAME'] ?? 'our practice').".";
  $m2->send();
  if (!empty($cfg['DEBUG_SMTP'])) {
    $log = $cfg['DEBUG_LOG'] ?? (__DIR__.'/mail.log');
    file_put_contents($log, '['.date('c')."] [user] Message-ID: ".$m2->getLastMessageID()."\n", FILE_APPEND);
  }

  echo json_encode(['ok' => true, 'message' => 'Sent']);
} catch (Exception $e) {
  http_response_code(500);
  $detail = $e->getMessage();
  if (!empty($cfg['DEBUG_SMTP'])) {
    $log = $cfg['DEBUG_LOG'] ?? (__DIR__.'/mail.log');
    file_put_contents($log, '['.date('c')."] [error] $detail\n", FILE_APPEND);
  }
  echo json_encode(['ok' => false, 'message' => 'Mailer error', 'detail' => $detail]);
}
