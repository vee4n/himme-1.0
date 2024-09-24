import { NextRequest, NextResponse } from "next/server";
import { SECRET } from "~/lib/env";
import { verify } from "~/lib/jwt";

const PROTECTED_ROUTES = [/\/dashboard/, /\/check-in\/.+/];

export default async function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;

  const token = cookies.get("E-TICKET_ACCESS_TOKEN");
  const currentUrl = nextUrl.pathname;
  const redirectUrl = nextUrl.clone();
  redirectUrl.pathname = "/";

  if (PROTECTED_ROUTES.filter((route) => route.test(currentUrl)).length > 0) {
    if (!token) {
      return NextResponse.redirect(redirectUrl);
    }

    try {
      await verify(token, SECRET);
    } catch (e) {
      return NextResponse.redirect(redirectUrl);
    }
  }
}
