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

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}