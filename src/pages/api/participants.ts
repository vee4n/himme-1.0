import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/lib/prisma";

export default async function handler(ref: NextApiRequest, res: NextApiResponse) {
  const participants = await prisma.participant.findMany({
    include: {
      group: {
        select: {
          name: true,
          pic: true,
        },
      },
      checkIn: {
        select: {
          date: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const f = participants.map((e) =>
    !e.checkInId
      ? e
      : { ...e, checkIn: { ...e.checkIn, date: e.checkIn.date.toISOString() } }
  );

  res.status(200).json(f)
}
