import React, { FC } from 'react'

interface IIconProps {
  creator: IJsonCreator
  icon: string
}

const Icon: FC<IIconProps> = ({creator, icon}) => {
  return (
    <div className="icon">
      <img src={icon} alt={creator.name} />
    </div>
  )
}

export default Icon