function main() {

	const all_images = document.querySelectorAll('img')
	const text_player = document.querySelectorAll('.text-container')
	let is_player_one = true
	let play_counter = 0

	text_player[0].style.color = 'white'

	function tooglePlayer() {
		text_player[Number(is_player_one)].style.color = 'white'
		is_player_one = !is_player_one
		text_player[Number(is_player_one)].style.color = 'black'
	}
	function reset_game() {
		all_images.forEach(img => {
			img.dataset.check = ""
			img.src = 'asserts/empty.png'
		})

		is_player_one = true
		play_counter = 0
	}

	all_images.forEach(img => {

		img.addEventListener('click', () => {
			if (img.dataset.check === "") {
				img.dataset.check = true
				img.src = is_player_one ? 'asserts/x.png' : 'asserts/o.png'

				tooglePlayer()
				play_counter++
				if (play_counter === 9) {
					reset_game()
				}
			}
		})
	})
}
window.onload = main
