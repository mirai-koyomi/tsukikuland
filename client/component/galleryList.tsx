import { convertLineEndCode } from "./../Util"
import React, { FC, useCallback, useEffect, useRef, useState, WheelEventHandler } from "react"
import {animated, useSprings, useTransition} from "react-spring"
import { Link } from "react-router-dom"

interface IGalleryListProps {
  list: IJsonData[]
  creatorList: IJsonCreator[]
  imgs: {
    [key in string]: {
      thumb: string,
      pages?: string[]
    }
  }
}

const GalleryList: FC<IGalleryListProps> = ({list, creatorList, imgs}) => {
  const scrollArea = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState(8)
  const [lastTime, setLastTime]= useState(0)
  const interval = 250

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

  const handleWheel: WheelEventHandler = (e): void => {
    e.deltaY > 0 ? changeCurrentIdx(currentIdx + 1) : changeCurrentIdx(currentIdx - 1)
  }

  const changeCurrentIdx = (nextIdx: number) => {
    const now = new Date().getTime()
    const listLength = list.length

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
    <div className="gallery" onWheel={handleWheel} ref={scrollArea}>
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

      <div className="gallery__content">
        {
          transition((styles, idx) => {
            const targetItem = copyList[idx]
            return (
              <animated.div className="gallery__bg" style={{backgroundImage: `url(${imgs[targetItem.id].thumb})`, ...styles}}>
                <div className="gallery__info">
                  <div className="gallery__front-area">
                    <Link to={`${targetItem.id}`} className={'gallery__link'}>
                      <h1 className="gallery__title">
                        {convertLineEndCode(targetItem.title)}
                      </h1>

                      <p className="gallery__synopsis">
                        {convertLineEndCode(targetItem.synopsis)}
                      </p>

                      <p className="gallery__artist">
                        {
                          `Author by ${creatorList.find(creator => {
                            return creator.id === targetItem.creator_id
                          })?.name}`
                        }
                      </p>
                    </Link>
                  </div>

                </div>
              </animated.div>
            )
          })
        }
      </div>
    </div>
  )
}

export default GalleryList