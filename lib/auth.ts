import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE = "gigil_admin";

function token(): string {
  const pw = process.env.ADMIN_PASSWORD || "";
  return createHash("sha256").update("gigil:" + pw).digest("hex");
}

export function checkPassword(password: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && password === pw;
}

export function sessionToken(): string {
  return token();
}

export function isAuthenticated(): boolean {
  const c = cookies().get(COOKIE)?.value;
  return !!c && c === token() && !!process.env.ADMIN_PASSWORD;
}

export const ADMIN_COOKIE = COOKIE;
