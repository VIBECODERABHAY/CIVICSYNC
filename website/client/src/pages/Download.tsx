import { Button } from "@/components/ui/button";
import { ArrowLeft, Download as DownloadIcon, Smartphone, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function Download() {
  const [, navigate] = useLocation();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleDownload = () => {
    if (completed || downloading) return;
    
    setDownloading(true);
    setProgress(0);

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setCompleted(true);
          
          // Trigger actual download
          const link = document.createElement("a");
          link.href = "/CIVICSYNC.apk";
          link.download = "CIVICSYNC.apk";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Navigation - Inverted Minimalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 transition-smooth">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="CivicSync" 
              className="w-6 h-6 transition-smooth hover:scale-110 brightness-0 invert"
            />
            <span className="font-bold text-sm text-white">CivicSync</span>
          </div>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate("/")}
            className="transition-smooth hover:scale-105 active:scale-95 border-white/20 text-zinc-300 hover:bg-white/10 hover:text-white bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Morphic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-morph opacity-50" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-morph opacity-50" style={{ animationDelay: "2s" }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-zinc-950 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 min-h-screen flex flex-col items-center justify-center">
        <div className="container relative z-10 flex flex-col items-center">
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-8 border border-primary/30">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Get the App
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed">
              Download the CivicSync APK to report issues directly from your Android device. 
              Secure, fast, and easy to use.
            </p>

            {/* Download Interface */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md max-w-md mx-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <img src="/logo.png" className="w-6 h-6 brightness-0 invert" alt="logo" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">CivicSync</h3>
                    <p className="text-xs text-zinc-400">Android APK • ~89 MB</p>
                  </div>
                </div>
                {completed && <CheckCircle2 className="text-green-500 w-6 h-6" />}
              </div>

              {!downloading && !completed ? (
                <Button 
                  onClick={handleDownload}
                  className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white transition-smooth hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                >
                  <DownloadIcon className="w-5 h-5 mr-2" />
                  Download APK Now
                </Button>
              ) : (
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-300">
                      {completed ? "Download Started!" : "Preparing File..."}
                    </span>
                    <span className="text-primary font-medium">{Math.min(progress, 100)}%</span>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-2 bg-white/10" />
                  {completed && (
                    <p className="text-xs text-zinc-400 mt-4 text-center">
                      If the download doesn't start automatically,{" "}
                      <a href="/CIVICSYNC.apk" download className="text-primary hover:underline">
                        click here
                      </a>.
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <p className="text-sm text-zinc-500 mt-8">
              Requires Android 8.0 or higher.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
