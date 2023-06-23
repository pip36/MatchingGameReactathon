type Tile = {
  value: string
  flipped: boolean
  id: number
}

type GameState = {
  tiles: Tile[]
}

const useGameState = () => {
  const game: GameState = {
    tiles: [],
  }

  const flipCard = (id: number) => undefined

  return {
    gameState: game,
    flipCard,
  }
}
