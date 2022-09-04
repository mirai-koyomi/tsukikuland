import React, { FC } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'
import GalleryList from './component/galleryList'
import data from './src/json/data.json'
import creatorList from './src/json/Creator.json'
import img1 from './src/img/free-stock-photos-public-domain-images-013-1000x667.jpg'
import img2 from './src/img/free-stock-photos-public-domain-images-002-1000x667.jpg'
import img3 from './src/img/public-domain-images-free-stock-photos-apple-iphone-iphone-6.jpg'
import img4 from './src/img/StockSnap_SEZMWXVOIS.jpg'
import img5 from './src/img/StockSnap_R70UYUOOZG.jpg'
import img6 from './src/img/StockSnap_LGBWHXHMEQ.jpg'
import img7 from './src/img/7/thumb.png'
import img8 from './src/img/public-domain-images-free-stock-photos-001-1080x720.jpg'
import work7img1 from './src/img/7/01.png';
import work7img2 from './src/img/7/02.png';
import work7img3 from './src/img/7/03.png';
import work7img4 from './src/img/7/04.png';
import icon from './src/img/icon/c02UkKn1_400x400.jpg'
import icon7 from './src/img/icon/FjSc4TI2_400x400.jpg'
import Top from './top'
import { useTransition } from 'react-spring'
import Article from './component/Article'
import BasicSection from './section/BasicSection'
import ArtSection from './section/ArtSection'

const icons = {
  1: icon,
  2: icon,
  3: icon,
  4: icon,
  5: icon,
  6: icon,
  7: icon7,
}

const imgs: {
  [key in string]: {
    thumb: string,
    pages?: string[]
  }
} = {
  1: {
    thumb: img1
  },
  2: {
    thumb: img2
  },
  3: {
    thumb: img3
  },
  4: {
    thumb: img4
  },
  5: {
    thumb: img5
  },
  6: {
    thumb: img6
  },
  7: {
    thumb: img7,
    pages: [work7img1, work7img2, work7img3, work7img4]
  },
  8: {
    thumb: img8,
  },
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
          <Route index element={<GalleryList list={data as IJsonData[]} creatorList={creatorList} imgs={imgs} />} />
        </Route>
      </Route>

      <Route element={<ArtSection />} >
        <Route path={'/gallery'}>
          <Route path=":article_id" element={<Article creatorList={creatorList} list={data as IJsonData[]} imgs={imgs} icons={icons} />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainFrame