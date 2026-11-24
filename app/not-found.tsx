import Link from "next/link";
import { Header, Footer } from "./components";

export default function NotFound() {
    return (
        <>
            <Header />

            <main
                className="not-found-page"
                style={{
                    minHeight: "76vh",
                    backgroundColor: "#FAF8F4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "130px 20px 80px",
                    textAlign: "center",
                }}
            >
                <div style={{ maxWidth: "560px", margin: "0 auto" }}>
                    <img
                        src="/images/styluxe-emblem.svg"
                        alt="Styluxe Salons Emblem"
                        width={54}
                        height={54}
                        style={{ margin: "0 auto 18px", display: "block" }}
                    />
                    <span
                        style={{
                            display: "inline-block",
                            fontSize: "12px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#4A5D46",
                            fontWeight: 600,
                            marginBottom: "10px",
                        }}
                    >
                        404 · Page Not Found
                    </span>
                    <h1
                        style={{
                            fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
                            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                            color: "#0D3B26",
                            fontWeight: 500,
                            lineHeight: 1.12,
                            margin: "0 0 16px",
                        }}
                    >
                        Let&apos;s Guide You Back to <em>Calm &amp; Care</em>
                    </h1>
                    <p
                        style={{
                            fontSize: "15.5px",
                            lineHeight: 1.7,
                            color: "#55615A",
                            margin: "0 0 30px",
                        }}
                    >
                        The page you are looking for may have moved or is no longer available. Explore our signature salon services, find a nearby Styluxe studio, or return to the homepage.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link href="/" className="tm-btn tm-btn-teal">
                            Back to Home
                        </Link>
                        <Link href="/services" className="tm-btn tm-btn-outline">
                            Explore Services
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
