const finishMessageBox = function () {

	const popup_modal = document.querySelector('.modal')
	const text_element = document.querySelector('.modal-text')
	const popup_close_btn = document.querySelector('.close-modal')
	const btn_continue_game = document.querySelector('button[data-btn-p1]')
	const btn_back_menu = document.querySelector('button[data-btn-p2]')

	function changeMessage(message) {
		message = '<p>' + message + '</p>\n'
		message += '<p>do you want to play again?<p>'
		text_element.innerHTML = message
		popup_modal.style.display = 'flex'
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

	return changeMessage
}()
