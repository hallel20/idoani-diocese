import { Metadata } from "next";
import { PrismaClient } from "@prisma/client";
import HeroSection from "@/components/hero-section";
import DirectorySection from "@/components/directory-section";
import EventsSection from "@/components/events-section";
import ContactSection from "@/components/contact-section";
import BishopChargeSection from "@/components/bishop-charge-section";

const prisma = new PrismaClient();

// SEO Metadata
export const metadata: Metadata = {
  title: "Idoani Diocese | Anglican Church Diocese of Idoani - Ondo State, Nigeria",
  description: "Welcome to the Anglican Diocese of Idoani, Ondo State. Find parishes, events, and worship services in Idoani Diocese. Join our Anglican community for spiritual growth and fellowship.",
  keywords: [
    "Idoani Diocese",
    "Diocese of Idoani",
    "Anglican Church Idoani",
    "Idoani Anglican Diocese",
    "Anglican Diocese Ondo State",
    "Church in Idoani",
    "Diocese Nigeria",
    "Anglican Communion Idoani",
    "Bishop of Idoani",
    "Parishes in Idoani",
    "Idoani Cathedral",
    "Anglican worship Idoani",
    "Christian community Idoani",
    "Church services Idoani",
    "Anglican liturgy Idoani"
  ],
  authors: [{ name: "Diocese of Idoani" }],
  creator: "Anglican Diocese of Idoani",
  publisher: "Diocese of Idoani",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://idoanidiocese.org",
    siteName: "Diocese of Idoani",
    title: "Anglican Diocese of Idoani - Ondo State, Nigeria",
    description: "Official website of the Anglican Diocese of Idoani. Find parishes, worship services, events and connect with our Anglican community in Ondo State, Nigeria.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anglican Diocese of Idoani - Ondo State",
    description: "Join the Anglican Diocese of Idoani community. Find parishes, worship services, and spiritual fellowship in Ondo State, Nigeria.",
    creator: "@IdoaniDiocese",
  },
  alternates: {
    canonical: "https://idoanidiocese.org",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "religion",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ReligiousOrganization",
  "name": "Anglican Diocese of Idoani",
  "alternateName": [
    "Diocese of Idoani",
    "Idoani Diocese",
    "Anglican Church Idoani"
  ],
  "description": "The Anglican Diocese of Idoani is a vibrant Christian community serving Ondo State, Nigeria, with parishes dedicated to worship, fellowship, and community service.",
  "url": "https://idoanidiocese.org",
  "logo": "https://idoanidiocese.org/images/diocese-logo.png",
  "image": "https://idoanidiocese.org/images/diocese-main.jpg",
  "telephone": "+234-XXX-XXX-XXXX",
  "email": "info@idoanidiocese.org",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Cathedral Church of St. Michael",
    "addressLocality": "Idoani",
    "addressRegion": "Ondo State",
    "addressCountry": "Nigeria"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "7.1475",
    "longitude": "5.6458"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Ondo State, Nigeria"
  },
  "member": {
    "@type": "Organization",
    "name": "Anglican Communion",
    "url": "https://www.anglicancommunion.org/"
  },
  "parentOrganization": {
    "@type": "ReligiousOrganization",
    "name": "Church of Nigeria (Anglican Communion)",
    "url": "https://anglican-nig.org/"
  },
  "founder": {
    "@type": "Person",
    "name": "Anglican Missionaries"
  },
  "sameAs": [
    "https://www.facebook.com/IdoaniDiocese",
    "https://www.twitter.com/IdoaniDiocese",
    "https://www.instagram.com/IdoaniDiocese"
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://idoanidiocese.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

async function getHomePageData() {
  try {
    const [parishes, events, bishopCharge] = await Promise.all([
      prisma.parish.findMany({
        include: { archdeaconry: true },
        orderBy: { createdAt: "desc" },
        take: 4, // Limit to 4 parishes for homepage
      }),
      prisma.event.findMany({
        where: {
          date: { gte: new Date() }
        },
        orderBy: { date: "asc" },
        take: 4, // Limit to 4 upcoming events for homepage
      }),
      prisma.bishopCharge.findFirst({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { parishes, events, bishopCharge };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return { parishes: [], events: [], bishopCharge: null };
  }
}

export default async function HomePage() {
  const { parishes, events, bishopCharge } = await getHomePageData();
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        
        <HeroSection />
        
        {/* Bishop's Charge Section */}
        {bishopCharge && <BishopChargeSection charge={bishopCharge} />}
        
        {/* Mission & Vision Section - SEO Enhanced */}
        <section className="py-20 bg-white" id="mission-vision">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-anglican-purple-700 mb-4">
                Mission & Vision of Idoani Diocese
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The Anglican Diocese of Idoani is guided by scripture and tradition, seeking to be faithful witnesses of Christ's love throughout Ondo State and beyond.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <article className="text-center p-8 rounded-xl bg-anglican-purple-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-anglican-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-4">
                  Love & Service in Idoani Community
                </h3>
                <p className="text-gray-600">
                  Following Christ's example of love and service, the Diocese of Idoani ministers to all people in Ondo State, especially the marginalized and vulnerable communities.
                </p>
              </article>
              
              <article className="text-center p-8 rounded-xl bg-anglican-purple-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-anglican-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-4">
                  Anglican Community Fellowship
                </h3>
                <p className="text-gray-600">
                  Building strong, inclusive Anglican communities across Idoani Diocese where all are welcomed and valued as children of God in our parishes throughout Ondo State.
                </p>
              </article>
              
              <article className="text-center p-8 rounded-xl bg-anglican-purple-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-anglican-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-4">
                  Anglican Scripture & Tradition
                </h3>
                <p className="text-gray-600">
                  Grounded in the richness of Anglican liturgy, scripture, and historic Christian faith, Idoani Diocese maintains traditional Anglican worship and biblical teaching.
                </p>
              </article>
            </div>
          </div>
        </section>
        
        {/* About Idoani Diocese Section - Additional SEO Content */}
        <section className="py-20 bg-gray-50" id="about-idoani-diocese">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-anglican-purple-700 mb-6">
                  About the Anglican Diocese of Idoani
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    The <strong>Diocese of Idoani</strong> is a thriving Anglican diocese located in <strong>Ondo State, Nigeria</strong>. 
                    Established to serve the spiritual needs of communities across the region, our diocese encompasses numerous 
                    parishes and mission stations throughout <strong>Idoani</strong> and surrounding areas.
                  </p>
                  <p>
                    As part of the <strong>Anglican Communion</strong> and the <strong>Church of Nigeria (Anglican Communion)</strong>, 
                    the <strong>Idoani Diocese</strong> upholds traditional Anglican values while addressing contemporary challenges 
                    facing our communities in <strong>Ondo State</strong>.
                  </p>
                  <p>
                    Our <strong>Anglican churches in Idoani</strong> offer regular worship services, baptisms, confirmations, 
                    marriages, and pastoral care. We welcome visitors and new members to join our vibrant 
                    <strong>Christian community</strong> in <strong>Idoani Diocese</strong>.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="font-serif text-2xl font-bold text-anglican-purple-700 mb-6">
                  Diocese Quick Facts
                </h3>
                <dl className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <dt className="font-semibold text-gray-700">Location:</dt>
                    <dd className="text-gray-600">Idoani, Ondo State, Nigeria</dd>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <dt className="font-semibold text-gray-700">Denomination:</dt>
                    <dd className="text-gray-600">Anglican Communion</dd>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <dt className="font-semibold text-gray-700">Parishes:</dt>
                    <dd className="text-gray-600">20+ Active Parishes</dd>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <dt className="font-semibold text-gray-700">Members:</dt>
                    <dd className="text-gray-600">5,000+ Faithful</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="font-semibold text-gray-700">Founded:</dt>
                    <dd className="text-gray-600">2010</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
        
        <DirectorySection parishes={parishes} />
        <EventsSection events={events} />
        <ContactSection />
      </div>
    </>
  );
}