import React, { CSSProperties, FC, useMemo, useRef, useState, WheelEventHandler } from "react"
import {useTransition, animated, useSprings} from "react-spring"

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

  const beforeItemNum = useMemo(() => Math.floor((list.length - 1) / 2), [])
  const rotateList = useMemo(() => {
    const resultList = [...list]
    if (currentIdx < beforeItemNum) {
      resultList.unshift( ...resultList.splice(resultList.length - (beforeItemNum - currentIdx), resultList.length) )
    } else if (beforeItemNum < currentIdx) {
      resultList.unshift( ...resultList.splice(currentIdx - beforeItemNum, resultList.length) )
    }

    return resultList
  }, [currentIdx])

  const nextIdx = (): void => {
    setCurrentIdx(
      currentIdx + 1 >= list.length ? 0 : currentIdx + 1
    )
  }

  const backIdx = (): void => {
    setCurrentIdx(
      currentIdx <= 0 ? list.length - 1 : currentIdx - 1
    )
  }

  const listItem = (
    list: {
      title: string
      artist: string
      synopsis: string
      thumbnail?: string
    }[]
  ): JSX.Element[] => {
    return list.map((item, i) => {
      if (beforeItemNum > i) {
        return (
          <li className={`gallery__item --number-${beforeItemNum - i}`}>{item.title}</li>
        )
      } else if (beforeItemNum === i) {
        return (
          <li className={`gallery__item`}>{item.title}</li>
        )
      } else {
        return (
          <li className={`gallery__item --number-${i - beforeItemNum}`}>{item.title}</li>
        )
      }
    })
  }

  const transitions = useTransition(currentIdx, {
    from: (current, idx) => {
      const deps = Math.abs(current - idx)
      return {
        opacity: deps > 3 ? 0 : 1 - .25 * deps,
        transform: `scale(${deps > 3 ? 0 : 1 - .25 * deps}%)`,
      }
    },
    leave: (current, idx) => {
      const deps = Math.abs(current - idx)
      return {
        opacity: deps > 3 ? 0 : 1 - .25 * deps,
        transform: `scale(${deps > 3 ? 0 : 1 - .25 * deps}%)`,
      }
    },
    enter: {
      opacity: 1,
      transform: 'scale(100%)',
    },
  })

  const [styles, api] = useSprings(
    list.length,
    idx => {
      const deps = Math.abs(currentIdx - idx)
      return {
        opacity: deps > 3 ? 0 : 1 - .25 * deps,
        transform: `scale(${deps > 3 ? 0 : 100 - 25 * deps}%)`,
      }
    }
  )

  const handleWheel: WheelEventHandler = (e): void => {
    const now = new Date().getTime()

    if (now - lastTime > interval) {
      if (e.deltaY > 0) {
        setCurrentIdx(idx => (idx + 1) % rotateList.length)
        api.start(idx => {
          const deps = Math.abs(currentIdx + 1 - idx)
          return {
            opacity: deps > 3 ? 0 : 1 - .25 * deps,
            transform: `scale(${deps > 3 ? 0 : 100 - 25 * deps}%)`,
          }
        })
      } else {
        setCurrentIdx(idx => (idx - 1) % rotateList.length)
      }


      lastTime = now
    }
  }

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