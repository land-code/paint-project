import { useEffect, useState } from 'react'

interface useBackgroundCanvasProps {
  canvas: HTMLCanvasElement | null
  src: string
}

export const useBackgroundCanvas = ({
  canvas,
  src: backgroundSrc
}: useBackgroundCanvasProps) => {
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const backgroundImage = new Image()
    backgroundImage.src = backgroundSrc
    backgroundImage.onload = () => {
      setBackgroundImage(backgroundImage)
    }
  }, [backgroundSrc])

  useEffect(() => {
    if (!canvas || !backgroundImage) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return console.log('Canvas not supported')

    canvas.style.aspectRatio = `${backgroundImage.width}/${backgroundImage.height}`
    canvas.width = canvas.clientWidth
    canvas.height =
      canvas.width * (backgroundImage.height / backgroundImage.width)

    ctx.beginPath()
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    ctx.closePath()

    return () => {
      ctx.beginPath()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.closePath()
    }
  }, [backgroundImage, canvas])

  return { backgroundImage }
}
