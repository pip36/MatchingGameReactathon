import { FC, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { GamePage } from './pages/GamePage'
import { HomePage } from './pages/HomePage'

export const App: FC = () => {
  const [page, setPage] = useState<'home' | 'game'>('home')

  return (
    <ThemeProvider theme={{}}>
      <CssBaseline />
      {page === 'home' && <HomePage startGame={() => setPage('game')} />}
      {page === 'game' && <GamePage startGame={() => setPage('home')} />}
    </ThemeProvider>
  )
}
