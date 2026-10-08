import { NextResponse } from "next/server";
import { adminIsConfigured, readAdminSession } from "@/lib/admin-auth";

export async function GET(request: Request) {
  const session = await readAdminSession(request);
  return NextResponse.json(
    {
      authenticated: Boolean(session),
      configured: adminIsConfigured(),
      username: session?.username ?? null,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
