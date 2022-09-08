import { shuffle } from './../Util'
import React, { FC, useMemo } from 'react'
import MemberItem from './MemberItem'

interface IMemberProps {
  members: IJsonCreator[]
  icons: {[key in string]: string}
}

const Member: FC<IMemberProps> = ({members, icons}) => {
  const shuffleMembers = useMemo<IJsonCreator[]>(() => shuffle(members), [members])
  return (
    <div className="member">
      <div className="member__wrap">
        <h2 className="member__title">Member</h2>
        <ul className="member__list">
          {
            shuffleMembers.map((member) => {
              return <MemberItem member={member} icon={icons[member.id]} />
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Member