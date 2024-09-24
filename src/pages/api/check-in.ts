import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, checkInId } = req.body;

  let checkIn;
  if (!checkInId) {
    checkIn = await prisma.checkIn.create({
      data: {
        Participant: {
          connect: {
            id,
          },
        },
      },
    });
  } else {
    checkIn = await prisma.checkIn.delete({
      where: {
        id: checkInId,
      },
    });
  }

  res.status(200).json({ message: "OK", body: checkIn });
}
