import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    bucket?: string;
}

export function ImageUpload({ value, onChange, bucket = "event-images" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;

            // Basic validation
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload an image file");
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("Image size must be less than 5MB");
                return;
            }

            setIsUploading(true);

            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onChange(publicUrl);
            toast.success("Image uploaded successfully");
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Failed to upload image. Ensure the bucket exists and is public.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const clearImage = () => {
        onChange("");
    };

    return (
        <div className="space-y-4 w-full">
            <Label>Event Image</Label>

            {value ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="max-w-full max-h-full object-contain"
                    />
                    <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-lg border-2 border-dashed border-slate-200 hover:border-primary/50 hover:bg-slate-50 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group"
                >
                    <div className="p-3 rounded-full bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {isUploading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <Upload className="w-6 h-6" />
                        )}
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-slate-700">
                            {isUploading ? "Uploading..." : "Click to upload image"}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept="image/*"
                className="hidden"
                disabled={isUploading}
            />
        </div>
    );
}
