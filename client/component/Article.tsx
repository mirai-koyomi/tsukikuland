import React, { FC, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Comic from './comic'
import Novel from './Novel'

interface IArticleProps {
  list: IJsonData[],
  creatorList: IJsonCreator[]
  imgs: {
    [key in string]: {
      thumb: string,
      pages: string[]
    }
  }
  icons: {[key in string]: string}
}

const Article: FC<IArticleProps> = ({list, creatorList, icons, imgs}) => {
  const {article_id} = useParams<{article_id: string}>()
  const item = useMemo(() => list.find(item => '' + item.id === article_id), [article_id])

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [article_id])

  if (item && article_id) {
    if (item.type === 'novel') {
      return <Novel list={list} creatorList={creatorList} icons={icons} item={item} />
    } else if (item.type === 'comic') {
      return <Comic list={list} creatorList={creatorList} icons={icons} item={item} pages={imgs[item.id].pages} />
    } else {
      return (
        <div>
          存在しない記事です。
        </div>
      )
    }
  } else {
    return (
      <div>
        存在しない記事です。
      </div>
    )
  }
}

export default Article