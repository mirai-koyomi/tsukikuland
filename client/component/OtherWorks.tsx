import React, { FC, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'

interface IOtherWorksProps {
  currentArticleId: string
  list: IJsonData[]
  creatorList: IJsonCreator[]
}

const OtherWorks: FC<IOtherWorksProps> = ({currentArticleId, list, creatorList}) => {
  const randomPick = useCallback((limit: number) => {
    const resultWorks: IJsonData[] = []

    while (resultWorks.length < limit) {
      const pickItem = list[Math.floor(Math.random() * list.length)]

      if ('' + pickItem.id !== currentArticleId && !resultWorks.find(item => item.id === pickItem.id)) {
        resultWorks.push(pickItem)
      }
    }

    return resultWorks
  }, [currentArticleId])
  const randomList = useMemo(() => randomPick(3), [currentArticleId, randomPick])

  return (
    <div className="other-works">
      <h3 className="other-works__title">Other Works</h3>
      <ul className="other-works__list">
        {
          randomList.map(item => {
            return (
              <li className="other-works__item">
                <Link to={`/gallery/${item.id}`} className="other-works__link">
                  <h4 className="other-works__work-title">{item.title}</h4>
                </Link>
                <p className="other-works__writer">Author: {creatorList.find(creator => creator.id === item.creator_id)?.name}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default OtherWorks