"use client";
import Hero from "@/components/ui/Hero";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import React, { useRef, useState } from "react";

import Checkbox from "@/components/form/Checkbox";
import CheckboxGroup from "@/components/form/CheckboxGroup";
import Field from "@/components/form/Field";
import Input from "@/components/form/Input";
import RadioGroup from "@/components/form/RadioGroup";
import SectionCard from "@/components/form/SectionCard";
import Select from "@/components/form/Select";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

const initialState = {
  name: "",
  email: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  weightGoal: "",
  medicalConditions: "",
  medsSupps: "",
  allergies: "",
  deficiencies: "",
  familyHistory: [],
  symptoms: [],
  typicalDay: "",
  homeCooked: "",
  waterIntake: "",
  coffeeYes: "",
  coffeeCups: "",
  teaYes: "",
  teaType: "",
  alcoholYes: "",
  alcoholFrequency: "",
  sugaryYes: "",
  sugaryFrequency: "",
  restrictions: "",
  disorderedEating: "",
  sleepHours: "",
  sleepQuality: "",
  exercise: "",
  exerciseFreq: "",
  stress: "",
  bowelRegular: "",
  bowelFreq: "",
  bloatAfterEat: "",
  foodIntolerances: "",
  goals: [],
  challenges: "",
  foodsToAdjust: "",
  support: [],
  notes: "",
  consent: false,
  hp: "", // honeypot - we'll keep it in state but not send it
};

const opts = {
  homeCooked: ["Daily", "3–5 times per week", "1–2 times per week", "Rarely"],
  waterIntake: ["Less than 4 cups", "4–6 cups", "6–8 cups", "More than 8 cups"],
  sleepQuality: ["Good", "Poor"],
  yesNo: ["Yes", "No"],
  familyHistory: [
    "Diabetes",
    "Heart disease",
    "High blood pressure",
    "Autoimmune disorders",
    "Cancer",
    "Other",
  ],
  symptoms: [
    "Fatigue",
    "Bloating",
    "Constipation",
    "Acid reflux/heartburn",
    "Gas/discomfort after eating",
    "Frequent headaches",
    "Joint pain/inflammation",
    "Mood swings or anxiety",
    "Other",
  ],
  goals: [
    "Weight management",
    "Increased energy",
    "Improved digestion",
    "Hormonal balance",
    "Reduced inflammation",
    "Better sleep",
    "General health improvement",
    "Other",
  ],
  support: [
    "Meal planning",
    "Grocery shopping strategies",
    "Stress management",
    "Mindful eating",
    "Recipe ideas",
    "Other",
  ],
};

export default function IntakePage() {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState(""); // only for errors
  const [showModal, setShowModal] = useState(false);

  const successText =
    "Thanks. Your intake was sent. We also emailed you a confirmation.";

  const set = (k, v) => setData((p) => ({ ...p, [k]: v }));

  const refs = {
    name: useRef(null),
    email: useRef(null),
    age: useRef(null),
    gender: useRef(null),
    height: useRef(null),
    weight: useRef(null),
    typicalDay: useRef(null),
    consent: useRef(null),
  };

  const validate = () => {
    const e = {};
    const emailOk = /^\S+@\S+\.\S+$/.test(data.email || "");
    if (!data.name.trim()) e.name = "Required";
    if (!emailOk) e.email = "Valid email required";
    if (data.age === "" || Number(data.age) < 0) e.age = "Required";
    if (!data.gender.trim()) e.gender = "Required";
    if (!data.height.trim()) e.height = "Required";
    if (!data.weight.trim()) e.weight = "Required";
    if (!data.typicalDay.trim()) e.typicalDay = "Required";
    if (!data.consent) e.consent = "Please accept the disclaimer to proceed";
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");
    const eMap = validate();
    setErrors(eMap);

    if (Object.keys(eMap).length > 0) {
      const order = [
        "name",
        "email",
        "age",
        "gender",
        "height",
        "weight",
        "typicalDay",
        "consent",
      ];
      const first = order.find((k) => eMap[k]);
      const node = refs[first]?.current || document.getElementById(first);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          if (node.focus) node.focus();
        }, 250);
      }
      return;
    }

    try {
      setLoading(true);

      // >>> IMPORTANT: strip honeypot before sending <<<
      const { hp, ...payload } = data;

      const res = await fetch(
        "http://localhost/author/jenifer/api/send-intake.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.ok) {
        setServerMsg(j.message || "Failed to send. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setShowModal(true); // success modal
      setServerMsg(""); // no green banner anymore
      setLoading(false);
      setData(initialState); // reset form
    } catch (err) {
      setServerMsg("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Hero title="Holistic Nutrition Evaluation" italic="Evaluation" />
      <section className="px-2.5">
        <div className="flex flex-col items-center gap-y-8 w-full py-[60px]">
          <div className="p-2.5 md:w-[1024px] flex flex-col items-center text-center gap-2.5">
            <Subtitle>Client Intake Form</Subtitle>
            <Title italic="personalized nutrition & lifestyle review">
              Tell us about your health so we can tailor your plan.
            </Title>
          </div>

          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col items-center gap-6"
          >
            {/* Honeypot (kept, but it won't be sent anymore) */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.hp}
              onChange={(e) => set("hp", e.target.value)}
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                height: 0,
                width: 0,
              }}
              aria-hidden="true"
            />

            <SectionCard title="Basic Info">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" htmlFor="name" required error={errors.name}>
                  <Input
                    id="name"
                    ref={refs.name}
                    invalid={!!errors.name}
                    value={data.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Jane Doe"
                  />
                </Field>

                <Field
                  label="Email"
                  htmlFor="email"
                  required
                  error={errors.email}
                >
                  <Input
                    id="email"
                    ref={refs.email}
                    invalid={!!errors.email}
                    type="email"
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="jane@example.com"
                  />
                </Field>

                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <Field label="Age" htmlFor="age" required error={errors.age}>
                    <Input
                      id="age"
                      ref={refs.age}
                      invalid={!!errors.age}
                      type="number"
                      min="0"
                      value={data.age}
                      onChange={(e) => set("age", e.target.value)}
                    />
                  </Field>
                  <Field
                    label="Gender"
                    htmlFor="gender"
                    required
                    error={errors.gender}
                  >
                    <Input
                      id="gender"
                      ref={refs.gender}
                      invalid={!!errors.gender}
                      value={data.gender}
                      onChange={(e) => set("gender", e.target.value)}
                      placeholder="e.g., Female"
                    />
                  </Field>
                  <Field
                    label="Height"
                    htmlFor="height"
                    required
                    error={errors.height}
                  >
                    <Input
                      id="height"
                      ref={refs.height}
                      invalid={!!errors.height}
                      value={data.height}
                      onChange={(e) => set("height", e.target.value)}
                      placeholder="5'6&quot; or 167 cm"
                    />
                  </Field>
                  <Field
                    label="Weight"
                    htmlFor="weight"
                    required
                    error={errors.weight}
                  >
                    <Input
                      id="weight"
                      ref={refs.weight}
                      invalid={!!errors.weight}
                      value={data.weight}
                      onChange={(e) => set("weight", e.target.value)}
                      placeholder="65 kg"
                    />
                  </Field>
                  <Field
                    label="Weight goal"
                    htmlFor="weightGoal"
                    hint="Optional"
                  >
                    <Input
                      id="weightGoal"
                      value={data.weightGoal}
                      onChange={(e) => set("weightGoal", e.target.value)}
                      placeholder="-5 kg"
                    />
                  </Field>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Health & Medical History">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Diagnosed conditions" htmlFor="medicalConditions">
                  <Textarea
                    id="medicalConditions"
                    value={data.medicalConditions}
                    onChange={(e) => set("medicalConditions", e.target.value)}
                    placeholder="List any diagnosed conditions"
                  />
                </Field>
                <Field label="Medications or supplements" htmlFor="medsSupps">
                  <Textarea
                    id="medsSupps"
                    value={data.medsSupps}
                    onChange={(e) => set("medsSupps", e.target.value)}
                    placeholder="Name, dosage, reason"
                  />
                </Field>
                <Field label="Allergies or sensitivities" htmlFor="allergies">
                  <Textarea
                    id="allergies"
                    value={data.allergies}
                    onChange={(e) => set("allergies", e.target.value)}
                    placeholder="Specify allergens"
                  />
                </Field>
                <Field label="Diagnosed deficiencies" htmlFor="deficiencies">
                  <Textarea
                    id="deficiencies"
                    value={data.deficiencies}
                    onChange={(e) => set("deficiencies", e.target.value)}
                    placeholder="e.g., iron, B12, vitamin D"
                  />
                </Field>

                <Field label="Family history">
                  <CheckboxGroup
                    value={data.familyHistory}
                    onChange={(v) => set("familyHistory", v)}
                    options={opts.familyHistory}
                  />
                </Field>

                <Field label="Regular symptoms">
                  <CheckboxGroup
                    value={data.symptoms}
                    onChange={(v) => set("symptoms", v)}
                    options={opts.symptoms}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Lifestyle & Dietary Habits">
              <div className="space-y-4">
                <Field
                  label="A typical day of eating"
                  htmlFor="typicalDay"
                  required
                  error={errors.typicalDay}
                >
                  <Textarea
                    id="typicalDay"
                    ref={refs.typicalDay}
                    invalid={!!errors.typicalDay}
                    value={data.typicalDay}
                    onChange={(e) => set("typicalDay", e.target.value)}
                    placeholder="Meals, snacks, beverages"
                  />
                </Field>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="How often home-cooked?">
                    <Select
                      value={data.homeCooked}
                      onChange={(v) => set("homeCooked", v)}
                      options={opts.homeCooked}
                      placeholder="Choose frequency"
                    />
                  </Field>
                  <Field label="How much water daily?">
                    <Select
                      value={data.waterIntake}
                      onChange={(v) => set("waterIntake", v)}
                      options={opts.waterIntake}
                      placeholder="Choose amount"
                    />
                  </Field>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Coffee">
                    <div className="flex flex-wrap items-center gap-4">
                      <RadioGroup
                        name="coffeeYes"
                        value={data.coffeeYes}
                        onChange={(v) => set("coffeeYes", v)}
                        options={opts.yesNo}
                      />
                      <Input
                        placeholder="Cups/day"
                        value={data.coffeeCups}
                        onChange={(e) => set("coffeeCups", e.target.value)}
                        className="w-40"
                      />
                    </div>
                  </Field>

                  <Field label="Tea">
                    <div className="flex flex-wrap items-center gap-4">
                      <RadioGroup
                        name="teaYes"
                        value={data.teaYes}
                        onChange={(v) => set("teaYes", v)}
                        options={opts.yesNo}
                      />
                      <Input
                        placeholder="Type"
                        value={data.teaType}
                        onChange={(e) => set("teaType", e.target.value)}
                        className="w-56"
                      />
                    </div>
                  </Field>

                  <Field label="Alcohol">
                    <div className="flex flex-wrap items-center gap-4">
                      <RadioGroup
                        name="alcoholYes"
                        value={data.alcoholYes}
                        onChange={(v) => set("alcoholYes", v)}
                        options={opts.yesNo}
                      />
                      <Input
                        placeholder="Frequency"
                        value={data.alcoholFrequency}
                        onChange={(e) =>
                          set("alcoholFrequency", e.target.value)
                        }
                        className="w-56"
                      />
                    </div>
                  </Field>

                  <Field label="Sugary drinks or soda">
                    <div className="flex flex-wrap items-center gap-4">
                      <RadioGroup
                        name="sugaryYes"
                        value={data.sugaryYes}
                        onChange={(v) => set("sugaryYes", v)}
                        options={opts.yesNo}
                      />
                      <Input
                        placeholder="Frequency"
                        value={data.sugaryFrequency}
                        onChange={(e) => set("sugaryFrequency", e.target.value)}
                        className="w-56"
                      />
                    </div>
                  </Field>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Cultural or religious restrictions"
                    htmlFor="restrictions"
                  >
                    <Textarea
                      id="restrictions"
                      value={data.restrictions}
                      onChange={(e) => set("restrictions", e.target.value)}
                    />
                  </Field>
                  <Field
                    label="History of disordered eating"
                    htmlFor="disorderedEating"
                  >
                    <Select
                      value={data.disorderedEating}
                      onChange={(v) => set("disorderedEating", v)}
                      options={opts.yesNo}
                      placeholder="Select"
                    />
                  </Field>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <Field label="Sleep hours per night" htmlFor="sleepHours">
                    <Input
                      id="sleepHours"
                      value={data.sleepHours}
                      onChange={(e) => set("sleepHours", e.target.value)}
                    />
                  </Field>
                  <Field label="Sleep quality" htmlFor="sleepQuality">
                    <Select
                      value={data.sleepQuality}
                      onChange={(v) => set("sleepQuality", v)}
                      options={opts.sleepQuality}
                      placeholder="Select"
                    />
                  </Field>
                  <Field label="Exercise type" htmlFor="exercise">
                    <Input
                      id="exercise"
                      value={data.exercise}
                      onChange={(e) => set("exercise", e.target.value)}
                      placeholder="e.g., walking, gym"
                    />
                  </Field>
                </div>

                <Field label="Exercise frequency" htmlFor="exerciseFreq">
                  <Input
                    id="exerciseFreq"
                    value={data.exerciseFreq}
                    onChange={(e) => set("exerciseFreq", e.target.value)}
                    placeholder="e.g., 3x/week"
                  />
                </Field>

                <Field
                  label="Main sources of stress and how you manage"
                  htmlFor="stress"
                >
                  <Textarea
                    id="stress"
                    value={data.stress}
                    onChange={(e) => set("stress", e.target.value)}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Digestion & Metabolic Health">
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Regular bowel movements" htmlFor="bowelRegular">
                  <Select
                    value={data.bowelRegular}
                    onChange={(v) => set("bowelRegular", v)}
                    options={opts.yesNo}
                    placeholder="Select"
                  />
                </Field>
                <Field label="Frequency" htmlFor="bowelFreq">
                  <Input
                    id="bowelFreq"
                    value={data.bowelFreq}
                    onChange={(e) => set("bowelFreq", e.target.value)}
                  />
                </Field>
                <Field
                  label="Bloating or gas after eating"
                  htmlFor="bloatAfterEat"
                >
                  <Select
                    value={data.bloatAfterEat}
                    onChange={(v) => set("bloatAfterEat", v)}
                    options={opts.yesNo}
                    placeholder="Select"
                  />
                </Field>
                <Field label="Food intolerances" htmlFor="foodIntolerances">
                  <Textarea
                    id="foodIntolerances"
                    value={data.foodIntolerances}
                    onChange={(e) => set("foodIntolerances", e.target.value)}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Goals & Expectations">
              <div className="space-y-4">
                <Field label="Primary goals">
                  <CheckboxGroup
                    value={data.goals}
                    onChange={(v) => set("goals", v)}
                    options={opts.goals}
                  />
                </Field>
                <Field
                  label="What challenges do you face?"
                  htmlFor="challenges"
                >
                  <Textarea
                    id="challenges"
                    value={data.challenges}
                    onChange={(e) => set("challenges", e.target.value)}
                  />
                </Field>
                <Field label="Foods to add or reduce" htmlFor="foodsToAdjust">
                  <Textarea
                    id="foodsToAdjust"
                    value={data.foodsToAdjust}
                    onChange={(e) => set("foodsToAdjust", e.target.value)}
                  />
                </Field>
                <Field label="What support is most helpful?">
                  <CheckboxGroup
                    value={data.support}
                    onChange={(v) => set("support", v)}
                    options={opts.support}
                  />
                </Field>
                <Field label="Additional notes" htmlFor="notes">
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard type="warning" title="Disclaimer & Consent">
              <div className="space-y-3">
                <p className="text-sm text-zinc-700">
                  I am a Holistic Nutrition Practitioner. The information in
                  this consultation is for educational and wellness purposes and
                  not a substitute for medical advice, diagnosis, or treatment.
                  Consult your healthcare provider for medical conditions or
                  before making significant changes.
                </p>
                <div ref={refs.consent}>
                  <Checkbox
                    label={<span>I understand and agree.</span>}
                    checked={data.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                  />
                </div>
                {errors.consent && (
                  <p className="text-xs text-red-600">{errors.consent}</p>
                )}
              </div>
            </SectionCard>

            <div className="w-full md:w-[1024px] flex flex-col items-end gap-2">
              {/* Only show messages for errors */}
              {serverMsg && !submitted && (
                <p className="text-sm" style={{ color: "#b91c1c" }}>
                  {serverMsg}
                </p>
              )}
              <Button tone="dark" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Thank you"
        footer={
          <Button onClick={() => setShowModal(false)} tone="dark">
            Close
          </Button>
        }
      >
        <p>{successText}</p>
      </Modal>
    </>
  );
}
