export function ChessboardBackground() {
  return (
    <div className="fixed inset-0 opacity-5 z-0">
      <div className="grid grid-cols-8 h-full">
        {Array.from({ length: 64 }).map((_, i) => {
          const row = Math.floor(i / 8)
          const col = i % 8
          const isBlack = (row + col) % 2 === 1
          return <div key={i} className={`${isBlack ? "bg-black" : "bg-white"}`} />
        })}
      </div>
    </div>
  )
}

