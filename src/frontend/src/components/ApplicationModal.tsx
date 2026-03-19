import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCategory } from "../backend";
import { fallbackProducts } from "../data/products";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSubmitApplication } from "../hooks/useQueries";

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  isLoan: boolean;
}

export default function ApplicationModal({
  open,
  onClose,
  productName,
  isLoan,
}: ApplicationModalProps) {
  const { login, loginStatus, identity } = useInternetIdentity();
  const { mutate: submit, isPending, isSuccess } = useSubmitApplication();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const product = fallbackProducts.find((p) => p.name === productName);
  const showAmount = isLoan;

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errs.email = "Valid email required";
    if (!form.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Valid 10-digit mobile number required";
    if (showAmount && form.amount && Number.isNaN(Number(form.amount)))
      errs.amount = "Enter a valid amount";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    submit(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        productName,
        requestedAmount: showAmount && form.amount ? Number(form.amount) : null,
      },
      {
        onSuccess: () => {
          toast.success("Application submitted successfully!");
        },
        onError: () => {
          toast.error("Failed to submit. Please try again.");
        },
      },
    );
  }

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent data-ocid="application.modal" className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-heading text-xl">
            Apply for {productName}
          </DialogTitle>
          <DialogDescription className="text-body">
            {product && (
              <span className="inline-flex items-center gap-2 mt-1">
                <span className="text-green-accent font-semibold">
                  {product.interestRate}% p.a.
                </span>
                {product.category === ProductCategory.loan && (
                  <span className="text-muted-custom text-xs">
                    {" "}
                    · Up to ₹{(product.maxAmount / 100000).toFixed(0)} Lakhs
                  </span>
                )}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {!isLoggedIn ? (
          <div className="py-6 text-center">
            <p className="text-body mb-5">
              Please log in to submit your application.
            </p>
            <Button
              data-ocid="application.login.button"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="bg-green-accent hover:opacity-90 text-white px-8"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Log In to Continue"
              )}
            </Button>
          </div>
        ) : isSuccess ? (
          <div
            className="py-8 text-center"
            data-ocid="application.success_state"
          >
            <CheckCircle className="w-14 h-14 text-green-accent mx-auto mb-4" />
            <h3 className="font-bold text-heading text-lg mb-2">
              Application Submitted!
            </h3>
            <p className="text-body text-sm mb-6">
              We’ll review your application and get back within 24–48 hours.
            </p>
            <Button
              onClick={onClose}
              className="bg-teal text-white hover:opacity-90"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="app-name"
                className="text-sm font-medium text-heading mb-1 block"
              >
                Full Name
              </Label>
              <Input
                id="app-name"
                data-ocid="application.name.input"
                placeholder="Rajesh Kumar"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p
                  data-ocid="application.name.error_state"
                  className="text-destructive text-xs mt-1"
                >
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="app-email"
                className="text-sm font-medium text-heading mb-1 block"
              >
                Email Address
              </Label>
              <Input
                id="app-email"
                data-ocid="application.email.input"
                type="email"
                placeholder="rajesh@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p
                  data-ocid="application.email.error_state"
                  className="text-destructive text-xs mt-1"
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="app-phone"
                className="text-sm font-medium text-heading mb-1 block"
              >
                Phone Number
              </Label>
              <Input
                id="app-phone"
                data-ocid="application.phone.input"
                placeholder="9876543210"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p
                  data-ocid="application.phone.error_state"
                  className="text-destructive text-xs mt-1"
                >
                  {errors.phone}
                </p>
              )}
            </div>
            <div>
              <Label
                htmlFor="app-product"
                className="text-sm font-medium text-heading mb-1 block"
              >
                Product
              </Label>
              <Input
                id="app-product"
                value={productName}
                readOnly
                className="bg-gray-band text-body"
              />
            </div>
            {showAmount && (
              <div>
                <Label
                  htmlFor="app-amount"
                  className="text-sm font-medium text-heading mb-1 block"
                >
                  Requested Amount (₹)
                </Label>
                <Input
                  id="app-amount"
                  data-ocid="application.amount.input"
                  placeholder="500000"
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  className={errors.amount ? "border-destructive" : ""}
                />
                {errors.amount && (
                  <p
                    data-ocid="application.amount.error_state"
                    className="text-destructive text-xs mt-1"
                  >
                    {errors.amount}
                  </p>
                )}
              </div>
            )}
            <Button
              data-ocid="application.submit.button"
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-green-accent hover:opacity-90 text-white h-11 font-semibold rounded-[10px] mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
