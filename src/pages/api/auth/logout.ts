import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { NODE_ENV } from "~/lib/env";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("E-TICKET_ACCESS_TOKEN", "", {
      maxAge: -1, // Set maxAge to a past date (-1 also works) to make it expire
      path: "/",
      secure: NODE_ENV === "production",
    })
  );

  return res.status(200).json({ message: "OK" });
}
