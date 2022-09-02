import ArtContext from '../ArtContext'
import React, { FC, useCallback, useContext, useEffect, useMemo, useRef, useState, WheelEventHandler } from 'react'
import { useParams } from 'react-router-dom'
import { useKey } from 'react-use'
import ScrollArea from './ScrollArea'
import WriterInfo from './WriterInfo'

interface IArticleProps {
  list: {
    id: string
    title: string
    artist: string
    synopsis: string
    text: string
    thumbnail?: string
  }[]
}

const Article: FC<IArticleProps> = ({list}) => {
  const {article_id} = useParams<{article_id: string}>()
  const item = useMemo(() => list.find(item => item.id === article_id), [article_id])

  if (item) {
    const {title, text, artist} = item
    const footerRef = useRef<HTMLDivElement>(null)
    const {headerViewSwitch} = useContext(ArtContext)
    const lineAry = text.split('\n')
    const [focusLine, setFocusLine] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)
    const [showFooter, setShowFooter] = useState(false)
    const targetLine = useRef<HTMLParagraphElement>(null)

    const eachLineWrap = useCallback((lineAry: string[]): JSX.Element => {
      return (
        <>
          {
            lineAry.map((line, idx) => {
              return (
                <p
                  className={`article__line ${idx === focusLine ? '--active' : ''}`}
                  ref={idx === focusLine ? targetLine : undefined}
                  key={idx}
                >{line}</p>
              )
            })
          }
        </>
      )
    }, [focusLine])

    const nextLine = useCallback(() => {
      if (lineAry.length - 1 === focusLine) {
        headerViewSwitch(true)
        setShowFooter(true)
      } else {
        headerViewSwitch(false)
        setFocusLine(focusLine => {
          return focusLine + 1
        })
      }
    }, [focusLine, setShowFooter])

    const backLine = useCallback(() => {
      if (showFooter) {
        setShowFooter(false)
      } else {
        headerViewSwitch(true)
        setFocusLine(focusLine => {
          return 0 < focusLine ? focusLine - 1 : 0
        })
      }
    }, [showFooter])

    const handleWheel: WheelEventHandler = useCallback((e) => {
      e.deltaY > 0 ? nextLine() : backLine()
    }, [nextLine, backLine])

    useEffect(() => {
      const nextScrollTop = targetLine.current ? (
        targetLine.current.offsetHeight / 2 + targetLine.current.offsetTop
      ) : 0
      setScrollTop(nextScrollTop)
    }, [focusLine, targetLine])

    const nextLineKey = (event: KeyboardEvent) => {
      return (
        (!event.shiftKey && event.key === 'Enter') ||
        (!event.shiftKey && event.code === 'Space') ||
        event.key === 'ArrowDown'
      )
    }

    const backLineKey = (event: KeyboardEvent) => {
      return (
        (event.shiftKey && event.key === 'Enter') ||
        (event.shiftKey && event.code === 'Space') ||
        event.key === 'ArrowUp'
      )
    }

    useKey(nextLineKey, nextLine)
    useKey(backLineKey, backLine)

    return (
      <div className={`article${showFooter ? ' --show-footer' : ''}`} onWheel={handleWheel}>
        <ScrollArea view={focusLine} total={lineAry.length} scrollTop={scrollTop}>
          <div className="article__header">
            <h1 className="article__title">{title}</h1>
          </div>

          <div className="article__body">
            {eachLineWrap(lineAry)}
          </div>
        </ScrollArea>

        <div className="article__footer" ref={footerRef}>
          <div className="article__writer-info">
            <WriterInfo artist={item.artist} />
          </div>

          <div className="article__other-work">

          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        存在しない記事です。
      </div>
    )
  }
}

export default Article