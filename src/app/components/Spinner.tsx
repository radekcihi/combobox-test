import { cn } from "../lib/utils";

export default function Spinner({ className }: { className?: string }) {
    return (
        <div className={cn("animate-spin rounded-full h-5 w-5 border-b-2 border-green-600",
            className)}></ div>
    )
}

