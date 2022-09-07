import { convertLineEndCode } from './../Util'
import React, { FC } from 'react'

interface IStaticViewProps {
  item: IJsonDataNovel
}

const StaticView: FC<IStaticViewProps> = ({item}) => {
  const {title, text} = item

  return (
    <div className="static-view">
      <h1 className="static-view__title">{title}</h1>
      <p className="static-view__text">{convertLineEndCode(text)}</p>
    </div>
  )
}

export default StaticView