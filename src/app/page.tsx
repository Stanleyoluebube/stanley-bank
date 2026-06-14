"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg" />
          <span className="text-xl font-bold text-primary tracking-tight">Stanley Bank</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Login
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-all shadow-lg shadow-primary/20"
          >
            Open Account
          </Link>
        </div}
      </nav>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Banking Built for the <span className="text-primary">Future.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
              Experience seamless financial management with Stanley Bank. Secure, fast, and intuitively designed to put you in control of your money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 text-lg font-semibold text-white bg-primary rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary/30"
              >
                Get Started Now
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-all"
              >
                Learn More
              </Link>
            </div}
          </motion.div>
        </div>

        {/* Visual Element - Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-3xl" />
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Why Choose Stanley Bank?</h2>
            <p className="text-slate-600 dark:text-slate-400">Everything you need to manage your wealth in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Military Grade Security", desc: "Your assets are protected by state-of-the-art encryption and multi-factor authentication.", icon: "🛡️" },
              { title: "Instant Transfers", desc: "Send and receive money globally in seconds with zero hidden fees.", icon: "⚡" },
              { title: "AI-Driven Insights", desc: "Get personalized spending analysis and saving tips powered by intelligent algorithms.", icon: "📈" },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-primary transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feat.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
