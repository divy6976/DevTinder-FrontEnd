// Read from Vite env var (set on Vercel). Fallback to localhost for local dev
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7777"