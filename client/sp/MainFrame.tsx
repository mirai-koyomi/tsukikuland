import React, { FC, useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Article from './Content/Article'
import Gallery from './Content/Gallery'
import Member from './Content/Member'
import Top from './Content/Top'
import ArtContext from './Context/ArtContext'
import Header from './Layout/Header'
import Section from './Layout/Section'

interface ISPMainFrameProps {
  works: IJsonData[]
  creators: IJsonCreator[]
  imgs: {
    [key in string]: {
      thumb: string,
      pages: string[]
    }
  }
  icons: {[key in string]: string}
}

const SPMainFrame: FC<ISPMainFrameProps> = ({works, creators, imgs, icons}) => {
  const [show, setShow] = useState(true)

  const viewSwitch = useCallback((bool: boolean) => {
    setShow(bool)
  }, [setShow])

  return (
    <div className="sp-wrap">
      <ArtContext.Provider value={{headerViewSwitch: viewSwitch}}>
        <Header isShow={show} />

        <Routes>
          <Route element={<Section />} >
            <Route index element={<Top />} />
            <Route path='/gallery'>
              <Route index element={<Gallery works={works} creators={creators} imgs={imgs} />} />
              <Route path=":article_id" element={<Article works={works} creators={creators} imgs={imgs} icons={icons} />} />
            </Route>
            <Route path='/member' element={<Member members={creators} icons={icons} />} />
          </Route>
        </Routes>
      </ArtContext.Provider>
    </div>
  )
}

export default SPMainFrame