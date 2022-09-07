import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainFrame from './MainFrame'
import { CookiesProvider } from 'react-cookie'

const baseUrl = '/tsukikuland'

const App: FC = () => {
  return (
    <CookiesProvider>
      <BrowserRouter basename={baseUrl}>
        <MainFrame />
      </BrowserRouter>
    </CookiesProvider>
  )
}

export default App
