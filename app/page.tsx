import { AnalyzeForm } from "@/components/analyze-form"
import { ChessboardBackground } from "@/components/chessboard-background"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <ChessboardBackground />
      <div className="max-w-3xl w-full mx-auto z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Chess.com Game Analyzer</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Analyze a player's chess games and get AI-powered insights
          </p>
        </div>
        <AnalyzeForm />
      </div>
    </main>
  )
}

