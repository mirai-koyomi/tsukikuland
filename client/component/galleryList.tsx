import { convertLineEndCode } from "./../Util"
import React, { FC, useCallback, useEffect, useRef, useState, WheelEventHandler } from "react"
import {animated, useSprings} from "react-spring"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"
import useInterval from "use-interval"

interface IGalleryListProps {
  list: {
    id: number
    title: string
    artist: string
    synopsis: string
    text: string
    thumbnail?: string
  }[]
  imgs: {
    [key in number]: string
  }
}

const GalleryList: FC<IGalleryListProps> = ({list, imgs}) => {
  const scrollArea = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState(8)
  const [lastTime, setLastTime]= useState(0)
  const interval = 100

  const copyList = [...list, ...list, ...list]

  const scrollListTo = useCallback((
    idx: number,
    duration: number = interval,
    nextIdx: number = currentIdx,
    onRest?: () => void
  ): {
    opacity: number
    scale: number
    y: number
    x: number
    config: {duration: number}
    onRest?: () => void
  } => {
    const deps = Math.abs(nextIdx - idx)
    const y = idx > nextIdx ? deps * (90 - (4 * deps)) : 0 - deps * (90 - (4 * deps))
    const x = 0 - deps * (14 + (6 * deps))
    const lot = 1 / 6

    return {
      opacity: deps > 5 ? 0 : 1 - lot * deps,
      scale: deps > 5 ? 0 : 1 - lot * deps,
      y,
      x,
      config: {duration},
      onRest,
    }
  }, [currentIdx])

  const [styles, api] = useSprings(
    copyList.length,
    idx => ({
      to: {
        ...scrollListTo(idx),
      },
      from: {
        ...scrollListTo(idx),
      },
    })
  )

  const handleWheel: WheelEventHandler = (e): void => {
    const now = new Date().getTime()

    if (now - lastTime > interval) {
      let nextIdx = currentIdx

      if (e.deltaY > 0) {
        if (currentIdx + 1 > list.length * 2) {
          nextIdx = currentIdx - list.length
          api.start(idx => scrollListTo(idx, 0, nextIdx, () => setCurrentIdx(nextIdx + 1)))
        } else {
          setCurrentIdx(nextIdx + 1)
        }
      } else {
        if (list.length > currentIdx - 1) {
          nextIdx = currentIdx + list.length
          api.start(idx => scrollListTo(idx, 0, nextIdx, () => setCurrentIdx(nextIdx - 1)))
        } else {
          setCurrentIdx(nextIdx - 1)
        }
      }

      setLastTime(now)
    }
  }

  const targetItem = copyList[currentIdx]

  useEffect(() => {
    api.start(idx => scrollListTo(idx))
  }, [currentIdx])

  return (
    <div className="gallery" onWheel={handleWheel} ref={scrollArea}>
      <div className="gallery__nav">
        <ul className="gallery__list">
          {styles.map((style, i) => {
            const item = copyList[i]
            return (
              <animated.li className={'gallery__item'} style={style}>
                <span className="gallely__name">
                  {convertLineEndCode(item.title)}
                </span>
              </animated.li>
            )
          })}
        </ul>
      </div>

      <div className="gallery__content">
        <div className="gallery__bg" style={{backgroundImage: `url(${imgs[targetItem.id]})`}}>
          <div className="gallery__info">
            <div className="gallery__front-area">
              <h1 className="gallery__title">
                {convertLineEndCode(targetItem.title)}
              </h1>

              <p className="gallery__synopsis">
                {convertLineEndCode(targetItem.synopsis)}
              </p>

              <p className="gallery__artist">
                Write by {targetItem.artist}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryList