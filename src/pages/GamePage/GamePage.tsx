import { FC } from 'react'
import { Typography } from '@mui/material'
import { CenteredContent } from '@/components/CenteredContent/CenteredContent'
import { Colors } from '@/constants/styles'
import { MainPageWrapper } from './GamePage.styles'

export const Game: FC = () => {
  const { gameState, flipCard } = useGameState()

  return <div></div>
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
