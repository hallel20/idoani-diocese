import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    // @ts-ignore
    if (!session) {
        redirect("/auth");
    }
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}