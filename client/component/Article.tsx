import React, { FC, useEffect, useRef, useState, WheelEventHandler } from 'react'

interface IArticleProps {
  item: {
    id: string
    title: string
    artist: string
    synopsis: string
    text: string
    thumbnail?: string
  }
}

const Article: FC<IArticleProps> = ({item}) => {
  const {title, artist, synopsis, text} = item
  const [focusLine, setFocusLine] = useState(0)
  const targetLine = useRef<HTMLParagraphElement>()

  const eachLineWrap = (string: string): JSX.Element => {
    return (
      <>
        {string.split('\n').map((line, idx) => <p ref={idx === focusLine ? targetLine : undefined}>{line}</p>)}
      </>
    )
  }

  const handleWheel: WheelEventHandler = (e) =>  {
    e.deltaY > 0 ? setFocusLine(focusLine => focusLine + 1) : setFocusLine(focusLine => focusLine - 1)
  }

  useEffect(() => {

  }, [focusLine])

  return (
    <div className="article" onWheel={handleWheel}>
      <div className="article__header">
        <h1 className="article__title">{title}</h1>
      </div>

      <div className="article__body">
        {eachLineWrap(text)}
      </div>

      <div className="article__footer">
        Writer: {artist}
      </div>
    </div>
  )
}

export default Article