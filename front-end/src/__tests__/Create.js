const fetch = require("node-fetch");

describe('create workspace', () => {
	it('return error if provided malformed URL', () => {
		return fetch('http://localhost:8080/api/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: "outside of time",
				original_url: 'badurl.sdfjhsdjfhsdjfhj'
			})
		}).then(res => res.json()).then(json => {
			expect(json.message).toEqual("Failed to load Page")
		})
	});

	it('return correct url after generating unique workspace id', () => {
		const url = 'https://en.wikipedia.org/wiki/Ericaceae';
		return fetch('http://localhost:8080/api/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: "outside of time",
				original_url: url
			})
		}).then(res => res.json()).then(json => {
			fetch('http://localhost:8080/api/workspace/' + json.id.substr(50), {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(res => res.json()).then(json => {
				expect(json.original_url).toEqual(url)
			})
		})
	})
})