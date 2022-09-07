import Header from './../component/Header'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const OtherSection: FC = () => {
  return (
    <div className="other-page">
      <Header />

      <div className="other-page__content">
        <section className="other-page__section">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default OtherSection
