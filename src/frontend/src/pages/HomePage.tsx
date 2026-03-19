import { useState } from "react";
import AccountsSection from "../components/AccountsSection";
import ApplicationModal from "../components/ApplicationModal";
import EMICalculator from "../components/EMICalculator";
import HeroSection from "../components/HeroSection";
import LoansSection from "../components/LoansSection";
import WhyChooseUs from "../components/WhyChooseUs";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedIsLoan, setSelectedIsLoan] = useState(false);

  function openApply(productName: string, isLoan: boolean) {
    setSelectedProduct(productName);
    setSelectedIsLoan(isLoan);
    setModalOpen(true);
  }

  return (
    <main>
      <HeroSection />
      <AccountsSection onApply={openApply} />
      <LoansSection onApply={openApply} />
      <WhyChooseUs />
      <EMICalculator />
      <ApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        productName={selectedProduct}
        isLoan={selectedIsLoan}
      />
    </main>
  );
}
