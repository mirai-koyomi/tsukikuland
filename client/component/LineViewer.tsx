import React, { FC, useCallback, useContext, useEffect, useRef, useState, WheelEventHandler } from 'react'
import ArtContext from '../ArtContext'
import { useKey } from 'react-use'
import ScrollArea from './ScrollArea'

interface ILineViewProps {
  item: IJsonDataNovel
  onLineEnd: (bool: boolean) => void
}

const LineView: FC<ILineViewProps> = ({item}) => {
  const {title, text} = item
  const {headerViewSwitch, handleRelativeSwitch} = useContext(ArtContext)
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
                className={`line-view__line ${idx === focusLine ? '--active' : ''}`}
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
      headerViewSwitch(false)
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
    handleRelativeSwitch(false)

    return () => {
      setFocusLine(0)
      setShowFooter(false)
      headerViewSwitch(true)
    }
  }, [item])

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
    <div className={`line-view${showFooter ? ' --show-footer' : ''}`} onWheel={handleWheel}>
      <ScrollArea view={focusLine} total={lineAry.length} scrollTop={scrollTop}>
        <div className="line-view__header">
          <h1 className="line-view__title">{title}</h1>
        </div>

        <div className="line-view__body">
          {eachLineWrap(lineAry)}
        </div>
      </ScrollArea>
    </div>
  )
}

export default LineView