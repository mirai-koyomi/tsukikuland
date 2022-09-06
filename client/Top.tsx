import React, { FC } from 'react'
import mainVisual from './src/img/main-visual.png'

const Top: FC = () => {
  return (
    <>
      <div className="main-info">
        <h2 className='main-info__title'>
          <span className="main-info__title-text --first">AM6:00、</span><br />
          <span className="main-info__title-text --second">黄金の朝、</span><br />
          <span className="main-info__title-text --third">君の笑顔</span>
        </h2>

        <p className="main-info__description">
          当サイトはヘブンバーンズレッドの月城最中✕蔵里見の狂ったファンによる二次創作です。<br />
          公式や、その関係者様とは一切関係ありません。<br />
          本書の無断転載・複写・オークション出品などは固くお断りします。
        </p>
      </div>

      <figure className='main-visual'>
        <img src={mainVisual} className="main-visual__img" />
      </figure>
    </>
  )
}

export default Top