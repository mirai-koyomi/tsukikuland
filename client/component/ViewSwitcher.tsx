import React, { FC } from 'react'
import { useCookies } from 'react-cookie'
import { faBars, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ViewSwitcher: FC = () => {
  const [cookie, setCookie] = useCookies(['lineViewMode'])

  return (
    <ul className="view-switcher">
      <li
        className={`view-switcher__btn${cookie['lineViewMode'] === '0' || !cookie['lineViewMode'] ? ' --active' : ''}`}
        onClick={() => {
          if (cookie['lineViewMode'] === '1') {
            setCookie('lineViewMode', '0')
          }
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </li>
      <li
        className={`view-switcher__btn${cookie['lineViewMode'] === '1' ? ' --active' : ''}`}
        onClick={() => {
          if (!cookie['lineViewMode'] || cookie['lineViewMode'] === '0') {
            setCookie('lineViewMode', '1')
          }
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </li>
    </ul>
  )
}

export default ViewSwitcher