"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { MobileNav } from "./mobile-nav"
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sword, Scroll, Gamepad2 } from 'lucide-react'

interface Game {
  id: string
  title: string
  slug: string
  description: string
}

interface NavProps {
  games: Game[]
}

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/games',
      label: 'Games',
      icon: ({ className, ...props }) => (
        <Gamepad2 
          className={`${className} group-hover:animate-spin-slow text-emerald-500`}
          strokeWidth={2}
          {...props}
        />
      ),
    },
    {
      href: '/guides',
      label: 'Guides',
      icon: ({ className, ...props }) => (
        <Scroll 
          className={`${className} group-hover:animate-bounce text-indigo-500`}
          strokeWidth={2}
          {...props}
        />
      ),
    },
    {
      href: '/ai-assistant',
      label: 'Axiom',
      icon: ({ className, ...props }) => (
        <Sword 
          className={`${className} group-hover:rotate-45 text-destructive transition-transform duration-300`}
          strokeWidth={2.5}
          {...props}
        />
      ),
    },
  ]

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <div className="flex items-center space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === route.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                <Button
                  variant={pathname === route.href ? "default" : "ghost"}
                  className="flex items-center gap-2 group"
                >
                  {route.icon && <route.icon className="h-4 w-4" />}
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function Nav({ games }: NavProps) {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Guides for Gamers
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="relative hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Games</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/games"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Featured Games
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Browse our collection of comprehensive gaming guides
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <div className="col-span-1 max-h-[300px] overflow-y-auto">
                    {games.map((game) => (
                      <ListItem 
                        key={game.id}
                        href={`/games/${game.slug}`} 
                        title={game.title}
                      >
                        {game.description}
                      </ListItem>
                    ))}
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <ListItem href="/admin/guides/create" title="Create Guide">
                    Share your knowledge with the community
                  </ListItem>
                  <ListItem href="/guides" title="Browse Guides">
                    Explore all available guides
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/admin" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Admin
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <MobileNav games={games} />
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem" 