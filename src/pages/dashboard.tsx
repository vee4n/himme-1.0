import { Nav } from "~/components/Nav";
import { SEO } from "~/components/SEO";
import { Table } from "~/components/table";
import { prisma } from "~/lib/prisma";

export default function Dashboard({ participants }) {
  return (
    <>
      <SEO />

      <div className="min-h-screen bg-gray-100">
        <Nav />
        <Table participants={participants} />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
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

  return {
    props: { participants: f },
  };
}
