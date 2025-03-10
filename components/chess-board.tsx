"use client"

import { useEffect, useRef } from "react"

interface ChessBoardProps {
  fen: string
  size?: number
}

export function ChessBoard({ fen, size = 300 }: ChessBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const squareSize = size / 8

    // Draw the board
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0
        ctx.fillStyle = isLight ? "#f0d9b5" : "#b58863"
        ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize)
      }
    }

    // Parse FEN and draw pieces
    const fenParts = fen.split(" ")
    const position = fenParts[0]
    const rows = position.split("/")

    const loadPiece = (piece: string, x: number, y: number) => {
      const img = new Image()
      img.src = `/pieces/${piece}.svg`
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, x, y, squareSize, squareSize)
      }
      img.onerror = () => {
        // Fallback to colored squares for pieces if images fail to load
        const pieceColors: Record<string, string> = {
          p: "#333",
          n: "#333",
          b: "#333",
          r: "#333",
          q: "#333",
          k: "#333",
          P: "#eee",
          N: "#eee",
          B: "#eee",
          R: "#eee",
          Q: "#eee",
          K: "#eee",
        }

        ctx.fillStyle = pieceColors[piece]
        ctx.beginPath()
        ctx.arc(x + squareSize / 2, y + squareSize / 2, squareSize / 3, 0, 2 * Math.PI)
        ctx.fill()

        // Add a letter in the center
        ctx.fillStyle = piece.toLowerCase() === piece ? "#eee" : "#333"
        ctx.font = `${squareSize / 2}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(piece.toUpperCase(), x + squareSize / 2, y + squareSize / 2)
      }
    }

    let currentRow = 0
    let currentCol = 0

    for (const row of rows) {
      currentCol = 0
      for (const char of row) {
        if (/\d/.test(char)) {
          // Skip empty squares
          currentCol += Number.parseInt(char)
        } else {
          // Draw piece
          loadPiece(char, currentCol * squareSize, currentRow * squareSize)
          currentCol++
        }
      }
      currentRow++
    }

    // Draw coordinates
    ctx.fillStyle = "#000"
    ctx.font = `${squareSize / 4}px Arial`
    ctx.textAlign = "center"

    // Files (a-h)
    for (let i = 0; i < 8; i++) {
      ctx.fillText(String.fromCharCode(97 + i), (i + 0.5) * squareSize, size - 2)
    }

    // Ranks (1-8)
    for (let i = 0; i < 8; i++) {
      ctx.fillText(String(8 - i), 4, (i + 0.5) * squareSize)
    }
  }, [fen, size])

  return (
    <div className="flex justify-center my-4">
      <canvas ref={canvasRef} width={size} height={size} className="border border-gray-300 rounded shadow-md" />
    </div>
  )
}

