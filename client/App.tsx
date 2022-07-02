import React, { FC, useLayoutEffect, useRef } from 'react'
import mainVisual from './src/img/bg.jpg'
import { BrowserRouter } from 'react-router-dom'
import GalleryList from './component/galleryList'

const App: FC = () => {
  const contentEl = useRef<HTMLDivElement>(null)
  const galleryList: {
    title: string
    artist: string
    synopsis: string
    thumbnail?: string
  }[] = [
    {
      title: '作品名0',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名1',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名2',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名3',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名4',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名5',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名6',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
    {
      title: '作品名7',
      artist: 'mirai_koyomi',
      synopsis: 'ごにょごにょーん',
    },
  ]
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
          <GalleryList list={galleryList} />
        </section>
      </div>


    </div>
  )
}

export default App
