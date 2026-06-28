import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, BookOpen, Zap, Target, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Guide() {
  const [, navigate] = useLocation();
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");

  const sections = [
    {
      id: "overview",
      title: "Overview",
      icon: FileText,
      content: "CivicSync is a mobile-first platform designed to foster civic sense and active citizenship. It empowers residents to report local issues, engage in community decision-making, and learn about their civic duties through a gamified experience."
    },
    {
      id: "problem",
      title: "Problem Statement",
      icon: Target,
      content: "Many urban areas suffer from a lack of civic sense. Citizens often feel disconnected from local governance, finding the process of reporting issues cumbersome or ineffective. Conversely, local authorities struggle with real-time data collection and community feedback."
    },
    {
      id: "features",
      title: "Core Features",
      icon: Zap,
      content: "Smart Issue Reporting with photo/video upload and geo-tagging, Community Hub for discussions and voting, Gamification with Civic Score and badges, and Civic Education Center with micro-learning modules."
    },
    {
      id: "tech",
      title: "Technical Stack",
      icon: Lightbulb,
      content: "Platform: iOS and Android (Cross-platform via React Native/Flutter). Backend: Scalable cloud infrastructure (AWS/Google Cloud). Integrations: Google Maps API, Push Notifications, End-to-end encryption."
    },
    {
      id: "roadmap",
      title: "Development Roadmap",
      icon: BookOpen,
      content: "Phase 1 (Q3 2026): MVP with Smart Issue Reporting. Phase 2 (Q4 2026): Community Hub and Gamification. Phase 3 (Q1 2027): Civic Education and Authority Dashboard. Phase 4 (Q2 2027): Advanced features and partnerships."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
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
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate("/")}
            className="transition-smooth hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </nav>

      {/* Morphic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-morph opacity-70" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-morph opacity-70" style={{ animationDelay: "2s" }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 leading-tight tracking-tight">
              CivicSync Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              Comprehensive documentation of the CivicSync Product Requirements Document. Learn about features, roadmap, and technical specifications.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
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

      {/* Guide Content */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {sections.map((section, i) => (
                <div
                  key={section.id}
                  className="rounded-lg border border-border/50 bg-background hover:border-primary/50 transition-smooth animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-primary/5 transition-smooth"
                  >
                    <div className="flex items-center gap-4">
                      <section.icon className="w-6 h-6 text-primary flex-shrink-0" />
                      <h3 className="text-lg font-bold text-foreground text-left">{section.title}</h3>
                    </div>
                    <div className={`w-6 h-6 flex items-center justify-center text-primary transition-transform ${expandedSection === section.id ? "rotate-180" : ""}`}>
                      ▼
                    </div>
                  </button>
                  
                  {expandedSection === section.id && (
                    <div className="px-6 pb-6 border-t border-border/30 animate-fade-in-up">
                      <p className="text-foreground leading-relaxed mt-4">{section.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Who Benefits
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                audience: "Civic-Minded Residents",
                benefit: "Improve their neighborhoods and drive local change"
              },
              {
                audience: "Local Authorities",
                benefit: "Efficient issue tracking and community feedback collection"
              },
              {
                audience: "Community Leaders",
                benefit: "Coordinate local initiatives and organize community action"
              },
              {
                audience: "Youth & Students",
                benefit: "Learn civic duties and responsibilities through gamification"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-lg border border-border/50 bg-white hover:bg-primary/5 transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-3">{item.audience}</h3>
                <p className="text-sm text-muted-foreground">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Success Metrics
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              {
                metric: "Monthly Active Users (MAU)",
                description: "Number of unique users engaging with the app monthly"
              },
              {
                metric: "Issue Resolution Rate",
                description: "Percentage of reported issues successfully resolved by authorities"
              },
              {
                metric: "User Retention",
                description: "Percentage of users who return to the app after 30 days"
              },
              {
                metric: "Civic Score Growth",
                description: "Average increase in community civic scores over time"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-bold text-foreground mb-2 text-sm">{item.metric}</h3>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Sections */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Full PRD Contents
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {[
                "Executive Summary & Vision",
                "Problem Statement & Market Analysis",
                "Target Audience & User Personas",
                "Core Features & Functionality Details",
                "User Experience Requirements",
                "Technical Architecture & Stack",
                "Security & Privacy Requirements",
                "Success Metrics & KPIs",
                "4-Phase Development Roadmap",
                "Risk Assessment & Mitigation Strategy",
                "Budget & Resource Planning",
                "Implementation Timeline"
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-border/50 bg-white hover:bg-primary/5 transition-smooth hover:border-primary/50 flex items-center gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-3xl animate-morph" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-morph" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            Download the CivicSync app and start making a difference in your community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/download")}
              className="bg-white text-primary hover:bg-white/90 transition-smooth hover:scale-105 active:scale-95"
            >
              Download App
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/support")}
              className="border border-white text-white hover:bg-white/10 transition-smooth hover:scale-105 active:scale-95"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              { title: "Product", links: ["Download", "Guide", "Support"] },
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
