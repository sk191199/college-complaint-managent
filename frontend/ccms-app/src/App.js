import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import "./App.css"
import theme from './theme/theme'
import Home from './components/Pages/Home'


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>  
        <Home/>
      </div>
    </ThemeProvider>
  )
}

export default App
