import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import NavMenu from '../Component/NavMenu'
import ToggleButton from '../Component/ToggleButton'

interface IHeaderProps {
  isShow?: boolean
}

const Header: FC<IHeaderProps> = ({isShow = true}) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className={`header${showMenu ? ' --show' : ''}${isShow || showMenu ? ' --visible' : ''}`}>
      <div className="header__wrap">
        <h1 className="header__title">
          <Link className='header__link' to='/'>
            月蔵食堂
          </Link>
        </h1>
        <p className="header__description">月蔵Web合同特設ページ</p>
        <div className="header__button">
          <ToggleButton isOn={showMenu} onToggle={(bool) => setShowMenu(bool)}/>
        </div>
      </div>

      <div className={`header__menu`}>
        <NavMenu onClick={() => setShowMenu(false)} />
      </div>
    </header>
  )
}

export default Header