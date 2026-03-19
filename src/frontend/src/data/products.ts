import { ProductCategory } from "../backend";

export interface FallbackProduct {
  name: string;
  category: ProductCategory;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  features: string[];
}

export const fallbackProducts: FallbackProduct[] = [
  {
    name: "Savings Account",
    category: ProductCategory.account,
    interestRate: 6.5,
    minAmount: 0,
    maxAmount: 0,
    features: [
      "4% p.a. interest",
      "Zero min balance",
      "Free debit card",
      "Online banking",
    ],
  },
  {
    name: "Current Account",
    category: ProductCategory.account,
    interestRate: 0,
    minAmount: 10000,
    maxAmount: 0,
    features: [
      "Unlimited transactions",
      "Overdraft facility",
      "Free NEFT/RTGS",
      "Dedicated RM",
    ],
  },
  {
    name: "Checking Account",
    category: ProductCategory.account,
    interestRate: 3.5,
    minAmount: 0,
    maxAmount: 0,
    features: [
      "Unlimited transactions",
      "Free cheque book",
      "Overdraft facility",
      "24/7 ATM access",
    ],
  },
  {
    name: "Fixed Deposit",
    category: ProductCategory.account,
    interestRate: 7.8,
    minAmount: 10000,
    maxAmount: 10000000,
    features: [
      "Up to 7.8% p.a.",
      "Tenure: 7 days–10 yr",
      "Auto-renewal",
      "Premature withdrawal",
    ],
  },
  {
    name: "Recurring Deposit",
    category: ProductCategory.account,
    interestRate: 7.2,
    minAmount: 500,
    maxAmount: 100000,
    features: [
      "7.2% p.a. return",
      "Min ₹500/month",
      "Flexible tenure",
      "Loan against RD",
    ],
  },
  {
    name: "Personal Loan",
    category: ProductCategory.loan,
    interestRate: 10.5,
    minAmount: 50000,
    maxAmount: 4000000,
    features: [
      "Up to ₹40 Lakhs",
      "Instant approval",
      "No collateral",
      "Flexible repayment",
    ],
  },
  {
    name: "Home Loan",
    category: ProductCategory.loan,
    interestRate: 8.4,
    minAmount: 500000,
    maxAmount: 50000000,
    features: [
      "Up to ₹5 Crores",
      "8.4% interest p.a.",
      "30-year tenure",
      "Tax benefits",
    ],
  },
  {
    name: "Auto Loan",
    category: ProductCategory.loan,
    interestRate: 9.2,
    minAmount: 100000,
    maxAmount: 5000000,
    features: [
      "Up to ₹50 Lakhs",
      "85% LTV ratio",
      "Up to 7-year tenure",
      "Quick disbursal",
    ],
  },
  {
    name: "Business Loan",
    category: ProductCategory.loan,
    interestRate: 11.5,
    minAmount: 200000,
    maxAmount: 20000000,
    features: [
      "Up to ₹2 Crores",
      "Minimal docs",
      "Flexible EMI",
      "Collateral-free",
    ],
  },
];
