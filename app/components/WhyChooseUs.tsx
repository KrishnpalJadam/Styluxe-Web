import {
  Scissors,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Leaf,
  MonitorSmartphone,
} from "lucide-react";

import "./WhyChooseUs.css";

const whyChooseItems = [
  {
    title: "Certified Master Stylists",
    description:
      "Every stylist undergoes structured Styluxe Academy training on modern cuts, color science, and skin safety SOPs.",
    icon: Scissors,
    iconClass: "tmx-wcu-icon-yellow",
  },
  {
    title: "Hospital-Grade Hygiene",
    description:
      "Sanitized tools after every appointment, fresh linens, and clean botanical suites for total peace of mind.",
    icon: ShieldCheck,
    iconClass: "tmx-wcu-icon-mint",
  },
  {
    title: "Honest Luxury Pricing",
    description:
      "Transparent rate menus that bring five-star salon quality and serene interiors within comfortable everyday reach.",
    icon: Sparkles,
    iconClass: "tmx-wcu-icon-blue",
  },
  {
    title: "High-Yield Salon Economics",
    description:
      "Multi-category revenue across hair, skin, grooming, bridal, and memberships engineered for strong 10–14 month ROI.",
    icon: TrendingUp,
    iconClass: "tmx-wcu-icon-purple",
  },
  {
    title: "Authentic Global Formulations",
    description:
      "100% genuine, dermatologically tested salon brands with centralized procurement and zero product wastage.",
    icon: Leaf,
    iconClass: "tmx-wcu-icon-green",
  },
  {
    title: "Smart Salon POS & Booking",
    description:
      "Seamless appointment scheduling, digital loyalty rewards, automated reminders, and real-time franchise analytics.",
    icon: MonitorSmartphone,
    iconClass: "tmx-wcu-icon-red",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="tmx-why-choose"
      aria-labelledby="tmx-why-choose-title"
    >
      <div className="tmx-why-choose-inner container-xl">
        <div className="tmx-why-choose-intro">
          <div className="tmx-why-choose-product">
            <img
              src="/images/styluxe/salon-products.jpg"
              alt="Styluxe Salons botanical hair and skin formulations"
              loading="lazy"
            />
          </div>

          <h2 id="tmx-why-choose-title" className="tmx-why-choose-heading">
            Luxury Experience.
            <br />
            Honest Pricing.
          </h2>

          <div className="tmx-why-choose-yellow-line" />

          <p className="tmx-why-choose-description">
            Styluxe Salons unites thoughtful hospitality, certified hair and
            skin specialists, and standardized operational excellence —
            delivering effortless confidence for guests and scalable success for
            franchise partners.
          </p>
        </div>

        <div className="tmx-why-choose-content">
          <div className="tmx-why-choose-grid">
            {whyChooseItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="tmx-why-choose-card">
                  <span
                    className="tmx-why-choose-card-number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className={`tmx-why-choose-icon ${item.iconClass}`}>
                    <Icon size={36} strokeWidth={1.6} />
                  </div>

                  <h3 className="tmx-why-choose-card-title">{item.title}</h3>

                  <p className="tmx-why-choose-card-description">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
