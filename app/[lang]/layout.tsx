import type { Metadata } from "next";
import { getDict, LANGS, Lang } from "@/lib/i18n/dictionaries";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = getDict(params.lang);
  const base = "https://www.gigilcoiffure.be";
  const locale = params.lang === "fr" ? "fr_BE" : params.lang === "nl" ? "nl_BE" : "en_GB";
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: {
      canonical: `${base}/${params.lang}`,
      languages: {
        fr: `${base}/fr`,
        nl: `${base}/nl`,
        en: `${base}/en`,
        "x-default": `${base}/fr`,
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `${base}/${params.lang}`,
      siteName: "GiGi L Coiffure",
      locale,
      type: "website",
      images: [
        {
          url: `${base}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "GiGi L Coiffure — Tongeren",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

const schema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "GiGi L Coiffure",
  description:
    "Salon de coiffure africaine et européenne à Tongres, spécialisé dans les cheveux bouclés, frisés et crépus. Tresses, tissage, microshading, prothèse ongulaire, perruques et mèches.",
  url: "https://www.gigilcoiffure.be",
  telephone: "+32484164905",
  image: "https://www.gigilcoiffure.be/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Koninksemsteenweg 144",
    postalCode: "3700",
    addressLocality: "Tongeren",
    addressRegion: "Limburg",
    addressCountry: "BE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 50.7763, longitude: 5.4537 },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", reviewCount: "28" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://www.google.com/maps/place/Koninksemsteenweg+144,+3700+Tongeren",
  priceRange: "€€",
  servesCuisine: undefined,
  sameAs: ["https://www.facebook.com/100093316226955"],
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {children}
    </>
  );
}
