import { FAQS, HOSPITAL_PROFILE } from "./config";

// Keep visible questions and FAQ structured data in sync.
const visitQuestions = [
  {
    id: "booking-guide",
    category: "appointment",
    question: "How do I book an appointment?",
    answer: `Choose a doctor on our appointment page and continue to Doctor Dekho. Call ${HOSPITAL_PROFILE.phone} if you need help.`,
  },
  {
    id: "bring-reports",
    category: "consultation",
    question: "What should I bring to my consultation?",
    answer:
      "Bring previous reports, prescriptions, a list of your medicines and the questions you’d like to ask.",
  },
  {
    id: "find-hospital",
    category: "hospital",
    question: "Where is the hospital?",
    answer: HOSPITAL_PROFILE.address.fullFormatted,
  },
];
export const PATIENT_FAQS = [
  ...visitQuestions,
  ...FAQS.filter(
    (f) =>
      f.category !== "appointment" &&
      !f.question.includes("[PLACEHOLDER") &&
      !f.answer.includes("[PLACEHOLDER"),
  ),
].filter(
  (item, index, all) =>
    all.findIndex((f) => f.question === item.question) === index,
);
