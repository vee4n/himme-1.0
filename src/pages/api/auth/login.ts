import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { PASSWORD, SECRET } from "~/lib/env";
import { sign } from "~/lib/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password } = req.body;

  if (password !== PASSWORD) {
    res.status(401);
    res.json({ message: "Incorrect credentials" });

    return;
  }

  const payload = { password };
  const token = await sign(payload, SECRET);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("E-TICKET_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 3600 * 2, // Cookie expires in 2 hours
      path: "/",
      sameSite: "lax",
    })
  );

  res.status(200).json({ message: "OK" });
}
