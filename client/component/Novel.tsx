import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import WorkFooter from './WorkFooter'
import StaticView from './StaticView'
import ArtContext from './../ArtContext'

interface INovelProps {
  list: IJsonData[]
  creatorList: IJsonCreator[]
  item: IJsonDataNovel
  icons: {[key in string]: string}
}

const Novel: FC<INovelProps> = ({list, creatorList, item, icons}) => {
  const {creator_id} = item
  const artist = creatorList.find(creator => creator.id === creator_id)
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

  useEffect(() => {
    setPos(0)
    window.scrollTo({top: 0})
  }, [item])

  return (
    <div className={`novel`}>
      <div className="novel__wrap">
        <StaticView item={item} />
      </div>

      {
        artist ? (
          <WorkFooter currentArticleId={item.id} artist={artist} icons={icons} list={list} creatorList={creatorList} _ref={footerRef} />
        ) : null
      }
    </div>
  )
}

export default Novel