import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Photo } from '../data/albums'

interface Props {
  photos: Photo[]
}

export default function PhotoViewer({ photos }: Props) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const go = (next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const prev = () => index > 0 && go(index - 1)
  const next = () => index < photos.length - 1 && go(index + 1)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) next()
    else if (diff < -50) prev()
    touchStartX.current = null
  }

  const photo = photos[index]

  return (
    <div
      className="relative flex flex-col items-center justify-center bg-white"
      style={{ height: '100dvh' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={photo.src}
            alt={photo.caption ?? `Photo ${index + 1}`}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
          />
          {photo.caption && (
            <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none">
              <span
                className="px-4 py-1 rounded-full text-sm text-white"
                style={{ background: 'rgba(0,0,0,0.55)' }}
              >
                {photo.caption}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Prev button */}
      {index > 0 && (
        <button
          className="absolute left-2 z-10 btn btn-circle btn-sm bg-black/40 border-0 text-white hover:bg-black/60"
          onClick={prev}
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {index < photos.length - 1 && (
        <button
          className="absolute right-2 z-10 btn btn-circle btn-sm bg-black/40 border-0 text-white hover:bg-black/60"
          onClick={next}
        >
          ›
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-white/60 text-sm">
          {index + 1} / {photos.length}
        </span>
      </div>
    </div>
  )
}
