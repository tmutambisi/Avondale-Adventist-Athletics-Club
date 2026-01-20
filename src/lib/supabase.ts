import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Image uploads will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env');
}

// Provide fallback values that look like URLs to prevent createClient from crashing immediately
// during initial setup, but we'll still warn the user.
const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : "https://placeholder-url.supabase.co";
const finalKey = supabaseAnonKey || "placeholder-key";

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
    console.warn('Supabase credentials missing or invalid. Please check your .env.local file.');
}

export const supabase = createClient(finalUrl, finalKey);
