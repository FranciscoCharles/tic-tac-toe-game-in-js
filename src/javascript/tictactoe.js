const PATH_IMG_X = 'asserts/x.png'
const PATH_IMG_O = 'asserts/o.png'
const PATH_IMG_EMPTY = 'asserts/empty.png'

class TicTacToe {

	constructor() {

		this.board = Array.from(document.querySelectorAll('img'))
		this.text_player = document.querySelectorAll('.text-container')
		this.PLAYER = 'x'
		this.COMPUTER = 'o'
		this.is_player_one = true

		this.text_player[0].style.color = 'white'
	}

	isTie() {
		return this.board.every(({ dataset }) => dataset.check !== '')
	}

	isWinner(player) {

		if (this.board[0].dataset.check === player
			&& this.board[1].dataset.check === player
			&& this.board[2].dataset.check === player) {
			return true
		}
		if (this.board[3].dataset.check === player
			&& this.board[4].dataset.check === player
			&& this.board[5].dataset.check === player) {
			return true
		}
		if (this.board[6].dataset.check === player
			&& this.board[7].dataset.check === player
			&& this.board[8].dataset.check === player) {
			return true
		}
		if (this.board[0].dataset.check === player
			&& this.board[3].dataset.check === player
			&& this.board[6].dataset.check === player) {
			return true
		}
		if (this.board[1].dataset.check === player
			&& this.board[4].dataset.check === player
			&& this.board[7].dataset.check === player) {
			return true
		}
		if (this.board[2].dataset.check === player
			&& this.board[5].dataset.check === player
			&& this.board[8].dataset.check === player) {
			return true
		}

		if (this.board[0].dataset.check === player
			&& this.board[4].dataset.check === player
			&& this.board[8].dataset.check === player) {
			return true
		}
		if (this.board[2].dataset.check === player
			&& this.board[4].dataset.check === player
			&& this.board[6].dataset.check === player) {
			return true
		}
		return false
	}

	getWinner() {
		if (this.isWinner(this.COMPUTER)) {
			return this.COMPUTER
		} else if (this.isWinner(this.PLAYER)) {
			return this.PLAYER
		} else if (this.isTie()) {
			return 'tie';
		}
		return null
	}

	miniMax(current_player = this.PLAYER, depth = 0) {
		let winner = this.getWinner()

		if (winner !== null) {
			return {
				x: depth - 100,
				o: 100 - depth,
				tie: 0
			}[winner]
		}

		let callback = Math.min
		let best_score = Infinity
		let next_player = this.COMPUTER

		if (current_player === this.COMPUTER) {
			callback = Math.max
			best_score = -Infinity
			next_player = this.PLAYER
		}
		this.board.forEach(({ dataset }) => {
			if (dataset.check === '') {
				dataset.check = current_player
				let score = this.miniMax(next_player, depth + 1)
				dataset.check = ''
				best_score = callback(best_score, score)
			}
		})
		return best_score
	}
	tooglePlayer() {
		this.text_player[Number(this.is_player_one)].style.color = 'white'
		this.is_player_one = !this.is_player_one
		this.text_player[Number(this.is_player_one)].style.color = 'black'
	}

	computerMove() {
		let best_move = null
		let best_score = -Infinity

		this.board.forEach(({ dataset }, index) => {
			if (dataset.check === '') {

				dataset.check = this.COMPUTER
				let score = this.miniMax()
				dataset.check = ''

				if (score > best_score) {
					best_score = score
					best_move = index
				}
			}
		})
		this.setComputerPosition(best_move)
	}

	setComputerPosition(index) {
		let element = this.board[index]
		element.src = PATH_IMG_O
		element.dataset.check = this.COMPUTER
		this.tooglePlayer()
	}

	computerRandomMove() {

		let empty_positions = this.board.reduce((acc, { dataset }, index) => {
			if (dataset.check === '') acc.push(index)
			return acc
		}, [])
		let index = empty_positions[Math.floor(Math.random() * empty_positions.length)]
		this.setComputerPosition(index)
	}
	resetGame() {
		this.board.forEach(img => {
			img.dataset.check = ''
			img.src = PATH_IMG_EMPTY
		})
		this.is_player_one = true
		this.text_player[0].style.color = 'white'
		this.text_player[1].style.color = 'black'
	}
}
