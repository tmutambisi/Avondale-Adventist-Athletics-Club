import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    LogOut,
    Settings,
    Users,
    MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import sdaLogo from "@/assets/sda-logo.png";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Calendar, label: "Events", href: "/admin/events" },
];

export function AdminSidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
            <div className="p-6 border-b border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden bg-white p-0.5">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-700 overflow-hidden bg-white p-1">
                        <img src={sdaLogo} alt="SDA Logo" className="w-full h-full object-contain rounded-full" />
                    </div>
                </div>
                <h1 className="text-xl font-bold tracking-tight">AAAC <span className="text-primary">Admin</span></h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-slate-800 text-slate-400 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </Link>
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors mt-2"
                    onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.href = "/";
                    }}
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
}
