import { convertLineEndCode } from "./../../Util"
import React, { FC, TouchEventHandler, UIEventHandler, useCallback, useEffect, useRef, useState, WheelEventHandler } from "react"
import {animated, useSprings, useTransition} from "react-spring"
import ReadMoreButton from "../Component/ReadMoreButton"
import Works from "../Component/Works"

interface IGalleryProps {
  works: IJsonData[]
  creators: IJsonCreator[]
  imgs: {
    [key in string]: {
      thumb: string,
      pages?: string[]
    }
  }
}

const Gallery: FC<IGalleryProps> = ({works, creators, imgs}) => {
  const scrollArea = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState(8)
  const [lastTime, setLastTime]= useState(0)
  const [touchPos, setTouchPos] = useState(0)
  const interval = 250

  const copyList = [...works, ...works, ...works]

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
    const y = idx > nextIdx ? deps * (56 - (4 * deps)) : 0 - deps * (56 - (4 * deps))
    const x = deps * (30 + (6 * deps))
    const lot = 1 / 7

    return {
      opacity: idx === nextIdx ? 1 : .4,
      scale: deps > 6 ? 0 : 1 - lot * deps,
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

  const transition = useTransition(currentIdx, {
    from: {x: '60%', opacity: 0},
    enter: {x: '0%', opacity: 1},
    leave: {x: '60%', opacity: 0},
    reverse: true,
    config: { duration: 500 },
  })

  const handleTouchMove: TouchEventHandler = (e): void => {
    e.touches[0].pageY < touchPos ? changeCurrentIdx(currentIdx + 1) : changeCurrentIdx(currentIdx - 1)
  }

  const handleTouchStart: TouchEventHandler = (e): void => {
    setTouchPos(e.touches[0].pageY)
  }

  const changeCurrentIdx = (nextIdx: number) => {
    const now = new Date().getTime()
    const listLength = works.length

    if (now - lastTime > interval) {
      if (listLength > nextIdx) {
        api.start(idx => scrollListTo(idx, 0, currentIdx + listLength, () => {
          setLastTime(now)
          setCurrentIdx(nextIdx + listLength)
        }))
      } else if (nextIdx > listLength * 2) {
        api.start(idx => scrollListTo(idx, 0, currentIdx - listLength, () => {
          setLastTime(now)
          setCurrentIdx(nextIdx - listLength)
        }))
      } else {
        setLastTime(now)
        setCurrentIdx(nextIdx)
      }
    }
  }

  useEffect(() => {
    api.start(idx => scrollListTo(idx))
  }, [currentIdx])

  return (
    <div className="gallery" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} ref={scrollArea}>
      <div className="gallery__content">
        {
          transition((styles, idx) => {
            const targetItem = copyList[idx]
            const creator = creators.find((creator) => creator.id === targetItem.creator_id)

            return creator ? (
              <animated.div className="gallery__works" style={styles}>
                <Works work={targetItem} creator={creator} imgs={imgs} />
              </animated.div>
            ) : null
          })
        }
      </div>

      <div className="gallery__nav">
        <ul className="gallery__list">
          {styles.map((style, i) => {
            const item = copyList[i]
            return (
              <animated.li className={'gallery__item'} key={i} style={style} onClick={() => changeCurrentIdx(i)}>
                <span className="gallely__name">
                  {convertLineEndCode(item.title)}
                </span>
              </animated.li>
            )
          })}
        </ul>

      </div>

      <div className="gallery__read-button">
        <ReadMoreButton to={`/gallery/${copyList[currentIdx].id}`} />
      </div>
    </div>
  )
}

export default Gallery
