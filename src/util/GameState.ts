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
  const tile = state.tiles.find((x) => x.id == id)

  if (!tile) throw new Error(`Card with id: ${id} does not exist.`)

  if (tile.flipped) {
    return state
  }

  if (!tile.flipped) {
    tile.flipped = true
  }

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

const initialState = (): GameState => ({
  tiles: [
    { id: 0, flipped: false, value: '🐱' },
    { id: 0, flipped: false, value: '🐱' },
    { id: 0, flipped: false, value: '🤢' },
    { id: 0, flipped: false, value: '🤢' },
    { id: 0, flipped: false, value: '🐱‍🐉' },
    { id: 0, flipped: false, value: '🐱‍🐉' },
    { id: 0, flipped: false, value: '👌' },
    { id: 0, flipped: false, value: '👌' },
    { id: 0, flipped: false, value: '👀' },
    { id: 0, flipped: false, value: '👀' },
    { id: 0, flipped: false, value: '❌' },
    { id: 0, flipped: false, value: '❌' },
    { id: 0, flipped: false, value: '✔' },
    { id: 0, flipped: false, value: '✔' },
    { id: 0, flipped: false, value: '🐱‍👓' },
    { id: 0, flipped: false, value: '🐱‍👓' },
  ].sort(() => Math.random() - 0.5),
})

export const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState())

  const flipCard = (id: number) => dispatch({ type: 'FlipCard', payload: { id } })

  return {
    gameState: state,
    flipCard,
  }
}
