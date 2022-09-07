import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Section: FC = () => {
  return (
    <div className="section">
      <Outlet />
    </div>
  )
}

export default Section