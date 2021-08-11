let is_game = false
let current_difficulty = null
let current_game = 'PLAYER_VS'

const DIFFICULTY_PROBABILTY = {
	Easy: 0.3,
	Medium: 0.6,
	Difficult: 0.8,
	Impossible: 1
}
let tictactoe = new TicTacToe()