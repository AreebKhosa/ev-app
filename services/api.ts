/**
 * Unified API Client for Volt Studio Mobility
 * Connects Next.js Frontend with Express + PostgreSQL + Prisma Backend
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://ev-backend-ecru.vercel.app/api";

// Helper to get stored auth token
export const getAuthToken = (endpoint?: string): string | null => {
    if (typeof window === "undefined") return null;
    const isAdminContext =
        (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) ||
        (endpoint && (endpoint.includes("/admin") || endpoint.startsWith("/bank-details/admin")));

    if (isAdminContext) {
        return localStorage.getItem("volt_admin_token") || localStorage.getItem("volt_auth_token");
    }
    return localStorage.getItem("volt_auth_token") || localStorage.getItem("volt_admin_token");
};

// Generic Fetch Wrapper
async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ data?: T; error?: string; status?: number }> {
    try {
        const token = getAuthToken(endpoint);
        const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

        const headers: HeadersInit = {
            ...(!isFormData && (!options.body || typeof options.body === "string") ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            return {
                error: data?.message || `HTTP Error ${res.status}: ${res.statusText}`,
                status: res.status,
            };
        }

        return { data, status: res.status };
    } catch (err: any) {
        return {
            error: err.message || "Network error. Backend server may be offline.",
        };
    }
}

export const api = {
    // ================= 1. AUTHENTICATION =================
    auth: {
        login: (credentials: { email: string; password: string }) =>
            request<{ user: any; token: string; message: string }>("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
            }),

        register: (userData: { name: string; email: string; password: string; phone?: string; avatar?: string }) =>
            request<{ user: any; token: string; message: string }>("/auth/register", {
                method: "POST",
                body: JSON.stringify(userData),
            }),

        getProfile: () => request<any>("/auth/profile"),

        updateProfile: (data: { name?: string; phone?: string; shippingAddress?: string; avatar?: string }) =>
            request<any>("/auth/profile", {
                method: "PUT",
                body: JSON.stringify(data),
            }),
    },

    // ================= 2. PRODUCTS FLEET =================
    products: {
        getAll: (params?: { category?: string; search?: string; maxPrice?: number }) => {
            const query = new URLSearchParams();
            if (params?.category) query.append("category", params.category);
            if (params?.search) query.append("search", params.search);
            if (params?.maxPrice) query.append("maxPrice", String(params.maxPrice));
            const queryString = query.toString() ? `?${query.toString()}` : "";
            return request<any[]>(`/products${queryString}`);
        },

        getById: (id: string) => request<any>(`/products/${id}`),

        create: (productData: any) =>
            request<any>("/products", {
                method: "POST",
                body: JSON.stringify(productData),
            }),

        update: (id: string, productData: any) =>
            request<any>(`/products/${id}`, {
                method: "PUT",
                body: JSON.stringify(productData),
            }),

        delete: (id: string) =>
            request<any>(`/products/${id}`, {
                method: "DELETE",
            }),
    },

    // ================= 3. CATEGORIES =================
    categories: {
        getAll: () => request<any[]>("/categories"),

        getById: (id: string) => request<any>(`/categories/${id}`),

        create: (categoryData: { name: string; description?: string; image?: string }) =>
            request<any>("/categories", {
                method: "POST",
                body: JSON.stringify(categoryData),
            }),

        update: (id: string, categoryData: { name?: string; description?: string; image?: string }) =>
            request<any>(`/categories/${id}`, {
                method: "PUT",
                body: JSON.stringify(categoryData),
            }),

        delete: (id: string) =>
            request<any>(`/categories/${id}`, {
                method: "DELETE",
            }),
    },

    // ================= 4. ORDERS & CHECKOUT =================
    orders: {
        checkout: (formData: FormData) =>
            request<any>("/orders/checkout", {
                method: "POST",
                body: formData,
            }),

        getAllAdmin: () => request<any[]>("/orders/admin"),

        updateStatus: (id: string, status: string) =>
            request<any>(`/orders/admin/${id}/status`, {
                method: "PUT",
                body: JSON.stringify({ status }),
            }),
    },

    // ================= 5. CONTACT INQUIRIES =================
    queries: {
        submit: (queryData: {
            name: string;
            email: string;
            phone?: string;
            topic?: string;
            model?: string;
            message: string;
        }) =>
            request<any>("/queries", {
                method: "POST",
                body: JSON.stringify(queryData),
            }),

        getAllAdmin: () => request<any[]>("/queries/admin"),

        toggleResolved: (id: string) =>
            request<any>(`/queries/admin/${id}/resolve`, {
                method: "PUT",
            }),
    },

    // ================= 6. ADMIN USERS & BANK SETTINGS =================
    admin: {
        getUsers: () => request<any[]>("/admin/users"),

        toggleUserSuspension: (id: string) =>
            request<any>(`/admin/users/${id}/suspend`, {
                method: "PUT",
            }),

        getBankDetails: () => request<any>("/bank-details"),

        updateBankDetails: (settings: any) =>
            request<any>("/bank-details/admin", {
                method: "PUT",
                body: JSON.stringify(settings),
            }),
    },

    // ================= 7. FILE UPLOADS (LOCAL PC) =================
    upload: {
        avatar: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            return request<{ url: string; filename: string }>("/upload/avatar", {
                method: "POST",
                body: formData,
            });
        },
        productImage: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            return request<{ url: string; filename: string }>("/upload/product", {
                method: "POST",
                body: formData,
            });
        },
        categoryImage: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            return request<{ url: string; filename: string }>("/upload/category", {
                method: "POST",
                body: formData,
            });
        },
    },
};
