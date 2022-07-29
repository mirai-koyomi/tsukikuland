import React, { FC } from 'react'
import mainVisual from './src/img/bg.jpg'

const Top: FC = () => {
  return (
    <>
      <div className="main-info">
        <h2 className='main-info__title'>
          いつか稲穂の<br />
          波打ち際で
        </h2>
        <p className="main-info__description">
          当サイトはヘブンバーンズレッドの月城最中×蔵里見の作品をうんたらかんたらなんたらそんたら。
        </p>
      </div>

      <figure className='main-visual'>
        <img src={mainVisual} className="main-visual__img" />
      </figure>
    </>
  )
}

export default Top