"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AdminPortal() {
  const [stats, setStats] = useState<any>(null);
  const [stream, setStream] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const token = localStorage.getItem("token") || undefined;
        if (!token) {
          router.push("/login");
          return;
        }
        const [statsRes, streamRes] = await Promise.all([
          apiRequest("/admin/stats", "GET", null, token),
          apiRequest("/admin/stream", "GET", null, token),
        ]);
        setStats(statsRes);
        setStream(streamRes);
      } catch (e) {
        console.error("Admin data fetch failed", e);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, [router]);

  async function handlePaymentAction(id: string, action: 'approve' | 'decline') {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("token") || undefined;
      await apiRequest(`/admin/${action}/${id}`, "POST", null, token);
      // Refresh stream
      const streamRes = await apiRequest("/admin/stream", "GET", null, token);
      setStream(streamRes);
    } catch (e: any) {
      alert(e.message || "Payment action failed");
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">Loading Admin Portal...</div>;

  const statCards = [
    { label: "Total Users", value: stats?.totalUsers || "0", change: "+12%", color: "text-blue-600" },
    { label: "Total Deposits", value: stats?.totalDeposits || "$0", change: "+5.4%", color: "text-emerald-600" },
    { label: "Active Loans", value: stats?.activeLoans || "0", change: "-2.1%", color: "text-rose-600" },
    { label: "System Uptime", value: stats?.uptime || "0%", change: "Stable", color: "text-slate-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-12">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">S</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Control Center</h1>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            System Healthy
          </div>
          <button
            onClick={() => { localStorage.clear(); router.push("/login"); }}
            className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h2>
              <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pending Payments</h3>
            <button className="text-sm text-primary font-semibold hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {stream.length ? stream.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{log.user || log.email}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">${log.amount} Transaction</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                    log.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                    log.status === 'declined' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {log.status || 'Pending'}
                  </span>
                  {log.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePaymentAction(log.id, 'approve')}
                        disabled={actionLoading === log.id}
                        className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all disabled:opacity-50"
                        title="Approve"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handlePaymentAction(log.id, 'decline')}
                        disabled={actionLoading === log.id}
                        className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all disabled:opacity-50"
                        title="Decline"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )) : <p className="text-slate-500 text-center py-4">No transactions available</p>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Quick Actions</h3>
          <div className="space-y-4">
            {[
              { label: "Manage Users", icon: "👤" },
              { label: "Audit Logs", icon: "📜" },
              { label: "System Config", icon: "⚙️" },
              { label: "Security Alerts", icon: "🚨" },
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all group text-left">
                <span className="text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-white">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
