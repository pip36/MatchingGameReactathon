import { FC } from 'react'
import { Typography, Grid, Paper, Stack, Button } from '@mui/material'
import { CenteredContent } from '@/components/CenteredContent/CenteredContent'
import { MainPageWrapper } from './GamePage.styles'
import { useGameState } from '@/util/GameState'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import toast, { Toaster } from 'react-hot-toast'

export const Game: FC<{ startGame: () => void }> = ({ startGame }) => {
  const paperStyle = {
    height: '200px',
    width: '100px',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: '#1F85DE',
    verticalAlign: 'middle',
    padding: '10px 15px',
    cursor: 'pointer',
  }

  const { gameState, flipCard, listen } = useGameState()

  const listener = listen()

  listener.onMatch(() => {
    toast('AWESOME!', { duration: 1000, position: 'bottom-center' })
  })

  const grid = gameState.tiles.map((tile) => {
    return (
      <Grid item md={3} key={tile.id} onClick={() => flipCard(tile.id)}>
        <Paper
          component={Stack}
          direction="column"
          justifyContent="center"
          style={paperStyle}
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
        <Confetti width={width} height={height}>
          <Grid style={{ width: '40%' }} container spacing={2}>
            {grid}
          </Grid>
        </Confetti>
        <Button style={{ zIndex: '10000' }} onClick={startGame}>
          Play Again?
        </Button>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <Grid style={{ width: '40%' }} container spacing={2}>
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
