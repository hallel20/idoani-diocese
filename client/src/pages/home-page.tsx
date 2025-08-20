import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import DirectorySection from "@/components/directory-section";
import EventsSection from "@/components/events-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      
      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-anglican-purple-700 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Guided by scripture and tradition, we seek to be faithful witnesses of Christ's love in our communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-anglican-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-anglican-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-4">Love & Service</h3>
              <p className="text-gray-600">Following Christ's example of love and service to all people, especially the marginalized and vulnerable.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-anglican-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-anglican-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-4">Community</h3>
              <p className="text-gray-600">Building strong, inclusive communities where all are welcomed and valued as children of God.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-anglican-purple-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-anglican-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-semibold text-anglican-purple-700 mb-4">Scripture & Tradition</h3>
              <p className="text-gray-600">Grounded in the richness of Anglican liturgy, scripture, and the historic Christian faith.</p>
            </div>
          </div>
        </div>
      </section>
      
      <DirectorySection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
