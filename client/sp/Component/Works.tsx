import { convertLineEndCode } from "./../../Util"
import React, { FC, useState } from "react"

interface IWorksProps {
  work: IJsonData
  creator: IJsonCreator
  imgs: {[key in string]: {
    pages?: string[],
    thumb: string
  }}
}

const Works: FC<IWorksProps> = ({work, creator, imgs}) => {
  return (
    <div className={`works`} style={{backgroundImage: `url(${imgs[work.id].thumb})`}}>
      <div className="works__wrap">
        <div className="works__layer">
          <h1 className="works__title">
            {convertLineEndCode(work.title)}
          </h1>

          <p className="works__text">
            {convertLineEndCode(work.synopsis)}
          </p>

          <p className="works__artist">
            {
              `Author by ${creator.name}`
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Works