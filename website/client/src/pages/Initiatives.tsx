import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sliderData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop",
    title: "Smart City Lighting",
    description: "Installing energy-efficient LED streetlights across all major zones to enhance safety and reduce carbon footprint.",
    status: "Ongoing"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1596423735880-5c68f117c469?q=80&w=2000&auto=format&fit=crop",
    title: "Green Parks Initiative",
    description: "Revitalizing urban spaces with 50+ new green zones, outdoor gyms, and children's play areas.",
    status: "Completed Phase 1"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=2000&auto=format&fit=crop",
    title: "Swachh Bharat Drive",
    description: "Deploying automated sweeping machines and implementing strict waste segregation policies at the source.",
    status: "Active"
  }
];

export default function Initiatives() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-extrabold tracking-tighter text-slate-900">
              CivicSync<span className="text-blue-600">.</span>
            </a>
          </Link>
          <div className="flex gap-8">
            <Link href="/"><a className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Home</a></Link>
            <Link href="/initiatives"><a className="text-sm font-semibold text-blue-600">Initiatives</a></Link>
            <Link href="/official-portal"><a className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Official Portal</a></Link>
          </div>
        </div>
      </nav>

      {/* Hero Slider Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
        {/* Slides */}
        <div 
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.87,_0,_0.13,_1)]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderData.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-2xl transform transition-all duration-1000 translate-y-0 opacity-100">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
                      {slide.status}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-8">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-12 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* Indicators */}
            <div className="flex gap-3">
              {sliderData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Arrows */}
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section below slider */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Sustainable Growth</h3>
            <p className="text-slate-500 leading-relaxed">Implementing eco-friendly policies and reducing carbon emissions across all municipal operations.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Infrastructure</h3>
            <p className="text-slate-500 leading-relaxed">Upgrading legacy systems with IoT-enabled sensors for real-time monitoring and efficient resource allocation.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Citizen Collaboration</h3>
            <p className="text-slate-500 leading-relaxed">Working hand-in-hand with local communities to identify issues and execute grassroots solutions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
