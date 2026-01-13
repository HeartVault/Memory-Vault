import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/explore"];

 
  const authRoutes = ["/signin", "/signup"];

 
  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  
  if (session && authRoutes.some((route) => pathname.startsWith(route))) {
    const url = req.nextUrl.clone();
    url.pathname = "/explore";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    /*
      Run middleware on all pages except:
      - _next static files
      - images/assets
      - favicon
    */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
