import { ThemeProvider } from 'next-themes'
import I18nProvider from './components/I18nProvider'
import './globals.css'

export const metadata = {
  title: 'ES Drager',
  description: 'A lightweight draggable component for React',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
