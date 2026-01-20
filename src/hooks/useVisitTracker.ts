import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const useVisitTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const logVisit = async () => {
            try {
                const { error } = await supabase
                    .from("visits")
                    .insert([
                        {
                            page_path: location.pathname,
                            visitor_id: localStorage.getItem("visitor_id") || generateVisitorId(),
                        },
                    ]);

                if (error) {
                    // Fail silently in production, but good to know during dev
                    console.error("Visit log error:", error);
                }
            } catch (err) {
                console.error("Failed to log visit:", err);
            }
        };

        logVisit();
    }, [location.pathname]);
};

function generateVisitorId() {
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("visitor_id", id);
    return id;
}
