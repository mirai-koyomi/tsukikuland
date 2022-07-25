import React, { FC } from 'react'

import { Link, Route, Switch, useLocation } from 'react-router-dom'
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
import Top from './top'
import { useTransition } from 'react-spring'

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

const MainFrame: FC = () => {
  const location = useLocation()
  const transitions = useTransition(location, {
    from: {opcity: 0, y: '60%'},
    enter: {opcity: 1, y: '0%'},
    leave: {opcity: 0, y: '60%'},
    config: {duration: 250},
  })

  const baseUrl = ''

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
            <Link to={`/`} className="header-menu__link">About</Link>
          </li>
          <li className="header-menu__item">
            <Link to={`/gallery`} className="header-menu__link">Gallery</Link>
          </li>
          <li className="header-menu__item">
            <Link to={`/member`} className="header-menu__link">Member</Link>
          </li>
        </ul>
      </header>

      <div className="top-page__content">
        <Switch>
          <Route exact path={'/'} component={Top} />
          <Route path={'/gallery'} render={() => {
            return (
              <section className="top-page__section">
                <GalleryList list={data} imgs={imgs} />
              </section>
            )
          }} />
        </Switch>

      </div>
    </div>
  )
}

export default MainFrame