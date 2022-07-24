import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/get-url")) {
    console.log("returning early");
    return;
  }

  const slug = request.nextUrl.pathname.split("/").pop();

  const data = await (await fetch(`${request.nextUrl.origin}/api/get-url/${slug}`)).json();

  console.log("data", data);

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "",
};
