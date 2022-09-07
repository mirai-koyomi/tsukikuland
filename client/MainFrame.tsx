import React, { FC } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'
import GalleryList from './component/galleryList'
import data from './src/json/data.json'
import creatorList from './src/json/Creator.json'
import img1 from './src/img/1/thumb.png'
import img2 from './src/img/2/thumb.png'
import img3 from './src/img/3/thumb.png'
import img4 from './src/img/4/thumb.png'
import img5 from './src/img/5/thumb.jpg'
import img6 from './src/img/6/thumb.png'
import img7 from './src/img/7/thumb.png'
import img8 from './src/img/8/thumb.png'
import img9 from './src/img/9/thumb.jpg'
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
import work8img1 from './src/img/8/01.png'
import icon from './src/img/icon/c02UkKn1_400x400.jpg'
import icon1 from './src/img/icon/01.jpg'
import icon2 from './src/img/icon/02.jpg'
import icon3 from './src/img/icon/03.jpg'
import icon4 from './src/img/icon/04.jpg'
import icon5 from './src/img/icon/05.jpg'
import icon6 from './src/img/icon/06.jpg'
import icon7 from './src/img/icon/07.jpg'
import icon8 from './src/img/icon/08.png'
import icon9 from './src/img/icon/09.jpg'
import Top from './top'
import { useTransition } from 'react-spring'
import Article from './component/Article'
import BasicSection from './section/BasicSection'
import ArtSection from './section/ArtSection'
import OtherSection from './section/OtherSection'
import Member from './component/Member'
import { useMedia } from 'react-use'
import SPMainFrame from './sp/MainFrame'

const icons = {
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  5: icon5,
  6: icon6,
  7: icon7,
  8: icon8,
  9: icon9,
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
    pages: [work8img1]
  },
  9: {
    thumb: img9,
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
  const isPC = useMedia('(min-width: 960px)')

  return (
    isPC ? (
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
    ) : (
      <SPMainFrame works={data as IJsonData[]} imgs={imgs} icons={icons} creators={creatorList} />
    )
  )
}

export default MainFrame