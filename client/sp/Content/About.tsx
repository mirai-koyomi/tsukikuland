import React, { FC } from "react"
import { Link } from "react-router-dom"
import News from "./News"

interface IAboutProps {}

const About: FC<IAboutProps> = () => {
  return (
    <div className="about">
      <h2 className="about__title section__title">About</h2>
      <h3 className="about__sub-title">月城最中✕蔵里見 日常合同</h3>
      <p className="about__text section__text">
        当サイトはヘブンバーンズレッドの月城最中✕蔵里見の狂ったファンによる二次創作掲載ページです。<br />
        公式や、その関係者様とは一切関係ありません。<br />
        また本書の無断転載・複写・オークション出品などは固くお断りします。<br />
        <Link className='about__link' to={'/gallery'}>&gt; 作品一覧ページへ</Link>
      </p>

      <div className="about__news">
        <News />
      </div>
    </div>
  )
}

export default About