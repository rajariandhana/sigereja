import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

export function Providers({children}) {
  return (
    <HeroUIProvider locale='id-ID'>
      <ToastProvider/>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </HeroUIProvider>
  )
}