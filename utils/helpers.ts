export const isDev = process.env.NODE_ENV === "development";

// Perfect for Vercel free plan - automatically handles all deployments
export const ORIGIN_URL = isDev
  ? "http://localhost:3000"
  : `https://${process.env.VERCEL_URL}`;
