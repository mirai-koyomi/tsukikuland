import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainFrame from './MainFrame'

const App: FC = () => {
  return (
    <BrowserRouter>
      <MainFrame />
    </BrowserRouter>
  )
}

export default App
