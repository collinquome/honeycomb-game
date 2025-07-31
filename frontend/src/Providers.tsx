import {TooltipProvider} from '@/components/ui/tooltip'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from '@/components/useAuth'

/**
 * Wraps app with various React Context Providers. Used in main.tsx
 */
export const Providers = ({children}: PropsWithChildren) => (
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <AuthProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </AuthProvider>
  </ThemeProvider>
)
