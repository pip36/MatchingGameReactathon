import { FC } from 'react'
import { Typography, Grid, Paper, Stack } from '@mui/material'
import { CenteredContent } from '@/components/CenteredContent/CenteredContent'
import { Colors } from '@/constants/styles'
import { MainPageWrapper } from './GamePage.styles'
import { useGameState } from '@/util/GameState'

export const Game: FC = () => {
  const paperStyle = {
    height: '100px',
    width: '50px',
    overflow: 'hidden',
    borderRadius: '4px',
    color: 'blue',
    verticalAlign: 'middle',
    padding: '10px 15px',
  }

  const { gameState, flipCard } = useGameState()

  const grid = gameState.tiles.map((tile) => {
    return (
      <Grid item md={3} key={tile.id}>
        <Paper
          component={Stack}
          direction="column"
          justifyContent="center"
          style={paperStyle}
        >
          {tile.value}
        </Paper>
      </Grid>
    )
  })

  return (
    <Grid container spacing={2}>
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
