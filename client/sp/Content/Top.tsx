import React, { FC } from "react"
import mainVisual from '../../src/img/main-visual.png'
import About from "./About"

interface ITopProps {}

const Top: FC<ITopProps> = () => {
  return (
    <>
      <div className="top" style={{backgroundImage: `url(${mainVisual})`}}>
        <h2 className="top__title">
          <span className="top__text --first">AM6:00、</span>
          <span className="top__text --second">黄金の朝、</span>
          <span className="top__text --third">君の笑顔</span>
        </h2>
      </div>

      <About />
    </>
  )
}

export default Top