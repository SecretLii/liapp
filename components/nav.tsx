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
import { Sword, Scroll, Gamepad2, BookOpenCheck, LogIn, UserPlus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Game {
  id: string
  title: string
  slug: string
  description: string
}

interface NavProps {
  games: Game[]
}

interface IconProps {
  className?: string;
  [key: string]: any;
}

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: '/',
      label: 'Home',
      tooltip: 'Go to homepage'
    },
    {
      href: '/games',
      label: 'Games',
      tooltip: 'Browse all games',
      icon: ({ className, ...props }: IconProps) => (
        <Gamepad2 
          className={`${className} group-hover:animate-game-pulse text-emerald-500`}
          strokeWidth={2}
          {...props}
        />
      ),
    },
    {
      href: '/guides',
      label: 'Guides',
      tooltip: 'Browse all guides',
      icon: ({ className, ...props }: IconProps) => (
        <Scroll 
          className={`${className} group-hover:animate-scroll-float text-indigo-500`}
          strokeWidth={2}
          {...props}
        />
      ),
    },
    {
      href: '/ai-assistant',
      label: 'Axiom',
      tooltip: 'Chat with AI assistant',
      icon: ({ className, ...props }: IconProps) => (
        <Sword 
          className={`${className} group-hover:animate-sword-slash text-destructive`}
          strokeWidth={2.5}
          {...props}
        />
      ),
    },
  ]

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              {routes.map((route) => (
                <Tooltip key={route.href}>
                  <TooltipTrigger asChild>
                    <Link
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{route.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-2">
            {/* Guest buttons */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign in to your account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/signup">
                    <Button size="sm" className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new account</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Admin link */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/admin"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      pathname === '/admin'
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Button
                      variant={pathname === '/admin' ? "default" : "ghost"}
                      size="sm"
                    >
                      Admin
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Access admin dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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