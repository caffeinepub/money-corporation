import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ApplicationStatus } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useIsAdmin,
  useListAllApplications,
  useUpdateApplicationStatus,
} from "../hooks/useQueries";
import { formatINRFull } from "../utils/format";

const statusColor = {
  [ApplicationStatus.pending]: "bg-yellow-100 text-yellow-800",
  [ApplicationStatus.approved]: "bg-green-100 text-green-800",
  [ApplicationStatus.rejected]: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();
  const { data: applications, isLoading: appsLoading } =
    useListAllApplications();
  const { mutate: updateStatus } = useUpdateApplicationStatus();

  if (!identity) {
    return (
      <main className="min-h-screen bg-gray-band flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-muted-custom mx-auto mb-4" />
          <p className="text-body">
            Please log in to access the admin dashboard.
          </p>
        </div>
      </main>
    );
  }

  if (isAdminLoading) {
    return (
      <main className="min-h-screen bg-gray-band flex items-center justify-center">
        <Skeleton data-ocid="admin.loading_state" className="w-64 h-8" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-gray-band flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-heading text-2xl mb-2">
            Access Denied
          </h2>
          <p className="text-body">You do not have admin privileges.</p>
        </div>
      </main>
    );
  }

  function handleStatusChange(id: bigint, newStatus: ApplicationStatus) {
    updateStatus(
      { id, newStatus },
      {
        onSuccess: () => toast.success("Status updated"),
        onError: () => toast.error("Failed to update status"),
      },
    );
  }

  return (
    <main className="min-h-screen bg-gray-band py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-heading text-3xl">
                Admin Dashboard
              </h1>
              <p className="text-body text-sm">
                Manage all applications and update their statuses.
              </p>
            </div>
          </div>

          {appsLoading ? (
            <div data-ocid="admin.loading_state" className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 rounded" />
              ))}
            </div>
          ) : !applications || applications.length === 0 ? (
            <div
              data-ocid="admin.empty_state"
              className="text-center py-16 bg-white rounded-[12px] border border-card"
            >
              <p className="text-body">
                No applications have been submitted yet.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[12px] border border-card shadow-card overflow-hidden">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="bg-gray-band">
                    <TableHead className="text-heading font-semibold">
                      ID
                    </TableHead>
                    <TableHead className="text-heading font-semibold">
                      Applicant
                    </TableHead>
                    <TableHead className="text-heading font-semibold">
                      Product
                    </TableHead>
                    <TableHead className="text-heading font-semibold">
                      Amount
                    </TableHead>
                    <TableHead className="text-heading font-semibold">
                      Date
                    </TableHead>
                    <TableHead className="text-heading font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="text-heading font-semibold">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app, i) => (
                    <TableRow
                      key={app.id.toString()}
                      data-ocid={`admin.row.${i + 1}`}
                      className="hover:bg-gray-band/50"
                    >
                      <TableCell className="text-muted-custom text-sm font-mono">
                        #{app.id.toString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-heading text-sm">
                          {app.name}
                        </div>
                        <div className="text-muted-custom text-xs">
                          {app.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-body text-sm">
                        {app.productName}
                      </TableCell>
                      <TableCell className="text-body text-sm">
                        {app.requestedAmount
                          ? formatINRFull(app.requestedAmount)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-body text-sm">
                        {new Date(
                          Number(app.timestamp) / 1_000_000,
                        ).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${statusColor[app.status]} border-0 font-medium text-xs`}
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={app.status}
                          onValueChange={(v) =>
                            handleStatusChange(app.id, v as ApplicationStatus)
                          }
                        >
                          <SelectTrigger
                            data-ocid={`admin.status.select.${i + 1}`}
                            className="w-32 h-8 text-xs"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ApplicationStatus.pending}>
                              Pending
                            </SelectItem>
                            <SelectItem value={ApplicationStatus.approved}>
                              Approved
                            </SelectItem>
                            <SelectItem value={ApplicationStatus.rejected}>
                              Rejected
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
