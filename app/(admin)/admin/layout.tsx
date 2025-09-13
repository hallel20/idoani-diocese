import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminNavigation from "@/components/admin/admin-navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    // @ts-ignore
    if (!session) {
        redirect("/auth");
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <AdminNavigation />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}