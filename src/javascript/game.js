class TicTacToe {

	constructor() {

		this.board = document.querySelectorAll('img')
		this.text_player = document.querySelectorAll('.text-container')
		this.PLAYER = 'x'
		this.COMPUTER = 'o'
		this.is_player_one = true

		this.text_player[0].style.color = 'white'
	}

	isTie() {
		let tie = true
		for (let row = 0; row < 3 && tie; row++) {
			for (let column = 0; column < 3; column++) {
				let element = this.board[row * 3 + column]
				if (element.dataset.check === '') {
					tie = false
					break
				}
			}
		}
		return tie
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

		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {
				let element = this.board[row * 3 + column]
				if (element.dataset.check === '') {
					element.dataset.check = current_player

					let score = this.miniMax(next_player, depth + 1)
					element.dataset.check = ''
					best_score = callback(best_score, score)
				}
			}
		}
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

		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {

				let element = this.board[row * 3 + column]
				if (element.dataset.check === '') {

					element.dataset.check = this.COMPUTER

					let score = this.miniMax()
					element.dataset.check = ''
					if (score > best_score) {
						best_score = score
						best_move = row * 3 + column
					}
				}
			}
		}
		let element = this.board[best_move]
		element.src = 'asserts/o.png'
		element.dataset.check = this.COMPUTER
		this.tooglePlayer()
	}
	computerRandomMove() {

		let move_array = []
		for (let row = 0; row < 3; row++) {
			for (let column = 0; column < 3; column++) {

				let element = this.board[row * 3 + column]
				if (element.dataset.check === '') {
					move_array.push(row * 3 + column)
				}
			}
		}
		let index = move_array[Math.floor(Math.random() * move_array.length)]
		let element = this.board[index]
		element.src = 'asserts/o.png'
		element.dataset.check = this.COMPUTER
		this.tooglePlayer()
	}
	resetGame() {
		this.board.forEach(img => {
			img.dataset.check = ''
			img.src = 'asserts/empty.png'
		})
		this.is_player_one = true
		this.text_player[0].style.color = 'white'
		this.text_player[1].style.color = 'black'
	}
}
