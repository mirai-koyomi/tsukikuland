import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainFrame from './MainFrame'

const baseUrl = '/'

const App: FC = () => {
  return (
    <BrowserRouter basename={baseUrl}>
      <MainFrame />
    </BrowserRouter>
  )
}

export default App
