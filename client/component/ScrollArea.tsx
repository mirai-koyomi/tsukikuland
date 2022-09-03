import React, { CSSProperties, FC, ReactNode, RefObject, useMemo, useRef } from 'react'

interface IScrollAreaProps {
  view: number
  total: number
  scrollTop: number
  children: ReactNode
}

const ScrollArea: FC<IScrollAreaProps> = ({view, total, scrollTop, children}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const scrollPos = useMemo(() => {
    return scrollAreaRef.current ? (
      scrollAreaRef.current.offsetHeight / 2 - scrollTop
    ) : 0
  }, [scrollTop])
  const height = useMemo(() => 100 / total, [total])
  const style: CSSProperties = {
    height: `${height}%`,
    top: `${height * view}%`,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }

  return (
    <div className="scroll-area" ref={scrollAreaRef}>
      <div className="scroll-area__wrap" style={{top: scrollPos}}>
        {children}
      </div>

      <div className="scroll-area__bar">
        <div className="scroll-area__grip" style={style} />
      </div>
    </div>
  )
}

export default ScrollArea