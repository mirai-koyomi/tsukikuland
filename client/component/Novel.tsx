import ArtContext from '../ArtContext'
import React, { FC, useCallback, useContext, useEffect, useRef, useState, WheelEventHandler } from 'react'
import OtherWorks from './OtherWorks'
import WriterInfo from './WriterInfo'
import { convertLineEndCode } from './../Util'

interface INovelProps {
  list: IJsonData[]
  creatorList: IJsonCreator[]
  item: IJsonDataNovel
  icons: {[key in string]: string}
}

const Novel: FC<INovelProps> = ({list, creatorList, item, icons}) => {
  const {title, text, creator_id} = item
  const artist = creatorList.find(creator => creator.id === creator_id)
  const footerRef = useRef<HTMLDivElement>(null)
  const {headerViewSwitch, handleRelativeSwitch} = useContext(ArtContext)


  return (
    <div className={`novel`} >
      <div className="novel__body">
        <h1 className="novel__title">{title}</h1>
        <p className="novel__text">{convertLineEndCode(text)}</p>
      </div>

      <div className="article__footer" ref={footerRef}>
        {
          artist ? (
            <>
              <div className="article__writer-info">
                <WriterInfo artist={artist} icons={icons} />
              </div>

              <div className="article__other-works">
                <OtherWorks currentArticleId={'' + item.id} list={list} creatorList={creatorList} />
              </div>
            </>
          ) : null
        }
      </div>
    </div>
  )
}

export default Novel