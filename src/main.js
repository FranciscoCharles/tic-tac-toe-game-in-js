function main() {

	const board = document.querySelectorAll('img')
	const text_player = document.querySelectorAll('.text-container')
	const PLAYER = 'x'
	const COMPUTER = 'o'
	let is_player_one = true

	text_player[0].style.color = 'white'

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

	function getWinner() {
		if (isWinner(COMPUTER)) {
			return COMPUTER
		} else if (isWinner(PLAYER)) {
			return PLAYER
		} else if (isTie()) {
			return 'tie';
		}
		return null
	}

	function miniMax(current_player = PLAYER, depth = 0) {
		let winner = getWinner()

		if (winner !== null) {
			return {
				x: depth - 100,
				o: 100 - depth,
				tie: 0
			}[winner]
		}

		let callback = Math.min
		let best_score = Infinity
		let next_player = COMPUTER

		if (current_player === COMPUTER) {
			callback = Math.max
			best_score = -Infinity
			next_player = PLAYER
		}

		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {
				let element = board[row * 3 + column]
				if (element.dataset.check === '') {
					element.dataset.check = current_player

					let score = miniMax(next_player, depth + 1)
					element.dataset.check = ''
					best_score = callback(best_score, score)
				}
			}
		}
		return best_score
	}

	function tooglePlayer() {
		text_player[Number(is_player_one)].style.color = 'white'
		is_player_one = !is_player_one
		text_player[Number(is_player_one)].style.color = 'black'
	}

	function computerMove() {
		let best_move = null
		let best_score = -Infinity

		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {

				let element = board[row * 3 + column]
				if (element.dataset.check === '') {

					element.dataset.check = COMPUTER

					let score = miniMax()
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
		element.dataset.check = COMPUTER
		tooglePlayer()
	}

	function playerVsComputer() {
		tooglePlayer()
		let winner = getWinner()
		if (winner === 'tie' || winner === 'o') {
			tooglePlayer()
			alert(
				winner === 'tie'
					? 'Congratulations, you tied!'
					: 'You lost!'
			)
			resetGame()
		} else {
			computerMove()
			if (getWinner() === 'o') {
				alert('You lost!')
				resetGame()
			}
		}
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
				img.dataset.check = is_player_one ? PLAYER : COMPUTER
				img.src = is_player_one ? 'asserts/x.png' : 'asserts/o.png'
				playerVsComputer()
			}
		})
	})
}

window.onload = main
