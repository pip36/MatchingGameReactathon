import { FC } from 'react'
import { Typography, Grid, Paper, Stack, Button } from '@mui/material'
import { CenteredContent } from '@/components/CenteredContent/CenteredContent'
import { MainPageWrapper } from './GamePage.styles'
import { useGameState } from '@/util/GameState'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import toast, { Toaster } from 'react-hot-toast'

export const Game: FC<{ startGame: () => void }> = ({ startGame }) => {
  const { gameState, flipCard, listen } = useGameState()

  const listener = listen()

  listener.onMatch(() => {
    toast('AWESOME!', { duration: 1000, position: 'bottom-center' })
  })

  const grid = gameState.tiles.map((tile) => {
    return (
      <Grid item md={3} key={tile.id} onClick={() => flipCard(tile.id)}>
        <Paper
          variant="outlined"
          component={Stack}
          direction="column"
          justifyContent="center"
          style={{
            height: '200px',
            textAlign: 'center',
            border: 'solid',
            borderColor: '#f9db03',
            overflow: 'hidden',
            borderRadius: '1em',
            backgroundColor: '#1F85DE',
            verticalAlign: 'middle',
            cursor: 'pointer',
          }}
        >
          <Typography variant="h3">{tile.flipped ? tile.value : ''}</Typography>
        </Paper>
      </Grid>
    )
  })

  const { width, height } = useWindowSize()
  if (gameState.isFinished) {
    return (
      <>
        <Confetti width={width} height={height}></Confetti>
        <Button onClick={startGame}>Play Again?</Button>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <Grid style={{ width: '40%' }} container spacing={1}>
        {grid}
      </Grid>
    </>
  )
}

export const GamePage: FC<{ startGame: () => void }> = ({ startGame }) => (
  <MainPageWrapper>
    <CenteredContent>
      <Game startGame={startGame}></Game>
    </CenteredContent>
  </MainPageWrapper>
)
