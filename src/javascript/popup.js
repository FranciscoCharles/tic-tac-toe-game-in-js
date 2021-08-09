const finishMessageBox = function () {
	const text_element = document.querySelector('.modal-text')
	const popup_modal = document.querySelector('.modal')

	function changeMessage(message) {
		message = '<p>' + message + '</p>\n'
		message += '<p>Want to play again on this difficulty?<p>'
		text_element.innerHTML = message
		popup_modal.style.display = 'flex'
	}

	return changeMessage
}()
