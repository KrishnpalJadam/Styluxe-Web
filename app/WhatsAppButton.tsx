import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919505047047?text=Hi%20Styluxe%20Salons%2C%20I%20would%20like%20to%20book%20an%20appointment%20or%20enquire%20about%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="tm-whatsapp-float"
      aria-label="Chat with Styluxe Salons on WhatsApp"
      title="Chat with Styluxe on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
