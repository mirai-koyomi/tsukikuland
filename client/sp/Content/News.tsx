import React, { FC } from "react"

interface INewsProps {}

const News: FC<INewsProps> = () => {
  return (
    <div className="news">
      <h2 className="news__title section__title">News</h2>
      <ul className="news__list">
        <li className="news__item">
          <time dateTime="2022-9-6">2022-09-09</time> - サイトオープン
        </li>
      </ul>
    </div>
  )
}

export default News
