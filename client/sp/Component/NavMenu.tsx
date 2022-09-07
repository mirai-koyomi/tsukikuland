import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface INavMenuProps {
  onClick: () => void
}

const NavMenu: FC<INavMenuProps> = ({onClick}) => {
  return (
    <ul className="nav-menu">
      <li className="nav-menu__item" onClick={onClick}>
        <Link to='/' className='nav-menu__link'>Top</Link>
      </li>
      <li className="nav-menu__item">
        <Link to='/gallery' className='nav-menu__link' onClick={onClick}>Gallery</Link>
      </li>
      <li className="nav-menu__item">
        <Link to='/member' className='nav-menu__link' onClick={onClick}>Member</Link>
      </li>
    </ul>
  )
}

export default NavMenu