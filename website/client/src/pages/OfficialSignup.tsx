import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OfficialSignup() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agency_id: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/official/login" : "/api/auth/official/register";

    try {
      const res = await fetch(`https://civicsync-w9yy.onrender.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.error || "Authentication failed.");
      } else {
        toast.success(isLogin ? "Welcome back, Officer!" : "Registration successful!");
        if (isLogin) {
          // Store user ID in localStorage just in case we need it
          localStorage.setItem("officialId", data.user.id);
          setLocation("/official-dashboard");
        } else {
          setIsLogin(true); // Switch to login view after registering
          setFormData({ name: "", email: "", agency_id: "", password: "" });
        }
      }
    } catch (error) {
      toast.error("Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Absolute positioning for Home link for maximum minimalism */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <a className="text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors">
            ← Back to Home
          </a>
        </Link>
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Official Portal
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            {isLogin ? "Secure login for Nagar Nigam personnel." : "Secure registration for Nagar Nigam personnel."}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <Input 
                    required 
                    placeholder="Officer Name"
                    className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Agency ID
                  </label>
                  <Input 
                    required 
                    placeholder="NN-XXXX"
                    className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                    value={formData.agency_id}
                    onChange={e => setFormData({...formData, agency_id: e.target.value})}
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Government Email
              </label>
              <Input 
                required 
                type="email"
                placeholder="name@nagarnigam.in"
                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Secure Password
              </label>
              <Input 
                required 
                type="password"
                placeholder="••••••••"
                className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-all"
            disabled={loading}
          >
            {loading ? "Authenticating..." : (isLogin ? "Secure Login" : "Request Access")}
          </Button>
          
          <div className="mt-4 text-center">
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              {isLogin ? "Need an account? Request access." : "Already have access? Login here."}
            </button>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6 max-w-[250px] mx-auto">
            Access is strictly monitored and logged. Unauthorized attempts are prohibited.
          </p>
        </form>
      </div>
    </div>
  );
}
