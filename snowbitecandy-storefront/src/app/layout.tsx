import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Inter, Lilita_One } from "next/font/google"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400", // Lilita One only has one weight
  display: "swap",
  variable: "--font-lilita-one",
})


export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className={`relative ${lilita.variable}`}>{props.children}</main>
      </body>
    </html>
  )
}
