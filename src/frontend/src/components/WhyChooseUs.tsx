import { Headphones, ShieldCheck, TrendingDown, Zap } from "lucide-react";
import { motion } from "motion/react";

const benefits = [
  {
    icon: Zap,
    title: "Quick Approval",
    description:
      "Get loan approvals within 24 hours with minimal documentation and instant credit checks.",
  },
  {
    icon: TrendingDown,
    title: "Lowest Rates",
    description:
      "Industry-best interest rates starting from 8.4% p.a. — we beat any competitor's offer.",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description:
      "Bank-grade encryption and multi-factor authentication protect your data at all times.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to assist you anytime.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-green-accent text-sm font-semibold uppercase tracking-wide">
            Our Promise
          </span>
          <h2 className="font-display text-heading text-3xl sm:text-4xl mt-2">
            Why Choose FinanceHub?
          </h2>
          <p className="text-body mt-3 max-w-xl mx-auto">
            Millions of Indians trust us for their financial needs. Here's why.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center flex flex-col items-center"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "oklch(0.52 0.12 155 / 0.1)" }}
              >
                <b.icon className="w-8 h-8 text-green-accent" />
              </div>
              <h3 className="font-bold text-heading text-lg mb-2">{b.title}</h3>
              <p className="text-body text-sm leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
