import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoute = ["/admin"];

export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoute.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && session?.user.role !== "admin") {
    return;
    // return NextResponse.redirect(new URL("api/auth/signin", request.url));
  }
  return NextResponse.next();
}
