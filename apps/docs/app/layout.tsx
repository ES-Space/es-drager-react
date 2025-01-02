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
      <body>
        {children}
      </body>
    </html>
  )
}
