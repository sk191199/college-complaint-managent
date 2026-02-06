import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import "./App.css"
import theme from './theme/theme'
import AppRoutes from './components/Routes/AppRoutes'



const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes/>
    </ThemeProvider>
  )
}

export default App
