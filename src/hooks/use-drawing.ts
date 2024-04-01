import { Square } from '@/types/drawing'
import { useEffect, useState } from 'react'

interface useDrawingProps {
  canvas: HTMLCanvasElement | null
}

export const useDrawing = ({ canvas }: useDrawingProps) => {
  const [squares, setSquares] = useState<Square[]>([])
  const [activeSquare, setActiveSquare] = useState<Square | null>(null)

  useEffect(() => {
    if (!canvas) return
    const canvasLeft = canvas.offsetLeft + canvas.clientLeft
    const canvasTop = canvas.offsetTop + canvas.clientTop

    let initialX = 0
    let initialY = 0

    const handleMouseDown = (e: MouseEvent) => {
      setActiveSquare({
        x: e.pageX - canvasLeft,
        y: e.pageY - canvasTop,
        width: 0,
        height: 0
      })
      initialX = e.pageX - canvasLeft
      initialY = e.pageY - canvasTop
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - canvasLeft
      const y = e.pageY - canvasTop

      setActiveSquare(activeSquare => {
        if (!activeSquare) return null
        return {
          ...activeSquare,
          width: x - activeSquare.x,
          height: y - activeSquare.y
        }
      })
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (!activeSquare) return

      setSquares([...squares, activeSquare])
      setActiveSquare(null)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [canvas, activeSquare, setActiveSquare, squares, setSquares])

  return {
    squares,
    activeSquare
  }
}
