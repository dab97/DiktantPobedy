import Gallery from "@/components/gallery";
import { ThemeProvider } from "@/components/theme-provider";
// import { BackgroundPattern } from "@/components/background-pattern";


export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* <BackgroundPattern /> */}
        <Gallery />
      </div>
    </ThemeProvider>
  );
}
