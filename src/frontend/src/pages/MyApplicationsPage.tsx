import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { ApplicationStatus } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useListMyApplications } from "../hooks/useQueries";
import { formatINRFull } from "../utils/format";

const statusConfig = {
  [ApplicationStatus.pending]: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  [ApplicationStatus.approved]: {
    label: "Approved",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  [ApplicationStatus.rejected]: {
    label: "Rejected",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function MyApplicationsPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: applications, isLoading } = useListMyApplications();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-gray-band flex items-center justify-center px-4">
        <div className="text-center">
          <FileText className="w-16 h-16 text-muted-custom mx-auto mb-4" />
          <h2 className="font-display text-heading text-2xl mb-3">
            View Your Applications
          </h2>
          <p className="text-body mb-6">
            Please log in to view your submitted applications.
          </p>
          <Button
            data-ocid="my_applications.login.button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="bg-green-accent hover:opacity-90 text-white px-8"
          >
            {isLoggingIn ? "Connecting..." : "Log In"}
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-band py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-heading text-3xl mb-2">
            My Applications
          </h1>
          <p className="text-body mb-8">
            Track the status of your submitted applications.
          </p>

          {isLoading ? (
            <div
              data-ocid="my_applications.loading_state"
              className="space-y-4"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-[12px]" />
              ))}
            </div>
          ) : !applications || applications.length === 0 ? (
            <div
              data-ocid="my_applications.empty_state"
              className="text-center py-16 bg-white rounded-[12px] border border-card"
            >
              <FileText className="w-12 h-12 text-muted-custom mx-auto mb-4" />
              <h3 className="font-semibold text-heading mb-2">
                No Applications Yet
              </h3>
              <p className="text-body text-sm mb-5">
                Apply for a bank account or loan to get started.
              </p>
              <a href="/#accounts">
                <Button className="bg-green-accent text-white hover:opacity-90">
                  Browse Products
                </Button>
              </a>
            </div>
          ) : (
            <div data-ocid="my_applications.list" className="space-y-4">
              {applications.map((app, i) => {
                const statusInfo =
                  statusConfig[app.status] ??
                  statusConfig[ApplicationStatus.pending];
                const StatusIcon = statusInfo.icon;
                return (
                  <motion.div
                    key={app.id.toString()}
                    data-ocid={`my_applications.item.${i + 1}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-[12px] border border-card shadow-card p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-heading">
                          {app.productName}
                        </h3>
                        <p className="text-muted-custom text-sm">
                          {new Date(
                            Number(app.timestamp) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          {app.requestedAmount
                            ? ` · ${formatINRFull(app.requestedAmount)}`
                            : ""}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`${statusInfo.color} flex items-center gap-1 border-0 font-medium`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
