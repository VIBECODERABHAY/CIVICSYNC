import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Zap, BookOpen, Trophy, MapPin, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

/**
 * CivicSync PRD Website - Vibrant Morphic Minimalism
 * 
 * Design Philosophy:
 * - Vibrant, smooth morphic animations with spring easing
 * - Minimalist UI: Clean lines, ample whitespace, essential elements only
 * - Fluid transitions: Every interaction feels alive and responsive
 * - Progressive disclosure: Content reveals smoothly as users scroll
 */

export default function Home() {
  const [, navigate] = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, IntersectionObserver>>(new Map());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const newSet = new Set(prev);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (id: string) => {
    return visibleSections.has(id) ? "animate-fade-in-up" : "opacity-0";
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation - Minimalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-border/30 transition-smooth">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <img 
              src="/manus-storage/civicsync-logo_9f28ea54.png" 
              alt="CivicSync" 
              className="w-6 h-6 transition-smooth hover:scale-110"
            />
            <span className="font-bold text-sm text-foreground">CivicSync</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate("/download")} className="text-xs text-muted-foreground hover:text-primary transition-smooth">Download</button>
            <button onClick={() => navigate("/guide")} className="text-xs text-muted-foreground hover:text-primary transition-smooth">Guide</button>
            <button onClick={() => navigate("/support")} className="text-xs text-muted-foreground hover:text-primary transition-smooth">Support</button>
            <button onClick={() => navigate("/official-portal")} className="text-xs font-semibold text-slate-800 hover:text-primary transition-smooth">Official Portal</button>
          </div>
          <Button 
            size="sm" 
            onClick={() => navigate("/download")}
            className="bg-primary hover:bg-primary/90 text-white transition-smooth hover:scale-105 active:scale-95"
          >
            Download PRD
          </Button>
        </div>
      </nav>

      {/* Hero Section - Minimalist with Morphic Background */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Morphic Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-morph opacity-70" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-morph opacity-70" style={{ animationDelay: "2s" }} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-block mb-6 px-3 py-1.5 bg-primary/15 rounded-full border border-primary/30 backdrop-blur-sm transition-smooth hover:bg-primary/20 hover:scale-105 cursor-default">
              <span className="text-xs font-semibold text-primary tracking-wide">CIVIC ENGAGEMENT PLATFORM</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Your Voice, Your City
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Bridge the gap between citizens and local governance. Report issues, engage in decisions, earn recognition.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                onClick={() => navigate("/download")}
                className="bg-primary hover:bg-primary/90 text-white transition-smooth hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                View Full PRD <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                onClick={() => navigate("/support")}
                variant="outline" 
                className="transition-smooth hover:bg-primary/5 hover:scale-105 active:scale-95"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Morphic Divider */}
      <div className="relative h-24 md:h-32 bg-white overflow-hidden">
        <svg 
          className="absolute bottom-0 left-0 w-full h-full text-background"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,40 Q300,10 600,40 T1200,40 L1200,120 L0,120 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Problem Section - Minimalist */}
      <section id="problem" className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div data-animate id="problem-text" className={`${getAnimationClass("problem-text")}`}>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
                The Challenge
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Citizens want to improve neighborhoods. Authorities need real-time data. CivicSync closes the gap.
              </p>
              <ul className="space-y-4">
                {["Inefficient reporting", "Lack of transparency", "Low engagement", "No incentives"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 transition-smooth hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-animate id="problem-image" className={`${getAnimationClass("problem-image")} transition-smooth`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <img 
                  src="/manus-storage/civicsync-community-illustration_d24e6ec5.png" 
                  alt="Community collaboration"
                  className="w-full rounded-2xl shadow-lg relative z-10 transition-smooth hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimalist Grid */}
      <section id="features" className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Core Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed for civic engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: MapPin,
                title: "Smart Reporting",
                description: "Report issues with photos and real-time tracking.",
              },
              {
                icon: MessageSquare,
                title: "Community Hub",
                description: "Discuss, vote, and shape local decisions together.",
              },
              {
                icon: Trophy,
                title: "Gamification",
                description: "Earn badges, climb leaderboards, unlock rewards.",
              },
              {
                icon: BookOpen,
                title: "Civic Education",
                description: "Learn your rights, responsibilities, and governance.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                data-animate
                id={`feature-${i}`}
                className={`${getAnimationClass(`feature-${i}`)} p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-smooth hover:shadow-lg hover:bg-primary/5 group cursor-default`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 text-primary mb-4 transition-smooth group-hover:scale-125" />
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience - Minimalist */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Who Benefits
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Residents", desc: "Improve neighborhoods" },
              { title: "Authorities", desc: "Track & respond efficiently" },
              { title: "Leaders", desc: "Coordinate initiatives" },
              { title: "Youth", desc: "Learn civic duties" },
            ].map((audience, i) => (
              <div
                key={i}
                data-animate
                id={`audience-${i}`}
                className={`${getAnimationClass(`audience-${i}`)} p-6 rounded-lg border border-border/50 bg-white hover:bg-primary/5 transition-smooth hover:border-primary/50 hover:shadow-md text-center`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-bold text-foreground mb-2 text-sm">{audience.title}</h3>
                <p className="text-xs text-muted-foreground">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap - Minimalist Timeline */}
      <section id="roadmap" className="py-24 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Roadmap
          </h2>
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { phase: 1, title: "MVP", items: ["Issue Reporting", "Profiles"], status: "Q3 2026" },
              { phase: 2, title: "Engagement", items: ["Community Hub", "Gamification"], status: "Q4 2026" },
              { phase: 3, title: "Education", items: ["Learning Center", "Authority Dashboard"], status: "Q1 2027" },
              { phase: 4, title: "Advanced", items: ["Partnerships", "AI Features"], status: "Q2 2027" },
            ].map((roadmap, i) => (
              <div
                key={i}
                data-animate
                id={`roadmap-${i}`}
                className={`${getAnimationClass(`roadmap-${i}`)} flex gap-6 md:gap-8 transition-smooth hover:translate-x-2`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm transition-smooth hover:scale-125">
                    {roadmap.phase}
                  </div>
                  {i < 3 && <div className="w-0.5 h-20 bg-primary/20 mt-3" />}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-bold text-foreground mb-1">{roadmap.title}</h3>
                  <p className="text-xs text-primary font-semibold mb-3">{roadmap.status}</p>
                  <ul className="space-y-1">
                    {roadmap.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Zap className="w-3 h-3 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs - Minimalist */}
      <section id="specs" className="py-24 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Technical Specs
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { title: "Platform", items: ["iOS & Android", "Cloud Infrastructure", "REST API"] },
              { title: "Integrations", items: ["Google Maps", "Push Notifications", "End-to-End Encryption"] },
            ].map((spec, i) => (
              <div
                key={i}
                data-animate
                id={`spec-${i}`}
                className={`${getAnimationClass(`spec-${i}`)} p-8 rounded-xl border border-border/50 bg-white hover:bg-primary/5 transition-smooth`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-4">{spec.title}</h3>
                <ul className="space-y-2">
                  {spec.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs - Minimalist Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Success Metrics
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { metric: "Monthly Active Users", desc: "Unique users engaging" },
              { metric: "Resolution Rate", desc: "Issues successfully resolved" },
              { metric: "User Retention", desc: "Return after 30 days" },
              { metric: "Civic Score Growth", desc: "Community engagement increase" },
            ].map((kpi, i) => (
              <div
                key={i}
                data-animate
                id={`kpi-${i}`}
                className={`${getAnimationClass(`kpi-${i}`)} p-6 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-smooth`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-bold text-foreground mb-1 text-sm">{kpi.metric}</h3>
                <p className="text-xs text-muted-foreground">{kpi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalist */}
      <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
        {/* Morphic Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-morph" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Transform Civic Engagement?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            Download the full PRD to explore detailed specifications and implementation timelines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/download")}
              className="bg-white text-primary hover:bg-white/90 transition-smooth hover:scale-105 active:scale-95"
            >
              Download Full PRD
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/support")}
              className="border border-white text-white hover:bg-white/10 transition-smooth hover:scale-105 active:scale-95"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="py-12 bg-foreground text-white/70 border-t border-white/10">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/manus-storage/civicsync-logo_9f28ea54.png" 
                  alt="CivicSync" 
                  className="w-5 h-5"
                />
                <span className="font-bold text-sm text-white">CivicSync</span>
              </div>
              <p className="text-xs">Empowering civic engagement.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Roadmap", "Specs"] },
              { title: "Company", links: ["About", "Blog", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-4 text-xs">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-xs hover:text-white transition-smooth">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-xs">
            <p>&copy; 2026 CivicSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
