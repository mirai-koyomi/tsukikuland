import { convertLineEndCode } from './../../Util'
import React, { FC } from 'react'
import Icon from './Icon'

interface IWriterInfoProps {
  creator: IJsonCreator,
  icons: {[key in string]: string}
}

const WriterInfo: FC<IWriterInfoProps> = ({creator, icons}) => {
  return (
    <div className="writer-info">
      <h2 className="writer-info__title section__title">
        Author Infomation
      </h2>

      <div className="writer-info__contents">
        <div className="writer-info__icon">
          <Icon creator={creator} icon={icons[creator.id]} />
        </div>
        <div className="writer-info__text section__text">
          <h3 className="writer-info__name">{creator.name}</h3>
          <p className="writer-info__bio">{convertLineEndCode(creator.bio)}</p>
          <ul className="writer-info__sns">
            {
              creator.twitter?.length ? (
                <li className="writer-info__sns-item">
                  <a href={`https://twitter.com/${creator.twitter}`} className="writer-info__link" target={'_blank'}>Twitter</a>
                </li>
              ) : null
            }
            {
              creator.pixiv?.length ? (
                <li className="writer-info__sns-item">
                  <a href={`https://www.pixiv.net/users/${creator.pixiv}`} className="writer-info__link" target={'_blank'}>Pixiv</a>
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