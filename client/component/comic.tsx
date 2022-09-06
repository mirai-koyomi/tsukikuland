import ArtContext from '../ArtContext'
import React, { FC, useContext, useEffect, useState } from 'react'
import ComicViewer from 'react-comic-viewer'
import WriterInfo from './WriterInfo'
import OtherWorks from './OtherWorks'

interface IComicProps {
  list: IJsonData[]
  item: IJsonDataComic
  pages: string[]
  icons: {[key in string]: string}
  creatorList: IJsonCreator[]
}

const Comic: FC<IComicProps> = ({list, item, pages, icons, creatorList}) => {
  const {headerViewSwitch} = useContext(ArtContext)
  const [isShowHeader, setIsShowHeader] = useState(true)
  const artist = creatorList.find(creator => creator.id === item.creator_id)

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

      <div className="article__footer">
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

export default Comic