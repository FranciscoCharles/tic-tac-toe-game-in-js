const toogleElementOfGame = function () {

	const buttons = document.querySelectorAll('.menu > button')
	const p_vs_p_btn = document.querySelector('.menu-pxp-button')
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
			current_difficulty = btn.textContent
			current_game = 'COMPUTER_VS'
			toogleStyle()
		})
	})

	p_vs_p_btn.addEventListener('click', _ => {
		current_game = 'PLAYER_VS'
		toogleStyle()
	})

	return toogleStyle
}()

