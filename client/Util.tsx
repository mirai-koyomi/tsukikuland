import React from 'react'

export const convertLineEndCode = (text: string): JSX.Element[] => {
  return (
    text.split(/(\n)/).map((word, idx) => {
      return (
        <React.Fragment key={idx}>
          {word.match(/\n/) ? <br /> : word}
        </React.Fragment>
      )
    })
  )
}