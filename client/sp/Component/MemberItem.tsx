import React, { FC } from 'react'
import Icon from './Icon'

interface IMemberItemProps {
  member: IJsonCreator
  icon: string
}

const MemberItem: FC<IMemberItemProps> = ({member, icon}) => {
  return (
    <li className='member-item'>
      <div className="member-item__icon">
        <Icon creator={member} icon={icon} />
      </div>
      <p className="member-item__name">{member.name}</p>
    </li>
  )
}

export default MemberItem