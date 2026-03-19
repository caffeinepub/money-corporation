import {
  BadgeDollarSign,
  CreditCard,
  Landmark,
  PiggyBank,
  Repeat,
} from "lucide-react";
import { motion } from "motion/react";
import { ProductCategory } from "../backend";
import { fallbackProducts } from "../data/products";
import { useListProducts } from "../hooks/useQueries";
import ProductCard from "./ProductCard";

const icons = [PiggyBank, BadgeDollarSign, CreditCard, Landmark, Repeat];

interface AccountsSectionProps {
  onApply: (productName: string, isLoan: boolean) => void;
}

export default function AccountsSection({ onApply }: AccountsSectionProps) {
  const { data: backendProducts } = useListProducts();

  const products = (() => {
    const accounts = backendProducts?.filter(
      (p) => p.category === ProductCategory.account,
    );
    if (accounts && accounts.length > 0) return accounts;
    return fallbackProducts.filter(
      (p) => p.category === ProductCategory.account,
    );
  })();

  return (
    <section id="accounts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-green-accent text-sm font-semibold uppercase tracking-wide">
            Banking Products
          </span>
          <h2 className="font-display text-heading text-3xl sm:text-4xl mt-2">
            Bank Accounts
          </h2>
          <p className="text-body mt-3 max-w-xl mx-auto">
            Choose from our range of accounts designed to grow your savings and
            simplify your daily banking.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product, i) => (
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
                features={product.features}
                rateLabel="interest"
                onApply={() => onApply(product.name, false)}
                index={i + 1}
                isAccount
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
