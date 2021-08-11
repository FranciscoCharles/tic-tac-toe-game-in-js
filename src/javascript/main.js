function main() {

	function computerMove() {
		const random = Math.random()
		const is_random_move = random < DIFFICULTY_PROBABILTY[current_difficulty]
		if (is_random_move) {
			tictactoe.computerMove()
		} else {
			tictactoe.computerRandomMove()
		}
	}

	function playerVsComputer() {
		tictactoe.tooglePlayer()
		let winner = tictactoe.getWinner()
		if (winner === 'tie') {
			finishMessageBox('Congratulations, you tied!')
		} else if (winner === 'o') {
			finishMessageBox('You lost!')
		} else if (winner == 'x') {
			finishMessageBox('Congratulations you won!')
		} else {
			computerMove()
			if (tictactoe.getWinner() === 'o') {
				finishMessageBox('You lost!')
			}
		}
	}

	function playerVsPlayer() {
		let winner = tictactoe.getWinner()
		if (winner === 'tie') {
			finishMessageBox('tied game!')
		} else if (winner == 'x') {
			finishMessageBox('Player 1 won!')
		} else if (winner === 'o') {
			finishMessageBox('Player 2 won!')
		} else {
			tictactoe.tooglePlayer()
		}
	}

	const CALLBACK_TYPE_GAME = {
		PLAYER_VS: playerVsPlayer,
		COMPUTER_VS: playerVsComputer
	}

	function addEventImages() {
		const PLAYER = 'x'
		const COMPUTER = 'o'

		tictactoe.board.forEach(function addEventClickInImage(img) {

			img.addEventListener('click', function markBoard() {
				if (img.dataset.check === '') {
					if (tictactoe.is_player_one) {
						img.dataset.check = PLAYER
						img.src = PATH_IMG_X
					} else {
						img.dataset.check = COMPUTER
						img.src = PATH_IMG_O
					}
					CALLBACK_TYPE_GAME[current_game]()
				}
			})
		})
	}

	addEventImages()

}

window.onload = main
