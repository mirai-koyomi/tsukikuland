import React, { FC } from 'react'
import OtherWorks from './OtherWorks'
import WriterInfo from './WriterInfo'

interface IWorkFooterProps {
  currentArticleId: number
  creator: IJsonCreator
  icons: {[key in string]: string}
  works: IJsonData[]
  creators: IJsonCreator[]
  _ref?: React.RefObject<HTMLDivElement>
}

const WorkFooter: FC<IWorkFooterProps> = ({currentArticleId, creator, icons, works, creators, _ref}) => {
  return (
    <div className="work-footer" ref={_ref}>
      <div className="work-footer__writer-info">
        <WriterInfo creator={creator} icons={icons} />
      </div>

      <div className="work-footer__other-works">
        <OtherWorks currentArticleId={'' + currentArticleId} works={works} creators={creators} />
      </div>
    </div>
  )
}

export default WorkFooter
