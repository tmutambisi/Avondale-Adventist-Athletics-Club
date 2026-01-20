import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
            <Toaster position="top-right" />
        </div>
    );
}
