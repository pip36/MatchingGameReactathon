import { FC } from 'react'
import { Typography } from '@mui/material'
import { CenteredContent } from '@/components/CenteredContent/CenteredContent'
import { Colors } from '@/constants/styles'
import { MainPageWrapper, RocketIcon } from './HomePage.styles'

export const HomePage: FC<{ startGame: () => void }> = ({ startGame }) => (
  <MainPageWrapper>
    <CenteredContent>
      <Typography variant="h4" fontWeight={800} color={[Colors.RichBlack]}>
        Super Matching Game
      </Typography>
      <Typography variant="subtitle1" fontWeight={600} color={Colors.Rufous}>
        Click to start...
      </Typography>

      <RocketIcon onClick={startGame} />
    </CenteredContent>
  </MainPageWrapper>
)
