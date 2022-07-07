import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainFrame from './MainFrame'

const App: FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MainFrame />
    </BrowserRouter>
  )
}

export default App
