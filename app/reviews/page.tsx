import Link from "next/link";
import type { Metadata } from "next";
import { Header, Footer, JsonLd } from "../components";
import { ReviewClient, type ReviewCategory, type ReviewItem } from "./review-client";
import { getReviews, getReviewCategories } from "../lib/api";

function mapDbReviewToReviewItem(rev: any): ReviewItem {
    return {
        id: rev.id,
        type: (rev.categoryId || rev.reviewType || "customer") as "franchise" | "staff" | "customer",
        name: rev.reviewerName,
        location: rev.reviewerRole || (rev.relatedCentreName ? `Styluxe Salon, ${rev.relatedCentreName}` : "Styluxe Salons"),
        image: rev.reviewerAvatar || "/images/styluxe/salon-interior.jpg",
        review: rev.reviewText,
        link: rev.viewMoreLink || undefined,
        stars: Number(rev.starRating || 5),
        isFeatured: Boolean(rev.isFeatured),
    };
}

export const dynamic = "force-static";

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.styluxe.in";

export const metadata: Metadata = {
    title: "Styluxe Salons Reviews | Clients, Stylists & Franchise Partners",
    description:
        "Read verified stories and reviews shared by Styluxe Salons clients, certified stylists, and franchise partners about salon services, studio setup, training, and ongoing support.",
    keywords: [
        "Styluxe reviews",
        "Styluxe Salons reviews",
        "Styluxe franchise partner stories",
        "Styluxe client reviews",
        "luxury unisex salon reviews India",
    ],
    alternates: { canonical: `${siteUrl}/reviews/` },
    openGraph: {
        title: "Styluxe Salons Reviews | Clients, Stylists & Franchise Partners",
        description:
            "Read verified stories and reviews shared by Styluxe Salons clients, certified stylists, and franchise partners.",
        url: `${siteUrl}/reviews/`,
        type: "website",
        images: [
            {
                url: "/images/styluxe/salon-interior.jpg",
                width: 1200,
                height: 675,
                alt: "Styluxe Salons Luxury Interior",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Styluxe Salons Reviews | Verified Client & Partner Stories",
        description:
            "Authentic reviews from salon guests, certified stylists, and franchise partners across India.",
        images: ["/images/styluxe/salon-interior.jpg"],
    },
};

const reviewCategories: ReviewCategory[] = [
    { id: "all", name: "All Reviews", icon: "all" },
    { id: "franchise", name: "Franchise Partner Reviews", icon: "franchise" },
    { id: "staff", name: "Stylist & Team Reviews", icon: "staff" },
    { id: "customer", name: "Client Reviews", icon: "customer" },
];

const reviews: ReviewItem[] = [
    {
        id: "default-1",
        type: "franchise",
        name: "Mr. Vikram Reddy",
        location: "Styluxe Salon Kompally, Hyderabad",
        image: "/images/styluxe/franchise-studio.jpg",
        review:
            "From architectural floor plans to recruiting and certifying our stylists, the Styluxe corporate team handled every step seamlessly. Our studio reached strong monthly bookings in the very first quarter.",
        stars: 5,
        isFeatured: true,
    },
    {
        id: "default-2",
        type: "franchise",
        name: "Ms. Meera Deshmukh",
        location: "Styluxe Salon Jubilee Hills, Hyderabad",
        image: "/images/styluxe/salon-interior.jpg",
        review:
            "The transparency in setup costs, hygiene protocols, and CRM booking automation sets Styluxe apart. Clients immediately notice the calm botanical ambience and keep returning.",
        stars: 5,
        isFeatured: true,
    },
    {
        id: "default-3",
        type: "franchise",
        name: "Mr. Rohan Kapoor",
        location: "Styluxe Salon Vijay Nagar, Indore",
        image: "/images/styluxe/salon-equipment.jpg",
        review:
            "Investing in Styluxe gave me a structured, high-margin salon business without needing prior beauty industry experience. Their ongoing technical training keeps our service quality unmatched.",
        stars: 5,
    },
    {
        id: "staff-1",
        type: "staff",
        name: "Aarav Sharma",
        location: "Senior Hair Director, Hyderabad",
        image: "/images/styluxe/service-hair.jpg",
        review:
            "The Styluxe Academy upskills us regularly in global balayage, hair spa, and keratin techniques. Working in such a spotless, uplifting studio makes every client transformation rewarding.",
        stars: 5,
    },
    {
        id: "staff-2",
        type: "staff",
        name: "Priya Verma",
        location: "Lead Aesthetician, Bengaluru",
        image: "/images/styluxe/service-skin.jpg",
        review:
            "Our hygiene standards and dermatologically trusted botanical skin ranges let us deliver real, visible glow results. Clients trust our recommendations because we genuinely put care first.",
        stars: 5,
    },
    {
        id: "customer-1",
        type: "customer",
        name: "Ananya Mehta",
        location: "Styluxe Salon, Hyderabad",
        image: "/images/styluxe/hero-salon.jpg",
        review:
            "Hands down the cleanest, most calming salon I have visited. My keratin smoothing and layered blowout stayed glossy for weeks—truly affordable luxury.",
        stars: 5,
        isFeatured: true,
    },
    {
        id: "customer-2",
        type: "customer",
        name: "Rahul Jain",
        location: "Styluxe Salon, Indore",
        image: "/images/styluxe/service-grooming.jpg",
        review:
            "Booked my haircut, beard sculpting, and charcoal detox ritual online with zero waiting time. Every tool was freshly sanitized and the stylists really listened to what suited me.",
        stars: 5,
    },
    {
        id: "customer-3",
        type: "customer",
        name: "Simran Patel",
        location: "Styluxe Salon, Bhopal",
        image: "/images/styluxe/service-makeup.jpg",
        review:
            "Booked my bridal reception makeup and gel manicure at Styluxe. The finish looked luminous and natural both in person and in every photograph.",
        stars: 5,
    },
    {
        id: "customer-4",
        type: "customer",
        name: "Kavya Nair",
        location: "Styluxe Salon, Vijayawada",
        image: "/images/styluxe/service-nails.jpg",
        review:
            "Loved the signature hydra-glow facial and spa pedicure. The warm cream-and-forest aesthetic feels like a serene boutique spa right in the neighbourhood.",
        stars: 5,
    },
];

const reviewsSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": `${siteUrl}/reviews#page`,
            name: "Styluxe Salons Reviews",
            url: `${siteUrl}/reviews`,
            description:
                "Reviews and stories from Styluxe Salons franchise partners, certified stylists, and clients.",
            mainEntity: {
                "@type": "ItemList",
                itemListElement: reviews.map((review, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "Review",
                        name: `${review.type} review by ${review.name}`,
                        reviewBody: review.review,
                        reviewRating: {
                            "@type": "Rating",
                            ratingValue: review.stars,
                            bestRating: 5,
                        },
                        author: { "@type": "Person", name: review.name },
                    },
                })),
            },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Reviews",
                    item: `${siteUrl}/reviews`,
                },
            ],
        },
    ],
};

export default async function ReviewPage() {
    let items = reviews;
    let categories = reviewCategories;

    try {
        const [dbReviews, dbCategories] = await Promise.all([
            getReviews({ status: "published" }),
            getReviewCategories(),
        ]);
        if (Array.isArray(dbReviews) && dbReviews.length > 0) {
            items = dbReviews.map(mapDbReviewToReviewItem);
        }
        if (Array.isArray(dbCategories) && dbCategories.length > 0) {
            categories = dbCategories[0]?.id === "all"
                ? dbCategories
                : [{ id: "all", name: "All Reviews", icon: "all" }, ...dbCategories];
        }
    } catch (e) {
        // Fallback to curated Styluxe reviews if backend is unavailable
    }

    return (
        <>
            <Header active="/reviews" />
            <main className="tx-menu-page">
                <section
                    className="stx-page-hero stx-page-hero--reviews"
                    aria-labelledby="stx-reviews-title"
                >
                    <div className="stx-page-hero__inner stx-page-hero__inner--centered">
                        <nav className="stx-page-hero__crumb" aria-label="Breadcrumb">
                            <Link href="/">Home</Link>
                            <span aria-hidden="true">/</span>
                            <span>Reviews</span>
                        </nav>

                        <p className="stx-page-hero__eyebrow">
                            <img
                                src="/images/styluxe-emblem.svg"
                                alt=""
                                width={18}
                                height={18}
                                aria-hidden="true"
                            />
                            CLIENT &amp; PARTNER VOICES
                        </p>

                        <h1 id="stx-reviews-title" className="stx-page-hero__title">
                            Stories of <em>Confidence &amp; Care</em>
                        </h1>

                        <p className="stx-page-hero__lead">
                            Authentic reflections from salon guests, certified Styluxe stylists,
                            and franchise partners across India.
                        </p>

                        <div className="stx-page-hero__stats" aria-label="Styluxe community trust highlights">
                            <div className="stx-page-hero__stat">
                                <strong>4.9 / 5</strong>
                                <span>Guest Rating</span>
                            </div>
                            <span className="stx-page-hero__divider" aria-hidden="true" />
                            <div className="stx-page-hero__stat">
                                <strong>100%</strong>
                                <span>Sanitized Protocols</span>
                            </div>
                            <span className="stx-page-hero__divider" aria-hidden="true" />
                            <div className="stx-page-hero__stat">
                                <strong>Pan-India</strong>
                                <span>Trusted Community</span>
                            </div>
                        </div>
                    </div>
                </section>

                <ReviewClient categories={categories} items={items} />
            </main>
            <Footer />
            <JsonLd data={reviewsSchema} />
        </>
    );
}
