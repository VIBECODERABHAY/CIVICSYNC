import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";

interface Complaint {
  id: string;
  _id: string;
  title: string;
  description: string;
  status: string;
  address: string;
  user_id: string;
  priority: string;
  created_at: string;
}

export default function OfficialDashboard() {
  const [, setLocation] = useLocation();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch('https://civicsync-w9yy.onrender.com/api/official/dashboard');
      const data = await res.json();
      setComplaints(Array.isArray(data) ? data : (data.data || []));
    } catch (error) {
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const markResolved = async (id: string) => {
    if (!confirm("Are you sure you want to mark this issue as resolved and notify the citizen?")) return;
    
    try {
      const res = await fetch('https://civicsync-w9yy.onrender.com/api/official/resolve', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complaint_id: id })
      });
      if (res.ok) {
        toast.success("Issue marked as resolved.");
        fetchReports();
      } else {
        toast.error("Failed to resolve issue.");
      }
    } catch (e) {
      toast.error("Network error.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("officialId");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">NN</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Nagar Nigam</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Command Center</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/">
            <a className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Website</a>
          </Link>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Main Complaints Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Active Civic Issues</h2>
              <p className="text-sm text-slate-500 mt-1">Manage and resolve reported problems in real-time.</p>
            </div>
            <button onClick={fetchReports} className="text-sm font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-md">
              ↻ Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
            </div>
          ) : complaints.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
              <p className="text-slate-500 font-medium">No active complaints found. The city is clean!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complaints.map((item) => {
                const isEmergency = item.title.toLowerCase().includes('emergency');
                const isResolved = item.status === 'Resolved';
                const docId = item.id || item._id; 

                return (
                  <div 
                    key={docId} 
                    className={`bg-white rounded-xl p-5 shadow-sm border transition-shadow hover:shadow-md flex flex-col h-full
                      ${isEmergency ? 'border-red-200 bg-red-50/20' : 'border-slate-200'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide
                        ${isEmergency ? 'bg-red-100 text-red-700' : 
                          isResolved ? 'bg-green-100 text-green-700' : 
                          item.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                        {isEmergency ? 'EMERGENCY' : item.status}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 flex-grow line-clamp-2 leading-relaxed">{item.description}</p>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 text-sm">📍</span>
                        <span className="text-xs font-medium text-slate-600 leading-snug">{item.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">👤</span>
                        <span className="text-xs font-medium text-slate-500">ID: {item.user_id || 'Anonymous'}</span>
                      </div>
                    </div>

                    {!isResolved && (
                      <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => markResolved(docId)}
                          className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold py-2 rounded-md transition-colors border border-emerald-200"
                        >
                          ✓ Resolve
                        </button>
                        <button 
                          onClick={() => alert('Work order sent to field team.')}
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 rounded-md transition-colors border border-slate-300"
                        >
                          Assign
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar Widgets */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          
          {/* Authority Mail Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-900 px-4 py-3 flex justify-between items-center">
              <h3 className="text-white font-bold text-sm tracking-wide">Authority Mail</h3>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2 NEW</span>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                <p className="text-xs font-bold text-slate-900 mb-0.5">Directive: Pre-Monsoon Audit</p>
                <p className="text-xs text-slate-500 line-clamp-1">From: Commissioner Office</p>
                <p className="text-[10px] text-slate-400 mt-2">10:42 AM</p>
              </div>
              <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                <p className="text-xs font-bold text-slate-900 mb-0.5">Budget Approval 2026</p>
                <p className="text-xs text-slate-500 line-clamp-1">From: Finance Dept</p>
                <p className="text-[10px] text-slate-400 mt-2">Yesterday</p>
              </div>
            </div>
            <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
              <button className="text-xs font-bold text-blue-600 hover:text-blue-800">View All Mails →</button>
            </div>
          </div>

          {/* Work Orders Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="text-slate-800 font-bold text-sm tracking-wide">Active Work Orders</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">Sewer Line Repair (Zone 4)</span>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">In Progress</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Contractor: Sharma Builders</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">Street Light Fix (Sec 12)</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Dispatched</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Team: Electrical Div B</p>
              </div>
            </div>
          </div>

          {/* News & Circulars */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm p-4">
            <h3 className="text-blue-900 font-bold text-sm mb-3 flex items-center gap-2">
              <span>📢</span> Daily Circulars
            </h3>
            <ul className="space-y-3">
              <li className="text-xs text-slate-700 leading-relaxed border-l-2 border-blue-300 pl-3">
                <span className="font-bold block text-blue-800 mb-0.5">Swachhata Abhiyan</span>
                All officers must submit their ward reports by Friday 5 PM.
              </li>
              <li className="text-xs text-slate-700 leading-relaxed border-l-2 border-blue-300 pl-3">
                <span className="font-bold block text-blue-800 mb-0.5">System Maintenance</span>
                CivicSync portal will undergo maintenance this Sunday from 2AM-4AM.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
