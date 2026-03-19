import { Briefcase, Car, Home, User } from "lucide-react";
import { motion } from "motion/react";
import { ProductCategory } from "../backend";
import { fallbackProducts } from "../data/products";
import { useListProducts } from "../hooks/useQueries";
import { formatINR } from "../utils/format";
import ProductCard from "./ProductCard";

const icons = [User, Home, Car, Briefcase];

interface LoansSectionProps {
  onApply: (productName: string, isLoan: boolean) => void;
}

export default function LoansSection({ onApply }: LoansSectionProps) {
  const { data: backendProducts } = useListProducts();

  const products = (() => {
    const loans = backendProducts?.filter(
      (p) => p.category === ProductCategory.loan,
    );
    if (loans && loans.length > 0) return loans;
    return fallbackProducts.filter((p) => p.category === ProductCategory.loan);
  })();

  return (
    <section id="loans" className="py-20 bg-gray-band">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-accent text-sm font-semibold uppercase tracking-wide">
            Finance Products
          </span>
          <h2 className="font-display text-heading text-3xl sm:text-4xl mt-2">
            Loan Products
          </h2>
          <p className="text-body mt-3 max-w-xl mx-auto">
            Competitive interest rates, quick disbursal, and flexible repayment
            options — tailored for every need.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const rangeStr =
              product.maxAmount > 0
                ? `${formatINR(product.minAmount)} – ${formatINR(product.maxAmount)}`
                : "No limit";
            const featuresWithRange = [
              rangeStr,
              ...product.features.slice(0, 3),
            ];
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <ProductCard
                  icon={icons[i % icons.length]}
                  title={product.name}
                  interestRate={product.interestRate}
                  features={featuresWithRange}
                  rateLabel="p.a."
                  onApply={() => onApply(product.name, true)}
                  index={i + 1}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
