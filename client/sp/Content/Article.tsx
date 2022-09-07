import React, { FC, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import Comic from "../Component/Comic"
import Novel from "../Component/Novel"

interface IArticleProps {
  works: IJsonData[]
  creators: IJsonCreator[]
  imgs: {
    [key in string]: {
      thumb: string,
      pages: string[]
    }
  }
  icons: {[key in string]: string}
}

const Article: FC<IArticleProps> = ({works, creators, imgs, icons}) => {
  const {article_id} = useParams<{article_id: string}>()
  const work = useMemo(() => works.find(item => '' + item.id === article_id), [article_id])

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [article_id])

  if (work && article_id) {
    if (work.type === 'novel') {
      return <Novel works={works} creators={creators} icons={icons} work={work} />
    } else if (work.type === 'comic') {
      return <Comic works={works} creators={creators} icons={icons} work={work} pages={imgs[work.id].pages} />
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