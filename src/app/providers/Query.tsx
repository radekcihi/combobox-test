"use client"
import { useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"

export default function QueryProvider({ children }: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => {
                console.error(error)
            }
        })
    }))

    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider >
    )
}