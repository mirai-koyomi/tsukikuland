import React, { FC, useLayoutEffect, useRef } from 'react'
import mainVisual from './src/img/bg.jpg'
import { BrowserRouter } from 'react-router-dom'
import GalleryList from './component/galleryList'
import data from './src/json/data.json'
import img1 from './src/img/free-stock-photos-public-domain-images-013-1000x667.jpg'
import img2 from './src/img/free-stock-photos-public-domain-images-002-1000x667.jpg'
import img3 from './src/img/public-domain-images-free-stock-photos-apple-iphone-iphone-6.jpg'
import img4 from './src/img/StockSnap_SEZMWXVOIS.jpg'
import img5 from './src/img/StockSnap_R70UYUOOZG.jpg'
import img6 from './src/img/StockSnap_LGBWHXHMEQ.jpg'
import img7 from './src/img/StockSnap_AX04KXNOBI.jpg'
import img8 from './src/img/public-domain-images-free-stock-photos-001-1080x720.jpg'

const imgs = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
}

const App: FC = () => {
  const contentEl = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    contentEl?.current?.scrollIntoView()
  })
  return (
    <div className="top-page">
      <header className="header">
        <h1 className="header-title">
          TsukikuLand
        </h1>

        <div className="header-description">
          <span className="header-description__text">
            月蔵Web合同特設ページ
          </span>
        </div>

        <ul className="header-menu">
          <li className="header-menu__item">
            <a href="/about" className="header-menu__link">About</a>
          </li>
          <li className="header-menu__item">
            <a href="/gallery" className="header-menu__link">Gallery</a>
          </li>
          <li className="header-menu__item">
            <a href="/member" className="header-menu__link">Member</a>
          </li>
        </ul>
      </header>

      <div className="top-page__content">
        <section className="top-page__section">
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
        </section>

        <section ref={contentEl} className="top-page__section">
          <GalleryList list={data} imgs={imgs} />
        </section>
      </div>


    </div>
  )
}

export default App
