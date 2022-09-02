import Header from './../component/Header'
import React, { FC, useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ArtContext from '../ArtContext'

const ArtSection: FC = () => {
  const [show, setShow] = useState(true)

  const viewSwitch = useCallback((bool: boolean) => {
    setShow(bool)
  }, [setShow])

  return (
    <div className="art-page">
      <Header isShow={show} />

      <div className="art-page__content">
        <section className="art-page__section">
          <ArtContext.Provider value={{headerViewSwitch: viewSwitch}}>
            <Outlet />
          </ArtContext.Provider>
        </section>
      </div>
    </div>
  )
}

export default ArtSection