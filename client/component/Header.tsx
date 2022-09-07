import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IHeaderProps {
  isShow?: boolean
}

const Header: FC<IHeaderProps> = ({isShow = true}) => {
  return (
    <header className={`header${isShow ? '' : ' --hide'}`}>
      <h1 className="header-title">
        <Link to={'/'} className="header-title__link">
          月蔵食堂
        </Link>
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
      </ul>
    </header>
  )
}

export default Header