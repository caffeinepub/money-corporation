import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ProductCardProps {
  icon: LucideIcon;
  title: string;
  interestRate: number;
  features: string[];
  rateLabel?: string;
  onApply: () => void;
  index: number;
  isAccount?: boolean;
}

export default function ProductCard({
  icon: Icon,
  title,
  interestRate,
  features,
  rateLabel = "p.a.",
  onApply,
  index,
  isAccount = false,
}: ProductCardProps) {
  return (
    <div
      data-ocid={`products.item.${index}`}
      className="bg-white border border-card rounded-[12px] shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "oklch(0.52 0.12 155 / 0.1)" }}
        >
          <Icon className="w-6 h-6 text-green-accent" />
        </div>
        <span
          className="text-sm font-bold px-3 py-1 rounded-full"
          style={{
            backgroundColor: isAccount
              ? "oklch(0.35 0.07 221 / 0.08)"
              : "oklch(0.52 0.12 155 / 0.1)",
            color: isAccount ? "oklch(0.35 0.07 221)" : "oklch(0.52 0.12 155)",
          }}
        >
          {interestRate}% {rateLabel}
        </span>
      </div>
      <h3 className="text-heading font-bold text-lg mb-3">{title}</h3>
      <ul className="flex-1 space-y-2 mb-5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-body">
            <Check className="w-4 h-4 text-green-accent flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <Button
        data-ocid={`products.apply.button.${index}`}
        onClick={onApply}
        className="w-full bg-green-accent hover:opacity-90 text-white rounded-[10px] font-semibold"
      >
        Apply Now
      </Button>
    </div>
  );
}
