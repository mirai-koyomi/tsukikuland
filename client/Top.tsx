import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import mainVisual from './src/img/main-visual.png'

const Top: FC = () => {
  return (
    <div className='main'>
      <div className="main-info">
        <h2 className='main-info__title'>
          <span className="main-info__title-text --first">AM6:00、</span><br />
          <span className="main-info__title-text --second">黄金の朝、</span><br />
          <span className="main-info__title-text --third">君の笑顔</span>
        </h2>

        <div className="main-info__description">
          <div className="main-info__description-wrap">
            <h3 className="main-info__description-title">月城最中✕蔵里見 日常合同</h3>
            <p className="main-info__description-text">
              当サイトはヘブンバーンズレッドの月城最中✕蔵里見の狂ったファンによる二次創作掲載ページです。<br />
              公式や、その関係者様とは一切関係ありません。<br />
              また本書の無断転載・複写・オークション出品などは固くお断りします。<br />
              <Link className='main-info__description-link' to={'/gallery'}>&gt; 作品一覧ページへ</Link>
            </p>

            <div className="main-info__news">
              <h3 className="main-info__description-title">News</h3>
              <ul className="main-info__news-list">
                <li className="main-info__news-item">
                  <time dateTime="2022-9-6">2022-09-09</time> - サイトオープン
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <figure className='main-visual'>
        <div className="main-visual__img" style={{backgroundImage: `url(${mainVisual})`}} />
      </figure>
    </div>
  )
}

export default Top