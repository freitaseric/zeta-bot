export function randomInt(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min)) + min
}

export function randomFloat(min = 0.0, max = 100.0) {
	return Math.random() * (max - min) + min
}
