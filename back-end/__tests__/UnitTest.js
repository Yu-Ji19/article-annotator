const hostname = "http://localhost:8080";
const fetch = require("node-fetch");

describe('access information of non-existent workspace',()=>{
	it('get a list of collaborators for an illegal workspace', ()=>{
		const illegalID = "IllegalID";
		var path = hostname + '/api/collaborators/' +illegalID;
		return fetch(path, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res=>res.json())
		.then(json=>{
			const message = "Invalid URL";
			expect(json.message).toEqual(message);
		})
    })
    
    it('get a list of annotations for an illegal workspace', ()=>{
		const illegalID = "IllegalID";
		var path = hostname + '/api/annotation/all/' +illegalID;
		return fetch(path, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		// .then(res=>res.json())
		.then(res=>res.json())
		.then(json=>{
			const message = "Invalid URL";
			expect(json.message).toEqual(message);
		})
	})
})



describe('access workspace with invalid url',()=>{
	it('access workspace with invalid url', ()=>{
		const illegalID = "IllegalID";
		var path = hostname + '/api/workspace/' +illegalID;
		return fetch(path, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res=>res.json())
		.then(json=>{
			const message = "Invalid URL";
			expect(json.message).toEqual(message);
		})
	})
})

describe('create workspace test', () => {
	var path = hostname+"/api/create";
	var body = {
		original_url: "http://www.google.com",
		date:"just now"
	}
	it('create a workspace with illegal parameter', () => {
		return fetch(path, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}).then(res=>res.json())
		.then(json=>{
			var obj = {};
			obj.original_url = json.original_url;
			obj.date = json.date;
			expect(obj).toEqual(body);
		})
	})
})


describe('create workspace', () => {
	it('return error if provided malformed URL', () => {
		return fetch(hostname + '/api/create', {
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
		return fetch(hostname +'/api/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				date: "outside of time",
				original_url: url
			})
        })
        .then(res => res.json())
        .then(json => {
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






