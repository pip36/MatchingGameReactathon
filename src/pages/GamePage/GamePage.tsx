import { FC } from 'react'
import { Typography, Grid, Paper, Stack } from '@mui/material'
import { CenteredContent } from '@/components/CenteredContent/CenteredContent'
import { Colors } from '@/constants/styles'
import { MainPageWrapper } from './GamePage.styles'
import { useGameState } from '@/util/GameState'

export const Game: FC = () => {
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

  listener.onMatch((...args) => console.log('MATCHED', args))

  if (gameState.isFinished) {
  }

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

  return (
    <Grid style={{ width: '40%' }} container spacing={2}>
      {grid}
    </Grid>
  )
}

export const GamePage: FC = () => (
  <MainPageWrapper>
    <CenteredContent>
      <Typography variant="h4" fontWeight={800} color={[Colors.RichBlack]}>
        The Game...
      </Typography>
      <Game></Game>
    </CenteredContent>
  </MainPageWrapper>
)
