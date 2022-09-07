import React, { FC, useEffect, useRef } from 'react'
import OtherWorks from './OtherWorks'
import WriterInfo from './WriterInfo'

interface IWorkFooterProps {
  currentArticleId: number
  artist: IJsonCreator
  icons: {[key in string]: string}
  list: IJsonData[]
  creatorList: IJsonCreator[]
  _ref: React.RefObject<HTMLDivElement>
}

const WorkFooter: FC<IWorkFooterProps> = ({currentArticleId, artist, icons, list, creatorList, _ref}) => {
  return (
    <div className="work-footer" ref={_ref}>
      <div className="work-footer__writer-info">
        <WriterInfo artist={artist} icons={icons} />
      </div>

      <div className="work-footer__other-works">
        <OtherWorks currentArticleId={'' + currentArticleId} list={list} creatorList={creatorList} />
      </div>
    </div>
  )
}

export default WorkFooter