import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.game.createMany({
    data: [
      {
        title: "World of Warcraft",
        slug: "world-of-warcraft",
        description: "From raid strategies to class builds, master Azeroth with our comprehensive guides.",
        image: "/images/wow-banner.jpg",
        guideCount: 1000
      },
      {
        title: "Path of Exile",
        slug: "path-of-exile",
        description: "Navigate the complexity of builds and mechanics with expert guidance.",
        image: "/images/poe-banner.jpg",
        guideCount: 500
      },
      {
        title: "League of Legends",
        slug: "league-of-legends",
        description: "Dominate the lanes with champion guides and macro strategy tutorials.",
        image: "/images/lol-banner.jpg",
        guideCount: 750
      }
    ]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 