import React, { FC } from 'react'

import { Link, Route, Routes, useLocation } from 'react-router-dom'
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
import Article from './component/Article'
import BasicSection from './section/BasicSection'
import ArtSection from './section/ArtSection'

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
    <Routes>
      <Route element={<BasicSection />} >
        <Route index element={<Top />} />
        <Route path={'/gallery'}>
          <Route index element={<GalleryList list={data} imgs={imgs} />} />
        </Route>
      </Route>

      <Route element={<ArtSection />} >
        <Route path={'/gallery'}>
          <Route path=":article_id" element={<Article list={data} />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainFrame