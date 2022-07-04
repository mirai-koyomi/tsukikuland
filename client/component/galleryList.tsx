import React, { FC, useCallback, useEffect, useRef, useState, WheelEventHandler } from "react"
import {animated, useSprings} from "react-spring"

interface IGalleryListProps {
  list: {
    title: string
    artist: string
    synopsis: string
    thumbnail?: string
  }[]
}

const GalleryList: FC<IGalleryListProps> = ({list}) => {
  const scrollArea = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState(6)
  let lastTime = 0
  const interval = 1000

  const scrollListTo = useCallback((idx: number): {opacity: number, transform: string} => {
    const deps = Math.abs(currentIdx - idx)
    return {
      opacity: deps > 3 ? 0 : 1 - .25 * deps,
      transform: `scale(${deps > 3 ? 0 : 100 - 25 * deps}%)`,
    }
  }, [currentIdx])

  const [styles, api] = useSprings(
    list.length,
    idx => scrollListTo(idx)
  )

  const handleWheel: WheelEventHandler = (e): void => {
    const now = new Date().getTime()

    if (now - lastTime > interval) {
      if (e.deltaY > 0) {
        setCurrentIdx(idx => (idx + 1) % list.length)
      } else {
        setCurrentIdx(idx => (idx - 1) % list.length)
      }


      lastTime = now
    }
  }

  useEffect(() => {
    api.start(idx => scrollListTo(idx))
  }, [currentIdx])

  return (
    <div className="gallery" onWheel={handleWheel} ref={scrollArea}>
      <div className="gallery__nav">
        <p>{currentIdx}</p>
        <ul className="gallery__list">
          {styles.map((style, i) => {
            const item = list[i]
            return (
              <animated.li style={style}>{item.title}</animated.li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default GalleryList