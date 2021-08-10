function main() {

	let tictactoe = new TicTacToe()

	const btn_continue_game = document.querySelector('button[data-btn-p1]')
	const btn_back_menu = document.querySelector('button[data-btn-p2]')
	const popup_modal = document.querySelector('.modal')
	const popup_close_btn = document.querySelector('.close-modal')

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

			img.addEventListener('click', function eventClickBoard() {
				if (img.dataset.check === '') {
					if (tictactoe.is_player_one) {
						img.dataset.check = PLAYER
						img.src = 'asserts/x.png'
					} else {
						img.dataset.check = COMPUTER
						img.src = 'asserts/o.png'
					}
					CALLBACK_TYPE_GAME[current_game]()
				}
			})
		})
	}

	popup_close_btn.addEventListener('click', () => {
		popup_modal.style.display = 'none'
		tictactoe.resetGame()
	})
	btn_continue_game.addEventListener('click', () => {
		popup_modal.style.display = 'none'
		tictactoe.resetGame()
	})
	btn_back_menu.addEventListener('click', () => {
		popup_modal.style.display = 'none'
		toogleElementOfGame()
		tictactoe.resetGame()
	})

	addEventImages()

}

window.onload = main
