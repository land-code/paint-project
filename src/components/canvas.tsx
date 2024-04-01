'use client'

import { useEffect, useRef } from 'react'
import styles from './canvas.module.css'
import { useDrawing } from '@/hooks/use-drawing'
import { useBackgroundCanvas } from '@/hooks/use-background-canvas'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { activeSquare, squares } = useDrawing({ canvas: canvasRef.current })
  const { backgroundImage } = useBackgroundCanvas({
    canvas: canvasRef.current,
    src: '/house.png'
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !backgroundImage) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.beginPath()

    squares.forEach(square => {
      ctx.fillStyle = 'black'
      ctx.fillRect(square.x, square.y, square.width, square.height)
    })

    if (activeSquare) {
      ctx.fillStyle = 'red'
      ctx.fillRect(
        activeSquare.x,
        activeSquare.y,
        activeSquare.width,
        activeSquare.height
      )
    }
  }, [activeSquare, squares, backgroundImage])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
