import React, { FC, useMemo, useRef, useState, WheelEventHandler } from "react"

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

  const handleWheel: WheelEventHandler = (e): void => {
    const now = new Date().getTime()
    if (now - lastTime > interval) {
      if (e.deltaY > 0) {
        nextIdx()
      } else {
        backIdx()
      }
    }
    lastTime = now
  }

  return (
    <div className="gallery" onWheel={handleWheel} ref={scrollArea}>
      <div className="gallery__nav">
        <p>{currentIdx}</p>
        <ul className="gallery__list">
          {listItem(rotateList)}
        </ul>
      </div>
    </div>
  )
}

export default GalleryList