function main() {

	let tictactoe = new TicTacToe()

	function finishMessageBox(message) {
		message += '\nWant to play again on this difficulty?'
		if (!confirm(message)) {
			toogleElementOfGame()
		}
	}

	function computerMove() {
		const random = Math.random()
		const is_random_move = random < probability_of_difficulty[DIFFICULTY]
		if (is_random_move) {
			tictactoe.computerMove()
		} else {
			tictactoe.computerRandomMove()
		}
	}

	function playerVsComputer() {
		tictactoe.tooglePlayer()
		let winner = tictactoe.getWinner()
		if (winner === 'tie' || winner === 'o') {
			tictactoe.tooglePlayer()
			finishMessageBox(
				winner === 'tie'
					? 'Congratulations, you tied!'
					: 'You lost!'
			)
			tictactoe.resetGame()
		} else if (winner == 'x') {
			finishMessageBox('Congratulations you won!')
			tictactoe.resetGame()
		} else {
			computerMove()
			if (tictactoe.getWinner() === 'o') {
				finishMessageBox('You lost!')
				tictactoe.resetGame()
			}
		}
	}
	function addEventImages() {
		const PLAYER = 'x'
		const COMPUTER = 'o'

		tictactoe.board.forEach(function addEventClickInImage(img) {

			img.addEventListener('click', function eventClick() {
				if (img.dataset.check === '') {
					if (tictactoe.is_player_one) {
						img.dataset.check = PLAYER
						img.src = 'asserts/x.png'
					} else {
						img.dataset.check = COMPUTER
						img.src = 'asserts/o.png'
					}
					playerVsComputer()
				}
			})
		})
	}

	addEventImages()

}

window.onload = main
