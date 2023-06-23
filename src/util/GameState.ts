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

const handleFlipCard = (
  state: GameState,
  { id }: Action<FlipCard>['payload']
): GameState => {
  return state
}

const reducer = (state: GameState, action: Actions) => {
  switch (action.type) {
    case 'FlipCard':
      return handleFlipCard(state, action.payload)
    default:
      return state
  }
}

const totalTiles = 16

const initialState: GameState = {
  tiles: new Array(totalTiles)
    .fill(0)
    .map((_, i) => ({ id: i, flipped: false, value: '🐱' })),
}

export const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const flipCard = (id: number) => dispatch({ type: 'FlipCard', payload: { id } })

  return {
    gameState: state,
    flipCard,
  }
}
