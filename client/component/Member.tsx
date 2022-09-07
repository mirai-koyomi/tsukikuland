import React, { FC } from 'react'
import MemberItem from './MemberItem'

interface IMemberProps {
  members: IJsonCreator[]
  icons: {[key in string]: string}
}

const Member: FC<IMemberProps> = ({members, icons}) => {
  return (
    <div className="member">
      <div className="member__wrap">
        <h2 className="member__title">Member</h2>
        <ul className="member__list">
          {
            members.map((member) => {
              return <MemberItem member={member} icon={icons[member.id]} />
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Member