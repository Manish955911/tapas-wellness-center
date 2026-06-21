import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadCaptureWidget from "@/components/LeadCaptureWidget";
import TapasAssistant from "@/components/TapasAssistant";
import { getActiveOffer } from "@/lib/leadsStore";

export async function generateMetadata() {
  const settings = await getActiveOffer();
  return {
    title: settings.seo_title,
    description: settings.seo_description,
    keywords: settings.seo_keywords,
    verification: {
      google: settings.seo_google_verification || undefined,
    },
    alternates: {
      canonical: 'https://tapasyogacenter.com',
    }
  };
}

export default async function RootLayout({ children }) {
  const settings = await getActiveOffer();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "YogaStudio",
    "name": "TAPAS Yoga Therapy & Wellness Center",
    "alternateName": "Tapas Yoga Varanasi",
    "description": settings.seo_description,
    "url": "https://tapasyogacenter.com",
    "logo": "https://tapasyogacenter.com/images/logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Arji No. 154/1, VRF GYM, Near Happy Model School, Paharia",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "221007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.366078,
      "longitude": 83.003516
    },
    "telephone": settings.whatsapp_phone ? `+${settings.whatsapp_phone}` : "+916394554685",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "06:00",
        "closes": "11:30"
      }
    ],
    "sameAs": [
      settings.facebook_link || "https://facebook.com/tapasyogavaranasi",
      settings.instagram_link || "https://instagram.com/tapasyogavaranasi",
      settings.youtube_link || "https://youtube.com/@tapasyogavaranasi"
    ].filter(Boolean)
  };

  return (
    <html lang="en">
      <head>
        {/* Load Inter and Outfit Fonts from Google Fonts CDN to bypass offline build-time font fetching */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <LeadCaptureWidget />
        <TapasAssistant />
      </body>
    </html>
  );
}

