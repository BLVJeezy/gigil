import { isAuthenticated } from "@/lib/auth";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin — GiGi L Coiffure",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const authed = isAuthenticated();
  return authed ? <AdminDashboard /> : <AdminLogin />;
}
