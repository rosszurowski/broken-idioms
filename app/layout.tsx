import Script from "next/script"
import "./index.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <Script
        src="https://plausible.io/js/plausible.js"
        strategy="afterInteractive"
        data-domain="broken-idioms.com"
      />
    </html>
  )
}
