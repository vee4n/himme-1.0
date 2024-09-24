import { jwtVerify, SignJWT } from "jose";

export async function sign(payload, secret: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;

  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token: string, secret: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));

  return payload;
}