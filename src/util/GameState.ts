import { useReducer } from 'react'

type Tile = {
  value: string
  flipped: boolean
  id: number
}

type GameState = {
  tiles: Tile[]
}

type Action<T> = {
  type: 'FlipCard'
  payload: T
}

type FlipCard = {
  id: number
}

type Actions = Action<FlipCard>

const reducer = (state: GameState, action: Actions) => {
  switch (action.type) {
    case 'FlipCard':
      return state
    default:
      return state
  }
}

export const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, {
    tiles: [],
  })

  const flipCard = (id: number) => dispatch({ type: 'FlipCard', payload: { id } })

  return {
    gameState: state,
    flipCard,
  }
}
