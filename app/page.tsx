import Gallery from "@/components/gallery"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Gallery />
      </div>
    </ThemeProvider>
  )
}
