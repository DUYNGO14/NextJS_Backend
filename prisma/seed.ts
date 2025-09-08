import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const matches = [
    {
      homeTeam: "MAN UTD",
      awayTeam: "Liverpool",
      kickOff: new Date("2024-03-15T20:00:00Z"),
      location: "Old Trafford",
      league: "Premier League",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"
    },
    {
      homeTeam: "Chelsea",
      awayTeam: "MAN UTD",
      kickOff: new Date("2024-03-22T18:30:00Z"),
      location: "Stamford Bridge",
      league: "Premier League",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"
    },
    {
      homeTeam: "MAN UTD",
      awayTeam: "Arsenal",
      kickOff: new Date("2024-04-05T19:00:00Z"),
      location: "Old Trafford",
      league: "Premier League",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg"
    },
    {
      homeTeam: "Manchester City",
      awayTeam: "MAN UTD",
      kickOff: new Date("2024-04-12T20:00:00Z"),
      location: "Etihad Stadium",
      league: "Premier League",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"
    },
    {
      homeTeam: "MAN UTD",
      awayTeam: "Real Madrid",
      kickOff: new Date("2024-05-01T20:00:00Z"),
      location: "Old Trafford",
      league: "UEFA Champions League",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
    },
    {
      homeTeam: "Barcelona",
      awayTeam: "MAN UTD",
      kickOff: new Date("2024-05-08T20:00:00Z"),
      location: "Camp Nou",
      league: "UEFA Champions League",
      homeLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
      awayLogo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg"
    }
  ];

  for (const m of matches) {
    await prisma.match.create({ data: m });
  }
}

main()
  .then(() => console.log("✅ Seed matches successfully"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
