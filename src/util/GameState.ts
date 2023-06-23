import { useReducer, useRef } from 'react'

type Tile = {
  value: string
  flipped: boolean
  id: number
}

type GameState = {
  tiles: Tile[]
  firstTile?: Tile
  secondTile?: Tile
  isFinished: boolean
}

type Action<Name, T> = {
  type: Name
  payload: T
}

type FlipCard = {
  id: number
}

type Actions =
  | Action<'FlipCard', FlipCard>
  | Action<'PairDoesNotMatch', undefined>
  | Action<'PairMatches', undefined>

const handleFlipCard = (
  state: GameState,
  { id }: Action<'FlipCard', FlipCard>['payload']
): GameState => {
  const tile = state.tiles.find((x) => x.id == id)

  if (!tile) throw new Error(`Card with id: ${id} does not exist.`)

  if (tile.flipped || (state.firstTile && state.secondTile)) {
    return state
  }

  if (!tile.flipped) {
    tile.flipped = true
    if (!state.firstTile) {
      state.firstTile = tile
    } else {
      state.secondTile = tile
    }
  }

  return { ...state }
}

const handlePairDoesNotMatch = (
  state: GameState,
  _: Action<'PairDoesNotMatch', undefined>['payload']
): GameState => {
  const updatedTiles = state.tiles.map((tile) =>
    tile.id === state.firstTile?.id || tile.id === state.secondTile?.id
      ? { ...tile, flipped: false }
      : tile
  )
  return { ...state, tiles: updatedTiles, firstTile: undefined, secondTile: undefined }
}

const handlePairMatches = (
  state: GameState,
  _: Action<'PairMatches', undefined>['payload']
) => {
  return {
    ...state,
    firstTile: undefined,
    secondTile: undefined,
    isFinished: state.tiles.every((x) => x.flipped),
  }
}

const reducer = (state: GameState, action: Actions) => {
  switch (action.type) {
    case 'FlipCard':
      return handleFlipCard(state, action.payload)
    case 'PairDoesNotMatch':
      return handlePairDoesNotMatch(state, action.payload)
    case 'PairMatches':
      return handlePairMatches(state, action.payload)
    default:
      return state
  }
}

const initialState = (): GameState => ({
  isFinished: false,
  tiles: [
    { id: 0, flipped: false, value: '🐱' },
    { id: 1, flipped: false, value: '🐱' },
    { id: 2, flipped: false, value: '🤢' },
    { id: 3, flipped: false, value: '🤢' },
    { id: 4, flipped: false, value: '🐱‍🐉' },
    { id: 5, flipped: false, value: '🐱‍🐉' },
    { id: 6, flipped: false, value: '👌' },
    { id: 7, flipped: false, value: '👌' },
    { id: 8, flipped: false, value: '👀' },
    { id: 9, flipped: false, value: '👀' },
    { id: 10, flipped: false, value: '❌' },
    { id: 11, flipped: false, value: '❌' },
    { id: 12, flipped: false, value: '✔' },
    { id: 13, flipped: false, value: '✔' },
    { id: 14, flipped: false, value: '🐱‍👓' },
    { id: 15, flipped: false, value: '🐱‍👓' },
  ].sort(() => Math.random() - 0.5),
})

export const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState())
  const checkInProgress = useRef(false)

  const tileOne = state.firstTile
  const tileTwo = state.secondTile

  if (tileOne && tileTwo && !checkInProgress.current) {
    checkInProgress.current = true
    const isMatch = tileOne.value === tileTwo.value

    if (isMatch) {
      dispatch({ type: 'PairMatches', payload: undefined })
      checkInProgress.current = false
    } else {
      setTimeout(() => {
        dispatch({ type: 'PairDoesNotMatch', payload: undefined })
        checkInProgress.current = false
      }, 1000)
    }
  }

  return {
    gameState: state,
    flipCard: (id: number) => dispatch({ type: 'FlipCard', payload: { id } }),
  }
}
