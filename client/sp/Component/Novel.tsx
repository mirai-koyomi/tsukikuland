import ArtContext from "./../Context/ArtContext"
import React, { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
import { convertLineEndCode } from "./../../Util"
import WorkFooter from "./WorkFooter"

interface INovelProps {
  works: IJsonData[]
  creators: IJsonCreator[]
  icons: {
    [key in string]: string
  }
  work: IJsonDataNovel
}

const Novel: FC<INovelProps> = ({works, creators, icons, work}) => {
  const {creator_id} = work
  const creator = creators.find(creator => creator.id === creator_id)
  const footerRef = useRef<HTMLDivElement>(null)
  const {headerViewSwitch} = useContext(ArtContext)
  const [pos, setPos] = useState(0)

  const scrollTop = (): number => {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  }

  const onScroll = useCallback((): void => {
    const position = scrollTop()

    if (footerRef.current) {
      if (position >= footerRef.current.offsetTop - window.outerHeight + 130) {
        headerViewSwitch(true)
      } else {
        if (pos < position) {
          headerViewSwitch(false)
        } else {
          headerViewSwitch(true)
        }
      }
    }

    setPos(position)
  }, [pos, scrollTop])

  useEffect(() => {
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <div className={`novel`}>
      <div className="novel__wrap">
        <h1 className="novel__title section__title">{work.title}</h1>
        <p className="novel__text section__text">
          {convertLineEndCode(work.text)}
        </p>
      </div>

      {
        creator ? (
          <WorkFooter currentArticleId={work.id} creator={creator} icons={icons} works={works} creators={creators} _ref={footerRef} />
        ) : null
      }
    </div>
  )
}

export default Novel