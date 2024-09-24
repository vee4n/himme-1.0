import { SEO } from "~/components/SEO";
import { Ticket } from "~/components/Ticket";
import { prisma } from "~/lib/prisma";

export async function getServerSideProps(context) {
  const isBase64 =
    /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  let { ticket } = context.params;

  // if ticket not base64 return fail
  if (!isBase64.test(ticket)) return { props: { success: false } };

  // if ticket not valid json return fail
  const decodedTicket = atob(ticket);
  let ticketObj;
  try {
    ticketObj = JSON.parse(decodedTicket);
  } catch (e) {
    return { props: { success: false } };
  }

  // if ticket not valid urlticket object return fail
  if (!(ticketObj.hasOwnProperty("id") && ticketObj.hasOwnProperty("nim"))) {
    return { props: { success: false } };
  }

  const foundTicket = await prisma.participant.findFirst({
    where: {
      id: ticketObj.id,
      nim: `${ticketObj.nim}`,
    },
    include: {
      group: {
        select: {
          name: true,
          pic: true,
        },
      },
    },
  });
  console.log(foundTicket)

  if (!foundTicket) return { props: { success: false } };

  return {
    props: {
      success: true,
      ticketDetails: foundTicket,
    },
  };
}

export default function CheckInTicket({ success, ticketDetails }) {
  return (
    <>
      <SEO />

      <div className="h-screen flex justify-center items-center">
        <Ticket ticketDetails={ticketDetails} success={success} />
      </div>
    </>
  );
}
