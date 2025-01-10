import { prisma } from '@/lib/prisma'
import Nav from './nav'

export default async function NavWrapper() {
  const games = await prisma.game.findMany({
    orderBy: {
      title: 'asc'
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true
    }
  })

  return <Nav games={games} />
} 