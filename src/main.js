function main() {

	const board = document.querySelectorAll('img')
	const text_player = document.querySelectorAll('.text-container')
	const player = 'x'
	const computer = 'o'
	let is_player_one = true

	text_player[0].style.color = 'white'

	function getWinner() {
		if (isWinner(computer)) {
			return computer
		} else if (isWinner(player)) {
			return player
		} else if (isTie()) {
			return 'tie';
		}
		return null
	}
	function isTie() {
		let tie = true
		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {
				let element = board[row * 3 + column]
				if (element.dataset.check === '') {
					tie = false
					break
				}
			}
		}
		return tie
	}
	function isWinner(player) {
		if (board[0].dataset.check === player
			&& board[1].dataset.check === player
			&& board[2].dataset.check === player) {
			return true
		}
		if (board[3].dataset.check === player
			&& board[4].dataset.check === player
			&& board[5].dataset.check === player) {
			return true
		}
		if (board[6].dataset.check === player
			&& board[7].dataset.check === player
			&& board[8].dataset.check === player) {
			return true
		}
		if (board[0].dataset.check === player
			&& board[3].dataset.check === player
			&& board[6].dataset.check === player) {
			return true
		}
		if (board[1].dataset.check === player
			&& board[4].dataset.check === player
			&& board[7].dataset.check === player) {
			return true
		}
		if (board[2].dataset.check === player
			&& board[5].dataset.check === player
			&& board[8].dataset.check === player) {
			return true
		}
		if (board[0].dataset.check === player
			&& board[4].dataset.check === player
			&& board[8].dataset.check === player) {
			return true
		}
		if (board[2].dataset.check === player
			&& board[4].dataset.check === player
			&& board[6].dataset.check === player) {
			return true
		}
		return false

	}
	function miniMax(maximize, depth = 0) {
		let winner = getWinner()

		if (winner !== null) {
			return {
				x: depth - 100,
				o: 100 - depth,
				tie: 0
			}[winner]
		}
		let best_score = -Infinity
		if (maximize) {
			for (let row = 0; row < 3; row++) {
				for (let column = 0; column < 3; column++) {
					let element = board[row * 3 + column]
					if (element.dataset.check === '') {
						element.dataset.check = computer

						let score = miniMax(false, depth + 1)
						element.dataset.check = ''
						best_score = Math.max(best_score, score)
					}
				}
			}

		} else {
			best_score = Infinity
			for (let row = 0; row < 3; row++) {
				for (let column = 0; column < 3; column++) {
					let element = board[row * 3 + column]
					if (element.dataset.check === '') {
						element.dataset.check = player

						let score = miniMax(true, depth + 1)
						element.dataset.check = ''

						best_score = Math.min(best_score, score)
					}
				}
			}
		}
		return best_score
	}
	function computerMove() {
		let best_move = null
		let best_score = -Infinity
		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {
				let element = board[row * 3 + column]
				if (element.dataset.check === '') {

					element.dataset.check = computer

					let score = miniMax(false)
					element.dataset.check = ''
					if (score > best_score) {
						best_score = score
						best_move = row * 3 + column
					}
				}
			}
		}
		let element = board[best_move]
		element.src = 'asserts/o.png'
		element.dataset.check = computer
		tooglePlayer()
	}
	function tooglePlayer() {
		text_player[Number(is_player_one)].style.color = 'white'
		is_player_one = !is_player_one
		text_player[Number(is_player_one)].style.color = 'black'
	}
	function resetGame() {
		board.forEach(img => {
			img.dataset.check = ''
			img.src = 'asserts/empty.png'
		})

		is_player_one = true

	}

	board.forEach(function addEventClickInImage(img) {

		img.addEventListener('click', function eventClick() {
			if (img.dataset.check === '') {
				img.dataset.check = is_player_one ? player : computer
				img.src = is_player_one ? 'asserts/x.png' : 'asserts/o.png'
				tooglePlayer()
				if (getWinner() !== null) {
					let message = getWinner() === computer
						? 'Voce perdeu!' :
						'Parabens, voce empatou!'
					alert(message)
					resetGame()
				} else {
					computerMove()
				}
			}

		})
	})
}
window.onload = main
