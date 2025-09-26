<?php
$cfg = require __DIR__.'/config.php';
require __DIR__.'/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$m = new PHPMailer(true);
$m->isSMTP();
$m->Host = $cfg['SMTP_HOST'];
$m->SMTPAuth = true;
$m->Username = $cfg['SMTP_USER'];
$m->Password = $cfg['SMTP_PASS'];
$m->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$m->Port = 465;
$m->setFrom($cfg['FROM_EMAIL'], $cfg['FROM_NAME']);
$m->addAddress('your.other.mailbox@example.com');
$m->isHTML(true);
$m->Subject = 'PHPMailer test';
$m->Body = '<b>It works</b>';
$m->send();
echo 'ok';
