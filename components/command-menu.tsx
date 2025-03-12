"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogContent className="overflow-hidden p-0">
        <CommandPrimitive className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              placeholder="Type a command or search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandPrimitive.Empty>No results found.</CommandPrimitive.Empty>
            <CommandPrimitive.Group heading="Navigation">
              <CommandPrimitive.Item
                onSelect={() => runCommand(() => router.push("/"))}
              >
                Home
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => runCommand(() => router.push("/games"))}
              >
                Games
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => runCommand(() => router.push("/guides"))}
              >
                Guides
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => runCommand(() => router.push("/ai-assistant"))}
              >
                AI Assistant
              </CommandPrimitive.Item>
            </CommandPrimitive.Group>
            <CommandPrimitive.Group heading="Actions">
              <CommandPrimitive.Item
                onSelect={() => runCommand(() => router.push("/guides/create"))}
              >
                Create Guide
              </CommandPrimitive.Item>
              <CommandPrimitive.Item
                onSelect={() => runCommand(() => router.push("/games/create"))}
              >
                Add Game
              </CommandPrimitive.Item>
            </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
} 