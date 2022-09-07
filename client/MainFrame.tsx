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
import img6 from './src/img/6/thumb.png'
import img7 from './src/img/7/thumb.png'
import img8 from './src/img/public-domain-images-free-stock-photos-001-1080x720.jpg'
import work6img1 from './src/img/6/01.png'
import work6img2 from './src/img/6/02.png'
import work6img3 from './src/img/6/03.png'
import work6img4 from './src/img/6/04.png'
import work6img5 from './src/img/6/05.png'
import work6img6 from './src/img/6/06.png'
import work6img7 from './src/img/6/07.png'
import work6img8 from './src/img/6/08.png'
import work7img1 from './src/img/7/01.png'
import work7img2 from './src/img/7/02.png'
import work7img3 from './src/img/7/03.png'
import work7img4 from './src/img/7/04.png'
import icon from './src/img/icon/c02UkKn1_400x400.jpg'
import icon6 from './src/img/icon/06.jpg'
import icon7 from './src/img/icon/07.jpg'
import Top from './top'
import { useTransition } from 'react-spring'
import Article from './component/Article'
import BasicSection from './section/BasicSection'
import ArtSection from './section/ArtSection'
import OtherSection from './section/OtherSection'
import Member from './component/Member'

const icons = {
  1: icon,
  2: icon,
  3: icon,
  4: icon,
  5: icon,
  6: icon6,
  7: icon7,
}

const imgs: {
  [key in string]: {
    thumb: string,
    pages: string[]
  }
} = {
  1: {
    thumb: img1,
    pages: []
  },
  2: {
    thumb: img2,
    pages: []
  },
  3: {
    thumb: img3,
    pages: []
  },
  4: {
    thumb: img4,
    pages: []
  },
  5: {
    thumb: img5,
    pages: []
  },
  6: {
    thumb: img6,
    pages: [work6img1, work6img2, work6img3, work6img4, work6img5, work6img6, work6img7, work6img8]
  },
  7: {
    thumb: img7,
    pages: [work7img1, work7img2, work7img3, work7img4]
  },
  8: {
    thumb: img8,
    pages: []
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

      <Route element={<OtherSection />} >
        <Route path={'/member'}>
          <Route index element={<Member members={creatorList} icons={icons} />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default MainFrame