"use client";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-anglican-purple-600 to-anglican-purple-800 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to Our <span className="text-anglican-gold">Anglican Diocese</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed">
              A community of faith, serving God and our neighbors with love, compassion, 
              and dedication to the Gospel of Jesus Christ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection("directory")}
                className="bg-anglican-gold text-anglican-purple-800 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-center"
                data-testid="button-find-parish"
              >
                Find a Parish
              </button>
              <button 
                onClick={() => scrollToSection("events")}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-anglican-purple-600 transition-colors text-center"
                data-testid="button-upcoming-events"
              >
                Upcoming Events
              </button>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-95 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4 flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-anglican-purple-700">
                  The Right Reverend John Smith
                </h3>
                <p className="text-anglican-purple-600">Bishop of the Diocese</p>
              </div>
            </div>
            <blockquote className="text-gray-700 italic text-lg leading-relaxed">
              "Grace and peace to you in the name of our Lord Jesus Christ. 
              It is my joy to welcome you to our diocesan family, where we gather 
              as one body to worship, serve, and grow together in faith."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
