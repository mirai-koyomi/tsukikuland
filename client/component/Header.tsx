import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
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
  )
}

export default Header