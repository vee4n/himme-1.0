import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const groupsData = [
  {
    name: "Typhoon",
    pic: "Adi Muhajir",
    participants: [
      {
        name: "Ari Wira Setiawan",
        email: "ariwirasetiawan@gmail.com",
        phone: "087247865033",
        nim: "2440023451",
      },
      {
        name: "Doddy Yohanes Iskandar",
        email: "doddyyohanesiskandar@gmail.com",
        phone: "084967044171",
        nim: "2440026174",
      },
      {
        name: "Prayogo Weimin",
        email: "prayogoweimin@gmail.com",
        phone: "082639526217",
        nim: "2440026840",
      },
      {
        name: "Baroleh Park",
        email: "barolehpark@gmail.com",
        phone: "088799518745",
        nim: "2440026849",
      },
      {
        name: "Geron Tahitu",
        email: "gerontahitu@gmail.com",
        phone: "081012317659",
        nim: "2440026164",
      },
    ],
  },
  {
    name: "Hurricane",
    pic: "Berta Putri",
    participants: [
      {
        name: "Andrew Sianipar",
        email: "andrewsianipar@gmail.com",
        phone: "088011460373",
        nim: "2440026627",
      },
      {
        name: "Barak Babo",
        email: "barakbabo@gmail.com",
        phone: "085443644031",
        nim: "2440026463",
      },
      {
        name: "Azariah Banjarkasi",
        email: "azariahbanjarkasi@gmail.com",
        phone: "082551990996",
        nim: "2440026731",
      },
      {
        name: "Susilo",
        email: "susilo@gmail.com",
        phone: "082793691195",
        nim: "2440026289",
      },
      {
        name: "Eko",
        email: "eko@gmail.com",
        phone: "086986154632",
        nim: "2440026107",
      },
    ],
  },
  {
    name: "Tornado",
    pic: "Chris Tan",
    participants: [
      {
        name: "Susanti Yanti Iskandar",
        email: "susantiyantiiskandar@gmail.com",
        phone: "081218809641",
        nim: "2440026583",
      },
      {
        name: "Intan Dwi Indradjaja",
        email: "intandwiindradjaja@gmail.com",
        phone: "082549325965",
        nim: "2440026242",
      },
      {
        name: "Mulawarman Yingtai",
        email: "mulawarmanyingtai@gmail.com",
        phone: "088272161380",
        nim: "2440026273",
      },
      {
        name: "Budiono Jun",
        email: "budionojun@gmail.com",
        phone: "081444105618",
        nim: "2440026269",
      },
      {
        name: "Swinda Hahury",
        email: "swindahahury@gmail.com",
        phone: "089926665785",
        nim: "2440026144",
      },
    ],
  },
  {
    name: "Gale",
    pic: "Dimitri Markus",
    participants: [
      {
        name: "Martha Laksa",
        email: "marthalaksa@gmail.com",
        phone: "081255200510",
        nim: "2440026526",
      },
      {
        name: "Magdalene Lingga",
        email: "magdalenelingga@gmail.com",
        phone: "083707953992",
        nim: "244002684",
      },
      {
        name: "Sherah Basirun",
        email: "sherahbasirun@gmail.com",
        phone: "089720028234",
        nim: "2440026538",
      },
      {
        name: "Srilestari",
        email: "srilestari@gmail.com",
        phone: "084524701599",
        nim: "2440026860",
      },
      {
        name: "Ratu",
        email: "ratu@gmail.com",
        phone: "08202235557",
        nim: "2440026631",
      },
      {
        name: "Kevin Christanto",
        email: "kevinchristanto@gmail.com",
        phone: "+628127075561",
        nim: "2440026862",
      },
      {
        name: "Bryan Zheng",
        email: "bryanzheng@gmail.com",
        phone: "+6281261459889",
        nim: "2440026634",
      },
    ],
  },
];

const main = async () => {
  await Promise.all(
    groupsData.map(async (group) => {
      console.log(group);
      return prisma.group.upsert({
        where: { name: group.name },
        update: {},
        create: {
          name: group.name,
          pic: group.pic,
          Participant: {
            create: group.participants.map((participant) => {
              return {
                name: participant.name,
                email: participant.email,
                phone: participant.phone,
                nim: participant.nim,
              };
            }),
          },
        },
      });
    })
  );
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
