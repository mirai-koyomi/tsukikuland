import React, { FC } from 'react'

interface IWriterInfoProps {
  artist: string
}

const WriterInfo: FC<IWriterInfoProps> = ({artist}) => {
  return (
    <div className="writer-info">
      <h2 className="writer-info__title">
        Writer Infomation
      </h2>

      <div className="writer-info__contetnts">
        <div className="writer-info__icon"></div>
        <div className="writer-info__text">
          <h3 className="writer-info__name">{artist}</h3>
          <p className="writer-info__sns">
            <a href="/" className="writer-info__link" target='_blank'>Twitter</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default WriterInfo