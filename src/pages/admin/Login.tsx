import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";
import sdaLogo from "@/assets/sda-logo.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            });

            if (error) throw error;

            toast.success("Logged in successfully");
            navigate("/admin");
        } catch (error: any) {
            toast.error(error.message || "Invalid login credentials");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAdmin = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: "admin@avondale.com",
                password: "Admin123!#",
            });

            if (error) throw error;

            if (data.user?.identities?.length === 0) {
                toast.error("User exists but is unconfirmed. Run the SQL fix or check Supabase settings.");
            } else {
                toast.success("Admin account created! Now Sign In.");
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full border-2 border-slate-100 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                            <img src={logo} alt="Avondale Athletics" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <div className="h-12 w-px bg-slate-200" />
                        <div className="w-20 h-20 rounded-full border-2 border-slate-100 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                            <img src={sdaLogo} alt="SDA Logo" className="w-full h-full object-cover rounded-full" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>



                        <Button
                            type="button"
                            variant="outline"
                            className="w-full border-dashed mt-4 text-xs"
                            onClick={handleCreateAdmin}
                            disabled={loading}
                        >
                            Setup Admin Account
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <Button variant="link" onClick={() => navigate("/")} className="text-muted-foreground text-sm">
                            Return to Website
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
