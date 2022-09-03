import React, { FC } from 'react'

interface IIconProps {
  artist: IJsonCreator
  icon: string
}

const Icon: FC<IIconProps> = ({artist, icon}) => {
  return (
    <div className="icon">
      <img src={icon} alt={artist.name} />
    </div>
  )
}

export default Icon