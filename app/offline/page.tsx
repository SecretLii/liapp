import { WifiOff, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4">
        <div className="flex justify-center">
          <WifiOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">You're Offline</h1>
        <p className="text-muted-foreground">
          Please check your internet connection and try again.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Some features may be available offline if you've visited them before.
        </p>
      </div>
    </div>
  )
} 