import ArtContext from './../Context/ArtContext'
import React, { FC, useContext, useEffect, useState } from 'react'
import ComicViewer from 'react-comic-viewer'
import WorkFooter from './WorkFooter'

interface IComicProps {
  works: IJsonData[]
  work: IJsonDataComic
  pages: string[]
  icons: {[key in string]: string}
  creators: IJsonCreator[]
}

const Comic: FC<IComicProps> = ({works, work, pages, icons, creators}) => {
  const {headerViewSwitch} = useContext(ArtContext)
  const [isShowHeader, setIsShowHeader] = useState(true)
  const creator = creators.find(creator => creator.id === work.creator_id)

  useEffect(() => {
    headerViewSwitch(isShowHeader)
  }, [isShowHeader])

  return (
    <div className={`comic${isShowHeader ? '' : ' --hide'}`}>
      <ComicViewer
        direction='rtl'
        pages={pages}
        initialIsExpansion={false}
        onChangeExpansion={(isExpantion) => setIsShowHeader(!isExpantion)}
        text={{
          expansion: '拡大',
          fullScreen: '全画面表示',
          move: '移動',
          normal: '通常表示'
        }}
      />

      {
        creator ? (
          <WorkFooter currentArticleId={work.id} creator={creator} icons={icons} works={works} creators={creators} />
        ) : null
      }
    </div>
  )
}

export default Comic