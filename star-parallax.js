const container = document.getElementById('star-container')
const numStars = 600
const stars = []

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

let windowW = window.innerWidth
let windowH = window.innerHeight

function randomBetween(min, max) {
	return Math.random() * (max - min) + min
}

function generateStars() {
	container.innerHTML = ''
	stars.length = 0

	const fragment = document.createDocumentFragment()

	for (let i = 0; i < numStars; i++) {
		const star = document.createElement('div')
		star.classList.add('star')

		const isPlus = i < numStars / 2
		star.classList.add(isPlus ? 'star-plus' : 'star-minus')

		const size = randomBetween(0.5, 2.2)
		star.style.width = `${size}px`
		star.style.height = `${size}px`
		star.style.backgroundColor = Math.random() < 0.88 ? '#fff' : '#bcdfff'
		star.style.opacity = randomBetween(0.6, 1)

		const left = Math.random() * 100
		const top = Math.random() * 100

		star.style.left = `${left}%`
		star.style.top = `${top}%`

		const speed = randomBetween(2, 40)
		const direction = isPlus ? 1 : -1

		stars.push({
			el: star,
			speed: speed,
			direction: direction,
		})

		fragment.appendChild(star)
	}

	container.appendChild(fragment)
}

function onMouseMove(event) {
	if (event.touches && event.touches.length > 0) {
		mouseX = event.touches[0].clientX
		mouseY = event.touches[0].clientY
	} else {
		mouseX = event.clientX
		mouseY = event.clientY
	}
}

function animate() {
	targetX += (mouseX - windowW / 2 - targetX) * 0.1
	targetY += (mouseY - windowH / 2 - targetY) * 0.1

	stars.forEach(star => {
		const dx = ((targetX * star.speed) / 500) * star.direction
		const dy = ((targetY * star.speed) / 500) * star.direction

		star.el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
	})

	requestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
	windowW = window.innerWidth
	windowH = window.innerHeight
})

document.addEventListener('DOMContentLoaded', () => {
	generateStars()

	mouseX = windowW / 2
	mouseY = windowH / 2

	animate()
})

window.addEventListener('mousemove', onMouseMove)
window.addEventListener('touchmove', onMouseMove, { passive: true })
