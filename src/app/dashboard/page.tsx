"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [data, setData] = useState<{ balance: string; transactions: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOverview() {
      try {
        const token = localStorage.getItem("token") || undefined;
        if (!token) {
          router.push("/login");
          return;
        }
        const result = await apiRequest("/users/overview", "GET", null, token);
        setData(result);
      } catch (e) {
        console.error("Failed to fetch overview", e);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchOverview();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  const accounts = [
    { name: "Primary Account", balance: data?.balance || "$0.00", color: "bg-primary" },
    { name: "Savings", balance: "$0.00", color: "bg-secondary" },
    { name: "Investments", balance: "$0.00", color: "bg-slate-800" },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-12">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, Stanley!</h1>
          <p className="text-slate-600 dark:text-slate-400">Here is your financial overview</p>
        </div>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors">
            + Transfer Money
          </button>
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {accounts.map((acc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group hover:shadow-md transition-all"
          >
            <div className="relative z-10">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{acc.name}</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{acc.balance}</h2>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Active</span>
                <div className={`w-2 h-2 rounded-full ${acc.color}`} />
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Recent Transactions</h3>
          <div className="space-y-4">
            {data?.transactions.length ? data.transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-lg">
                    {tx.type === "income" ? "💰" : "🛍️"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{tx.desc}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-bold ${tx.amount.startsWith('+') ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                  {tx.amount}
                </p>
              </div>
            )) : <p className="text-slate-500 text-center py-4">No transactions found</p>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 bg-primary rounded-3xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Financial Goal</h3>
            <p className="text-blue-100 mb-8">You're 65% of the way to your "Dream House" goal.</p>
            <div className="w-full bg-white/20 h-3 rounded-full mb-2">
              <div className="bg-white h-full rounded-full w-[65%] shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <p className="text-sm text-blue-100 text-right">$32,000 / $50,000</p>
          </div>
          <div className="relative z-10 mt-12">
            <button className="w-full py-3 bg-white text-primary font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg">
              Boost Savings
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
