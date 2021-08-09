let is_game = false
let DIFFICULTY = null
let probability_of_difficulty = {
	Easy: 0.3,
	Medium: 0.6,
	Difficult: 0.8,
	Impossible: 1
}

const toogleElementOfGame = function () {

	const buttons = document.querySelectorAll('.menu > button')
	const container_player = document.querySelector('.container-player')
	const board_element = document.querySelector('.board')
	const container_menu = document.querySelector('.container-menu')

	function toogleStyle() {
		is_game = !is_game
		if (is_game) {
			container_player.style.display = 'flex'
			board_element.style.display = 'block'
			container_menu.style.display = 'none'
		} else {
			container_player.style.display = 'none'
			board_element.style.display = 'none'
			container_menu.style.display = 'block'
		}
	}

	buttons.forEach(btn => {
		btn.addEventListener('click', _ => {
			DIFFICULTY = btn.textContent;
			toogleStyle()
		})
	})

	return toogleStyle
}()

