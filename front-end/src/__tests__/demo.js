const summy = (a, b) => {
	return a + b;
}

describe('the sum function', () => {
	it('return the sum of two integers', () => {
		expect(summy(3,4)).toEqual(7)
	})
})