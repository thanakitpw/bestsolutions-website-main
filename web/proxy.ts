import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import {
  getUser,
  updateSession as supabaseUpdateSession,
} from "./utils/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const ADMIN_EMAIL = "agency.bestsolutions@gmail.com";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes — session refresh + allowlist guard, skip locale routing
  if (pathname.startsWith("/admin")) {
    const supabaseResponse = await supabaseUpdateSession(request);

    if (!pathname.startsWith("/admin/login")) {
      const user = await getUser(request);
      if (!user || user.email !== ADMIN_EMAIL) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }

    return supabaseResponse;
  }

  // Public routes — session refresh + locale routing
  await supabaseUpdateSession(request);
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
