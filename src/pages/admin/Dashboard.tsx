import {
    Users,
    Calendar,
    TrendingUp,
    Eye,
    Loader2
} from "lucide-react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { format, subDays, startOfDay } from "date-fns";

const StatCard = ({ title, value, icon: Icon, loading }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" />
            </div>
        </div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : value}
        </h3>
    </div>
);

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalVisits: 0,
        upcomingEvents: 0,
        totalRegistrations: 0,
        avgVisitCount: "0",
        chartData: [] as any[],
        recentActivities: [] as any[],
        loading: true
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // 1. Fetch Total Visits
            const { count: visitsCount } = await supabase
                .from('visits')
                .select('*', { count: 'exact', head: true });

            // 2. Fetch Upcoming Events
            const { count: eventsCount } = await supabase
                .from('events')
                .select('*', { count: 'exact', head: true })
                .gte('date', new Date().toISOString().split('T')[0]);

            // 3. Fetch Total Registrations
            const { count: regCount } = await supabase
                .from('event_registrations')
                .select('*', { count: 'exact', head: true });

            // 4. Fetch Chart Data (Last 7 days)
            const chartData = [];
            for (let i = 6; i >= 0; i--) {
                const day = subDays(new Date(), i);
                const dayStr = format(day, 'EEE');
                const start = startOfDay(day).toISOString();
                const end = startOfDay(subDays(day, -1)).toISOString();

                const { count } = await supabase
                    .from('visits')
                    .select('*', { count: 'exact', head: true })
                    .gte('created_at', start)
                    .lt('created_at', end);

                chartData.push({ name: dayStr, visits: count || 0 });
            }

            // 5. Fetch Recent Activities (Last 5 events)
            const { data: recentEvents } = await supabase
                .from('events')
                .select('name, created_at')
                .order('created_at', { ascending: false })
                .limit(4);

            setStats({
                totalVisits: visitsCount || 0,
                upcomingEvents: eventsCount || 0,
                totalRegistrations: regCount || 0,
                avgVisitCount: ((visitsCount || 0) / 30).toFixed(1), // Rough monthly avg
                chartData,
                recentActivities: recentEvents || [],
                loading: false
            });
        } catch (error) {
            console.error("Dashboard fetch error:", error);
            setStats(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Track your website performance and manage content in real-time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Visits" value={stats.totalVisits.toLocaleString()} icon={Eye} loading={stats.loading} />
                <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon={Calendar} loading={stats.loading} />
                <StatCard title="Total Registrations" value={stats.totalRegistrations} icon={Users} loading={stats.loading} />
                <StatCard title="Daily Avg Visits" value={stats.avgVisitCount} icon={TrendingUp} loading={stats.loading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Website Traffic (Last 7 Days)</h3>
                    <div className="h-[300px] w-full">
                        {stats.loading ? (
                            <div className="h-full w-full flex items-center justify-center">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '8px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Activities</h3>
                    <div className="space-y-6">
                        {stats.loading ? (
                            <div className="flex justify-center py-10">
                                <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                            </div>
                        ) : stats.recentActivities.length === 0 ? (
                            <p className="text-sm text-slate-400 italic text-center py-10">No recent activity</p>
                        ) : stats.recentActivities.map((activity, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">"{activity.name}" added</p>
                                    <p className="text-xs text-slate-500">
                                        {format(new Date(activity.created_at), 'MMM d, h:mm a')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

