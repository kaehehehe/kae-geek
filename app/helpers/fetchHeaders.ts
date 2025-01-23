import { headers } from "next/headers";

export async function fetchHeaders() {
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";
    return { host, protocol };
  } catch (error) {
    console.error("Error fetching headers:", error);
    throw new Error("Failed to fetch headers");
  }
}
