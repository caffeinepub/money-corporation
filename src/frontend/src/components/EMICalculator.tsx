import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { calculateEMI, formatINRFull } from "../utils/format";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(10);
  const interestRate = 9.5;

  const emi = useMemo(
    () => calculateEMI(loanAmount, interestRate, tenure),
    [loanAmount, tenure],
  );
  const totalAmount = useMemo(() => emi * tenure * 12, [emi, tenure]);
  const totalInterest = useMemo(
    () => totalAmount - loanAmount,
    [totalAmount, loanAmount],
  );

  return (
    <section id="calculator" className="py-20 bg-gray-band">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-accent text-sm font-semibold uppercase tracking-wide">
            Plan Ahead
          </span>
          <h2 className="font-display text-heading text-3xl sm:text-4xl mt-2">
            EMI Calculator
          </h2>
          <p className="text-body mt-3 max-w-xl mx-auto">
            Find out your monthly EMI before applying. No commitment needed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[12px] shadow-card border border-card p-8 space-y-8"
          >
            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-semibold text-heading">
                  Loan Amount
                </span>
                <span className="text-sm font-bold text-green-accent">
                  {formatINRFull(loanAmount)}
                </span>
              </div>
              <Slider
                aria-label="Loan Amount"
                data-ocid="calculator.amount.input"
                min={100000}
                max={5000000}
                step={50000}
                value={[loanAmount]}
                onValueChange={([v]) => setLoanAmount(v)}
                className="[&_[data-slot=slider-thumb]]:bg-green-accent [&_[data-slot=slider-range]]:bg-green-accent"
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted-custom">
                <span>₹1 L</span>
                <span>₹50 L</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <span className="text-sm font-semibold text-heading">
                  Loan Tenure
                </span>
                <span className="text-sm font-bold text-green-accent">
                  {tenure} Years
                </span>
              </div>
              <Slider
                aria-label="Loan Tenure"
                data-ocid="calculator.tenure.input"
                min={1}
                max={30}
                step={1}
                value={[tenure]}
                onValueChange={([v]) => setTenure(v)}
                className="[&_[data-slot=slider-thumb]]:bg-green-accent [&_[data-slot=slider-range]]:bg-green-accent"
              />
              <div className="flex justify-between mt-1.5 text-xs text-muted-custom">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 px-4 bg-gray-band rounded-lg">
              <span className="text-sm font-medium text-body">
                Interest Rate
              </span>
              <span className="text-sm font-bold text-teal">
                {interestRate}% p.a.
              </span>
            </div>

            <a href="#calculator">
              <Button
                data-ocid="calculator.calculate.button"
                className="w-full bg-green-accent hover:opacity-90 text-white h-12 text-base font-semibold rounded-[10px]"
              >
                <Calculator className="mr-2 w-5 h-5" /> Calculate EMI
              </Button>
            </a>
          </motion.div>

          {/* Right: summary card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-teal rounded-[12px] shadow-card p-8 text-white"
          >
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-6">
              Estimated Monthly EMI
            </h3>
            <div className="text-5xl font-display font-bold mb-2">
              {formatINRFull(emi)}
            </div>
            <p className="text-white/60 text-sm mb-8">
              Per month for {tenure} years at {interestRate}% p.a.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-white/70 text-sm">Principal Amount</span>
                <span className="font-semibold">
                  {formatINRFull(loanAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 text-sm">Total Interest</span>
                <span className="font-semibold">
                  {formatINRFull(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <span className="text-white/80 text-sm font-medium">
                  Total Amount
                </span>
                <span className="font-bold text-lg">
                  {formatINRFull(totalAmount)}
                </span>
              </div>
            </div>

            <a href="#loans" className="block mt-8">
              <Button
                data-ocid="calculator.apply.button"
                variant="outline"
                className="w-full border-white/30 text-white bg-white/10 hover:bg-white/20 h-11 font-semibold"
              >
                Apply for a Loan
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
