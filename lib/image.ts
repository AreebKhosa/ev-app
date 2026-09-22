/**
 * Image helper utility for formatting backend image URLs and handling fallbacks.
 */
export function getOptimizedImageUrl(src?: string | null): string {
    if (!src || typeof src !== "string" || !src.trim()) {
        return "https://images.unsplash.com/photo-1571068316344-75bc76f77890?q=80&w=600&auto=format&fit=crop";
    }

    const trimmed = src.trim();

    if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("data:") ||
        trimmed.startsWith("blob:")
    ) {
        return trimmed;
    }

    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL 
        ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "")
        : "http://localhost:5000";

    return `${baseUrl}${cleanPath}`;
}
