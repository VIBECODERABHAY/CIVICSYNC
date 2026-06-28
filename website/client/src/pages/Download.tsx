import { Button } from "@/components/ui/button";
import { ArrowLeft, Download as DownloadIcon, Smartphone, Shield, Zap } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Download() {
  const [, navigate] = useLocation();
  const [selectedPlatform, setSelectedPlatform] = useState<"android" | "ios">("android");

  const handleDownload = (platform: string) => {
    // Simulate download
    alert(`${platform} app download started! Check your downloads folder.`);
  };

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
              Download CivicSync
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              Get the CivicSync app on your phone. Available for iOS and Android. Start reporting issues and earning civic recognition today.
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

      {/* Download Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Platform Selector */}
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
                Choose Your Platform
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    platform: "android",
                    name: "Android",
                    version: "v1.0.0",
                    size: "45 MB",
                    minVersion: "Android 8.0+",
                    icon: "📱"
                  },
                  {
                    platform: "ios",
                    name: "iOS",
                    version: "v1.0.0",
                    size: "52 MB",
                    minVersion: "iOS 13.0+",
                    icon: "🍎"
                  }
                ].map((item) => (
                  <button
                    key={item.platform}
                    onClick={() => setSelectedPlatform(item.platform as "android" | "ios")}
                    className={`p-8 rounded-xl border-2 transition-smooth hover:scale-105 ${
                      selectedPlatform === item.platform
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-background hover:border-primary/50"
                    }`}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{item.name}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><span className="font-semibold">Version:</span> {item.version}</p>
                      <p><span className="font-semibold">Size:</span> {item.size}</p>
                      <p><span className="font-semibold">Requires:</span> {item.minVersion}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center mb-16 animate-fade-in-up">
              <Button 
                size="lg" 
                onClick={() => handleDownload(selectedPlatform === "android" ? "Android APK" : "iOS")}
                className="bg-primary hover:bg-primary/90 text-white transition-smooth hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl mb-4"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                <span>Download for {selectedPlatform === "android" ? "Android" : "iOS"}</span>
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Safe download • No ads • Open source
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Smartphone,
                  title: "Cross-Platform",
                  desc: "Works seamlessly on iOS and Android devices"
                },
                {
                  icon: Shield,
                  title: "Secure",
                  desc: "End-to-end encryption for your data"
                },
                {
                  icon: Zap,
                  title: "Fast",
                  desc: "Lightweight and optimized for performance"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg border border-border/50 bg-background hover:bg-primary/5 transition-smooth hover:border-primary/50 text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            System Requirements
          </h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                platform: "Android",
                reqs: [
                  "Android 8.0 or higher",
                  "Minimum 2GB RAM",
                  "45 MB free storage",
                  "Internet connection required"
                ]
              },
              {
                platform: "iOS",
                reqs: [
                  "iOS 13.0 or higher",
                  "Minimum 2GB RAM",
                  "52 MB free storage",
                  "Internet connection required"
                ]
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-border/50 bg-white hover:bg-primary/5 transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">{item.platform}</h3>
                <ul className="space-y-3">
                  {item.reqs.map((req, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-foreground text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Installation Guide
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: 1,
                title: "Download the App",
                desc: "Click the download button above and select your platform (iOS or Android)."
              },
              {
                step: 2,
                title: "Install",
                desc: "Follow the installation prompts. The app will install automatically on your device."
              },
              {
                step: 3,
                title: "Create Account",
                desc: "Open the app and sign up with your email or social media account."
              },
              {
                step: 4,
                title: "Start Engaging",
                desc: "Begin reporting issues, voting on projects, and earning civic recognition!"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-6 md:gap-8 p-6 rounded-lg border border-border/50 bg-background hover:bg-primary/5 transition-smooth animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
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
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            Download CivicSync now and start engaging with your community. Report issues, vote on projects, and earn recognition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => handleDownload(selectedPlatform === "android" ? "Android APK" : "iOS")}
              className="bg-white text-primary hover:bg-white/90 transition-smooth hover:scale-105 active:scale-95"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download Now
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/guide")}
              className="border border-white text-white hover:bg-white/10 transition-smooth hover:scale-105 active:scale-95"
            >
              Read the Guide
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
