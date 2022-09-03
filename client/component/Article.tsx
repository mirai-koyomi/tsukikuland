import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Novel from './Novel'

interface IArticleProps {
  list: IJsonData[],
  creatorList: IJsonCreator[]
  icons: {[key in string]: string}
}

const Article: FC<IArticleProps> = ({list, creatorList, icons}) => {
  const {article_id} = useParams<{article_id: string}>()
  const item = useMemo(() => list.find(item => '' + item.id === article_id), [article_id])

  if (item && article_id) {
    if (item.type === 'novel') {
      return <Novel list={list} creatorList={creatorList} icons={icons} item={item} />
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