"use client";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/idoani-bg.jpg')`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      {/* Purple tint overlay for Anglican branding */}
      <div className="absolute inset-0 bg-purple-900/30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="mb-6">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-medium text-yellow-300">✨ Diocese of Idoani</span>
              </div>
            </div>
            
            <h1 className="font-serif text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to Our{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Sacred Community
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-gray-100 leading-relaxed max-w-2xl">
              A vibrant community of faith, serving God and our neighbors with love, compassion, 
              and unwavering dedication to the Gospel of Jesus Christ.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => scrollToSection("directory")}
                className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 text-center shadow-lg transform hover:scale-105"
                data-testid="button-find-parish"
              >
                <span className="flex items-center justify-center">
                  Find a Parish
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection("events")}
                className="group border-2 border-white/80 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 text-center backdrop-blur-sm transform hover:scale-105"
                data-testid="button-upcoming-events"
              >
                <span className="flex items-center justify-center">
                  Upcoming Events
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
              </button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">20+</div>
                <div className="text-sm text-gray-300">Parishes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">5000+</div>
                <div className="text-sm text-gray-300">Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15+</div>
                <div className="text-sm text-gray-300">Years of Service</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Bishop's Message */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full mr-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs">✝</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-purple-800">
                  The Right Reverend Adegoke Oludare Agara
                </h3>
                <p className="text-purple-600 font-medium">Bishop of Idoani Diocese</p>
              </div>
            </div>
            
            <div className="relative">
              <svg className="absolute top-0 left-0 w-8 h-8 text-purple-300 -mt-2" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-1.105 0-2 .895-2 2v2c0 1.105.895 2 2 2h2c1.105 0 2-.895 2-2v-2c0-1.105-.895-2-2-2h-2zm8 0c-1.105 0-2 .895-2 2v2c0 1.105.895 2 2 2h2c1.105 0 2-.895 2-2v-2c0-1.105-.895-2-2-2h-2z" />
              </svg>
              <blockquote className="text-gray-700 italic text-lg leading-relaxed pl-6">
                "Grace and peace to you in the name of our Lord Jesus Christ. 
                It is my profound joy to welcome you to our diocesan family, where we gather 
                as one body to worship, serve, and grow together in faith and fellowship."
              </blockquote>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Serving since 2020
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}