import { convertLineEndCode } from '../Util'
import React, { FC } from 'react'
import Icon from './Icon'

interface IWriterInfoProps {
  artist: IJsonCreator,
  icons: {[key in string]: string}
}

const WriterInfo: FC<IWriterInfoProps> = ({artist, icons}) => {
  return (
    <div className="writer-info">
      <h2 className="writer-info__title">
        Author Infomation
      </h2>

      <div className="writer-info__contents">
        <div className="writer-info__icon">
          <Icon artist={artist} icon={icons[artist.id]} />
        </div>
        <div className="writer-info__text">
          <h3 className="writer-info__name">{artist.name}</h3>
          <p className="writer-info__bio">{convertLineEndCode(artist.bio)}</p>
          <ul className="writer-info__sns">
            {
              artist.twitter?.length ? (
                <li className="writer-info__sns-item">
                  <a href={`https://twitter.com/${artist.twitter}`} className="writer-info__link" target={'_blank'}>Twitter</a>
                </li>
              ) : null
            }
            {
              artist.pixiv?.length ? (
                <li className="writer-info__sns-item">
                  <a href={`https://www.pixiv.net/users/${artist.pixiv}`} className="writer-info__link" target={'_blank'}>Pixiv</a>
                </li>
              ) : null
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WriterInfo