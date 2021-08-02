function main() {

	const all_images = document.querySelectorAll('img')
	const text_player = document.querySelectorAll('.text-container')
	let player_1 = true
	let play_counter = 0

	text_player[0].style.color = 'white'
	function tooglePlayer() {
		text_player[Number(player_1)].style.color = 'white'
		player_1 = !player_1
		text_player[Number(player_1)].style.color = 'black'
	}
	function resete_game() {
		all_images.forEach(img => {
			img.dataset.check = ""
			img.src = 'asserts/empty.png'
		})

		player_1 = true
		play_counter = 0
	}

	all_images.forEach(img => {

		img.addEventListener('click', () => {
			if (img.dataset.check === "") {
				img.dataset.check = true
				img.src = player_1 ? 'asserts/x.png' : 'asserts/o.png'
				tooglePlayer()
				play_counter++
				if (play_counter === 9) {
					resete_game()
				}
			}

		})
	})
}
window.onload = main
