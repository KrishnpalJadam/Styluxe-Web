import "./PrivacyPolicy.css";
import { Header, Footer } from "../components";

const privacypagesections = [
    {
        title: "1. Information Collection",
        paragraphs: [
            {
                heading: "1.1 Personal Information:",
                text: "We may collect personal information from you when you voluntarily provide it to us through our website, such as when you book a salon appointment, submit a franchise enquiry, join our membership program, or sign up for our newsletter. This may include your name, email address, phone number, city, and service preferences.",
            },
            {
                heading: "1.2 Automatically Collected Information:",
                text: "When you visit our website, certain technical information may be collected automatically, including your IP address, browser type, operating system, referring URLs, and browsing analytics. We may use cookies and similar technologies to improve website performance. You may disable cookies through your browser settings, though certain features may be affected.",
            },
        ],
    },
    {
        title: "2. Use of Information",
        paragraphs: [
            {
                heading: "2.1 We may use the personal information you provide to us to:",
                bullets: [
                    "Confirm salon appointments, memberships, and franchise consultations.",
                    "Respond to your inquiries, service questions, or support requests.",
                    "Share seasonal offers, beauty guides, and member rewards if you have opted in.",
                    "Improve our studio services, digital booking experience, and client care.",
                    "Monitor and analyze website usage and salon demand trends.",
                ],
            },
            {
                heading: "2.2 We may use automatically collected information to:",
                bullets: [
                    "Personalize your experience and show nearby Styluxe Salons.",
                    "Understand user preferences and improve navigation.",
                    "Maintain website security, reliability, and performance.",
                    "Generate aggregated statistical insights.",
                ],
            },
        ],
    },
    {
        title: "3. Information Sharing and Disclosure",
        paragraphs: [
            {
                heading: "3.1",
                text: "We will never sell, rent, or lease your personal information to third parties without your consent unless required by applicable law.",
            },
            {
                heading: "3.2",
                text: "We may share your information with trusted service partners (such as appointment scheduling, CRM, and payment providers) who assist us in operating our website and salon network under strict confidentiality obligations.",
            },
            {
                heading: "3.3",
                text: "We may disclose information where required to comply with legal obligations, enforce our policies, or protect the rights, property, and safety of Styluxe Salons and our guests.",
            },
        ],
    },
    {
        title: "4. Data Security",
        paragraphs: [
            {
                heading: "4.1",
                text: "We implement appropriate technical and organizational safeguards to protect your personal information against unauthorized access, alteration, disclosure, or loss. While we strive to safeguard all client data, no internet transmission can be guaranteed 100% impenetrable.",
            },
        ],
    },
    {
        title: "5. Links to Third-Party Websites",
        paragraphs: [
            {
                heading: "5.1",
                text: "Our website may contain links to external platforms such as Instagram, Google Maps, or WhatsApp. This Privacy Policy applies solely to the Styluxe Salons website, and we encourage reviewing the privacy terms of external services.",
            },
        ],
    },
    {
        title: "6. Children's Privacy",
        paragraphs: [
            {
                heading: "6.1",
                text: "Our online forms and franchise portals are not directed to individuals under the age of 16. If you believe a minor has submitted personal details without parental consent, please contact us for prompt deletion.",
            },
        ],
    },
    {
        title: "7. Changes to this Privacy Policy",
        paragraphs: [
            {
                heading: "7.1",
                text: "Styluxe Salons reserves the right to update or refine this Privacy Policy as our services evolve. Material updates will be posted on this page with an updated effective date.",
            },
        ],
    },
    {
        title: "8. Contact Us",
        paragraphs: [
            {
                heading: "8.1",
                text: "If you have any questions, concerns, or data requests regarding this Privacy Policy, please reach out to our corporate care desk at hello@styluxe.in or call our official helpline below:",
            },
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <>
            <Header />

            <main className="privacypage">
                {/* Hero Banner */}
                <section className="privacypagehero">
                    <div className="privacypageheroverlay" />

                    <div className="privacypagecontainer privacypageheroinner">
                        <h1 className="privacypagetitle">
                            Privacy &amp; Refund Policy — Styluxe Salons India
                        </h1>

                        <p className="privacypageeffectivedate">
                            Effective Date: 01/Jan/2026
                        </p>
                    </div>
                </section>

                {/* Policy Content */}
                <section className="privacypagebody">
                    <div className="privacypagecontainer">
                        <p className="privacypageintroduction">
                            At Styluxe Salons India, we are committed to protecting the privacy
                            and trust of our salon guests, website visitors, and franchise
                            partners. This Privacy Policy explains how we collect, use,
                            safeguard, and manage information shared on styluxe.in. By
                            accessing or using our website, you agree to the practices
                            described below.
                        </p>

                        <div className="privacypagesections">
                            {privacypagesections.map((section, index) => (
                                <article
                                    className="privacypagesection"
                                    key={section.title}
                                >
                                    <h2 className="privacypagesectiontitle">
                                        {section.title}
                                    </h2>

                                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                                        <div
                                            className="privacypageparagraph"
                                            key={`${index}-${paragraphIndex}`}
                                        >
                                            {paragraph.heading && (
                                                <strong className="privacypagesubtitle">
                                                    {paragraph.heading}{" "}
                                                </strong>
                                            )}

                                            {paragraph.text && <span>{paragraph.text}</span>}

                                            {paragraph.bullets && (
                                                <ul className="privacypagelist">
                                                    {paragraph.bullets.map((bullet) => (
                                                        <li key={bullet}>{bullet}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </article>
                            ))}

                            {/* Refund Policy */}
                            <article className="privacypagesection">
                                <h2 className="privacypagesectiontitle">
                                    9. Refund &amp; Rescheduling Policy
                                </h2>

                                <div className="privacypageparagraph">
                                    <strong className="privacypagesubtitle">
                                        9.1{" "}
                                    </strong>
                                    <span>
                                        All booking advances and payments made toward Styluxe Salons
                                        franchise onboarding are non-refundable once project
                                        allocation and architectural planning begin. Salon service
                                        appointments may be rescheduled with at least 4 hours&apos;
                                        prior notice. For assistance with any booking or franchise
                                        billing enquiry, please contact our official helpline:
                                    </span>
                                </div>

                                <p className="privacypagehelpline">
                                    Official Helpline: +91 9505 047 047 &nbsp;|&nbsp; Email: hello@styluxe.in
                                </p>

                                <p className="privacypageparagraph">
                                    By confirming an appointment or franchise onboarding payment
                                    with Styluxe Salons, you acknowledge that you have read,
                                    understood, and agreed to the terms of this Privacy &amp; Refund Policy.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
