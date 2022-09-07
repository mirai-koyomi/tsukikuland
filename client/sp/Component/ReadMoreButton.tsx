import React, { FC } from "react"
import { Link } from "react-router-dom"

interface IReadMoreButtonProps {
  to: string
}

const ReadMoreButton: FC<IReadMoreButtonProps> = ({to}) => {
  return (
    <Link className="read-more-button" to={to}>
      <p className="read-more-button__text">
        <span className="read-more-button__small">この作品を</span><br />
        <span className="read-more-button__large">読む</span>
      </p>
    </Link>
  )
}

export default ReadMoreButton