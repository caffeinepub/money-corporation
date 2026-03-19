import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[580px] grid grid-cols-1 lg:grid-cols-2"
    >
      {/* Left: deep teal panel */}
      <div className="bg-teal flex items-center px-8 py-16 lg:px-16 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg"
        >
          <span className="inline-block bg-white/10 text-white text-xs font-medium px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Trusted by 10,000+ Customers
          </span>
          <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-tight mb-6">
            Your Financial Future Starts Here
          </h1>
          <p className="text-white/80 text-base sm:text-lg mb-10 max-w-md">
            Open accounts, apply for loans, and manage your finances — all in
            one place. Fast approvals, lowest rates, 100% secure.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#accounts">
              <Button
                data-ocid="hero.open_account.button"
                className="bg-green-accent hover:opacity-90 text-white px-6 py-3 h-auto rounded-[10px] shadow text-base font-semibold"
              >
                Open Account <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="#loans">
              <Button
                variant="outline"
                data-ocid="hero.explore_loans.button"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20 px-6 py-3 h-auto rounded-[10px] text-base font-semibold"
              >
                Explore Loans
              </Button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right: gradient panel with stat cards */}
      <div
        className="relative flex items-center justify-center py-16 px-8 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.35 0.07 221) 0%, oklch(0.28 0.09 240) 100%)",
        }}
      >
        {/* Background image */}
        <img
          src="/assets/generated/hero-finance.dim_800x600.jpg"
          alt="Financial planning"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 grid grid-cols-1 gap-4 w-full max-w-sm"
        >
          {[
            {
              icon: Users,
              label: "Happy Customers",
              value: "10,000+",
              color: "bg-white/15",
            },
            {
              icon: TrendingUp,
              label: "Total Disbursed",
              value: "₹500 Cr+",
              color: "bg-white/15",
            },
            {
              icon: Star,
              label: "Customer Rating",
              value: "4.8 ★",
              color: "bg-white/15",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className={`${stat.color} backdrop-blur-sm rounded-2xl p-5 flex items-center gap-4 border border-white/10`}
            >
              <div className="w-12 h-12 bg-green-accent/80 rounded-xl flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white text-2xl font-bold font-display">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
