import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";

export default function Support() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
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
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
              Have questions about CivicSync? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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

      {/* Contact Form & Info */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 leading-tight">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    desc: "support@civicsync.io",
                    subtext: "We'll get back to you within 24 hours"
                  },
                  {
                    icon: MessageSquare,
                    title: "Message",
                    desc: "Send us a message below",
                    subtext: "Use the contact form for quick inquiries"
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    desc: "+1 (555) 123-4567",
                    subtext: "Available Monday to Friday, 9am-5pm EST"
                  }
                ].map((contact, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-lg border border-border/50 bg-background hover:bg-primary/5 transition-smooth hover:border-primary/50"
                  >
                    <div className="flex items-start gap-4">
                      <contact.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{contact.title}</h3>
                        <p className="text-sm text-foreground font-medium mb-1">{contact.desc}</p>
                        <p className="text-xs text-muted-foreground">{contact.subtext}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:outline-none transition-smooth text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:outline-none transition-smooth text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white transition-smooth hover:scale-105 active:scale-95 py-3"
                >
                  {submitted ? (
                    <>
                      <span>✓ Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>

                {submitted && (
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center animate-fade-in-up">
                    <p className="text-sm text-primary font-medium">
                      Thank you! We'll be in touch soon.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-16 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is CivicSync?",
                a: "CivicSync is a mobile platform that bridges the gap between citizens and local governance. It enables residents to report issues, engage in community decisions, and earn recognition for civic participation."
              },
              {
                q: "How can I get the full PRD?",
                a: "Visit our Download page to get the complete Product Requirements Document. It includes detailed specifications, user flows, technical architecture, and the implementation roadmap."
              },
              {
                q: "Is CivicSync available now?",
                a: "CivicSync is currently in development. The MVP is scheduled for Q3 2026. Sign up for updates to be notified when it launches."
              },
              {
                q: "How can I contribute or partner with CivicSync?",
                a: "We'd love to hear from potential partners and contributors! Please fill out the contact form above and let us know how you'd like to get involved."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border/50 bg-white hover:bg-primary/5 transition-smooth hover:border-primary/50 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-bold text-foreground mb-3">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
            Join the Civic Revolution
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
            Be part of a movement to transform civic engagement. Stay updated on CivicSync's progress and launch.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="bg-white text-primary hover:bg-white/90 transition-smooth hover:scale-105 active:scale-95"
          >
            Back to Home
          </Button>
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
