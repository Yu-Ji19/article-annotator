const hostname = "http://localhost:8080";
const fetch = require("node-fetch");

describe('collaborator', () => {
    var path = hostname+"/api/create";
	var body = {
		original_url: "http://www.google.com",
		date:"just now"
	}
	
	var id = "";
	it('create a workspace try to get collab list, should be empty', () => {
		return fetch(path, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(res=>res.json())
		.then(json=>{
			id = json.id
			var obj = {};
			obj.original_url = json.original_url;
			obj.date = json.date;
			//expect(obj).toEqual(body);
		})
		.then(()=>{
			path = hostname+'/api/collaborators/' + id;
			return fetch(path, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(res=>res.json())
			.then(json=>{
				expect(json).toEqual({});
			})
		})
		
	})		
})

//doesn't work yet 

// describe('access workspace with invalid url',()=>{
// 	it('access workspace with invalid url', ()=>{
// 		const illegalID = "IllegalID";
// 		var path = hostname + '/api/collaborators/' +illegalID;
// 		return fetch(path, {
// 			method: 'GET',
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			}
// 		})
// 		.then(res=>res.json())
// 		.then(json=>{
// 			const message = "Counldn't find annotations for the url";
// 			expect(json.message).toEqual(message);
// 		})
// 	})
// }) 








