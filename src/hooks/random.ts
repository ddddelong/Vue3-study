/**
 * @param {number} min
 * @param {number | undefined} max
 * @returns {number} - [min, max)，如果只传一个参数则返回[0, min)
 */
function randInt(min: number, max?: number | undefined): number {
	if (max === undefined) {
		max = min;
		min = 0
	}
	return Math.floor(Math.random() * (max - min)) + min;
}

export {
	randInt
}