import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Landmark, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsAdmin();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const navLinks = [
    { label: "Banking", href: "#accounts" },
    { label: "Loans", href: "#loans" },
    { label: "Calculator", href: "#calculator" },
    { label: "About", href: "#why-us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-card shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-teal rounded-lg flex items-center justify-center">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl text-heading">
            Money Corporation
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
              className="flex items-center gap-1 text-body text-sm font-medium hover:text-teal transition-colors"
            >
              {link.label}
              <ChevronDown className="w-3.5 h-3.5 opacity-50" />
            </a>
          ))}
          {isLoggedIn && (
            <Link
              to="/my-applications"
              data-ocid="nav.applications.link"
              className="text-sm font-medium text-body hover:text-teal transition-colors"
            >
              My Applications
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin"
              data-ocid="nav.admin.link"
              className="text-sm font-medium text-green-accent hover:opacity-80 transition-opacity"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-xs text-muted-custom truncate max-w-[120px]">
                {identity?.getPrincipal().toString().slice(0, 12)}...
              </span>
              <Button
                variant="outline"
                size="sm"
                data-ocid="nav.logout.button"
                onClick={() => clear()}
                className="border-card text-body hover:bg-gray-band"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              data-ocid="nav.login.button"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="border-card text-heading hover:bg-gray-band"
            >
              {isLoggingIn ? "Connecting..." : "Log In"}
            </Button>
          )}
          <a href="#accounts">
            <Button
              size="sm"
              data-ocid="nav.open_account.button"
              className="bg-green-accent hover:opacity-90 text-white rounded-[10px] shadow-xs"
            >
              Open Account
            </Button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-body"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-card px-4 py-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-body py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {isLoggedIn && (
              <Link
                to="/my-applications"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-body py-1"
              >
                My Applications
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-green-accent py-1"
              >
                Admin
              </Link>
            )}
            <div className="flex gap-2 pt-2">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clear();
                    setMobileOpen(false);
                  }}
                  className="flex-1"
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  disabled={isLoggingIn}
                  className="flex-1"
                >
                  {isLoggingIn ? "Connecting..." : "Log In"}
                </Button>
              )}
              <Button
                size="sm"
                className="flex-1 bg-green-accent text-white"
                onClick={() => {
                  setMobileOpen(false);
                  window.location.hash = "accounts";
                }}
              >
                Open Account
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
