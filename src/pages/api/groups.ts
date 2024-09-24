import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const groups = await prisma.group.findMany({
    orderBy: {
      id: "asc",
    },
  });

  res.status(200).json(groups);
}
