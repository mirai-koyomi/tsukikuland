import Header from './../component/Header'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const BasicSection: FC = () => {
  return (
    <div className="top-page pc-page">
      <Header />

      <div className="top-page__content">
        <section className="top-page__section">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default BasicSection