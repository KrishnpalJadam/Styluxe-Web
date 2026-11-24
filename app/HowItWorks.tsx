"use client";

import { FileText, MessageCircle, Scissors, Sparkles } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Enquire",
    detail: "Share your city & salon franchise goals",
  },
  {
    icon: MessageCircle,
    title: "Consult",
    detail: "Review financials & site feasibility with our team",
  },
  {
    icon: Scissors,
    title: "Design & Train",
    detail: "Turnkey interior build & certified stylist academy",
  },
  {
    icon: Sparkles,
    title: "Grand Launch",
    detail: "Open your Styluxe Salon with full marketing support",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="steps-section container-xl"
      aria-labelledby="how-heading"
    >
      <div className="section-heading steps-heading">
        <div>
          <h2 id="how-heading">How It Works?</h2>
          <span className="short-line" />
        </div>
      </div>

      <div className="steps-grid">
        {steps.map(({ icon: Icon, title, detail }, index) => (
          <div className="step" key={title}>
            <div className="step-count">
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>

            <div className="step-icon-wrap">
              <Icon size={38} strokeWidth={1.6} />
            </div>

            <h3>{title}</h3>
            <p>{detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
