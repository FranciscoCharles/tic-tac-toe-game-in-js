const finishMessageBox = function () {
	const text_element = document.querySelector('.modal-text')
	const popup_modal = document.querySelector('.modal')

	function changeMessage(message) {
		message = '<p>' + message + '</p>\n'
		message += '<p>do you want to play again?<p>'
		text_element.innerHTML = message
		popup_modal.style.display = 'flex'
	}

	return changeMessage
}()
