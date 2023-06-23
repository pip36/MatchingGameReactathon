import { FC } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { GamePage } from './pages/GamePage'

export const App: FC = () => (
  <ThemeProvider theme={{}}>
    <CssBaseline />
    <GamePage />
  </ThemeProvider>
)
