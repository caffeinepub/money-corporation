import { Landmark } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-gray-band border-t border-card pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + tagline */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-teal rounded-lg flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl text-heading">
                Money Corporation
              </span>
            </div>
            <p className="text-body text-sm leading-relaxed">
              Your trusted financial partner. Open accounts, apply for loans,
              and grow your wealth with confidence.
            </p>
            {/* Trust badges */}
            <div className="flex gap-3 mt-4">
              <span className="text-xs font-semibold border border-card rounded-md px-2.5 py-1 text-teal bg-white">
                🏦 RBI Regulated
              </span>
              <span className="text-xs font-semibold border border-card rounded-md px-2.5 py-1 text-teal bg-white">
                🔒 SSL Secured
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h4 className="text-sm font-bold text-heading mb-4">Products</h4>
              <ul className="space-y-2">
                {[
                  "Savings Account",
                  "Fixed Deposit",
                  "Personal Loan",
                  "Home Loan",
                  "Auto Loan",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#accounts"
                      className="text-sm text-body hover:text-teal transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-heading mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Press", "Blog", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <span className="text-sm text-body cursor-pointer hover:text-teal transition-colors">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-heading mb-4">Support</h4>
              <ul className="space-y-2">
                {[
                  "Help Center",
                  "FAQ",
                  "Grievances",
                  "Privacy Policy",
                  "Terms of Use",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-body cursor-pointer hover:text-teal transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-card pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-custom text-xs text-center sm:text-left">
            © {year} Money Corporation. All rights reserved. | Regulated by
            Reserve Bank of India
          </p>
          <p className="text-muted-custom text-xs">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
