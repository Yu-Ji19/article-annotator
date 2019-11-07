const hostname = "http://localhost:8080";
const fetch = require("node-fetch");

// describe('collaborator', () => {
//     var path = hostname+"/api/create";
//     var body = {
//         original_url: "http://www.google.com",
//         date:"just now"
//     }
//     it('test collaborator', () => {
//         return fetch(path, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(body)
//         }).then(res=>res.json())
//         .then(json=>{
// 			//get empty collab list
// 			return fetch(hostname + '/api/collaborators/' + json.url_id.substr(50), {
// 				method: 'GET',
// 				headers: {
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json'
// 				}
// 			}).then((response) => response.json().then(data => {
// 				expect(data).toEqual({});
// 			})
// 			);
// 		})	
// 	})		
// })


describe('create workspace test', () => {
    it('return error if provided malformed URL', () => {
		return fetch(hostname + '/api/collaborators/' + "id", {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(res => res.json()).then(json => {
			expect(json.message).toEqual("Failed to load Page")
		})
	});
})









