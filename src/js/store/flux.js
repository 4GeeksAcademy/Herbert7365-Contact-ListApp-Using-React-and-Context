const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: [],
			idDelete: "",
			contactToEdit: {},
			listaAgendas: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContact: () => {
				fetch("https://playground.4geeks.com/contact/agendas/heriberto/contacts")
				.then((response) => {
					return response.json();
				}
				  )
				.then(data => {console.log("contacto?", data)})
			},

			getAgendas: () => {
				fetch("https://playground.4geeks.com/contact/agendas")
				.then((response) => {
					const contentType = response.headers.get("Content-Type");
					if (contentType.includes("application/json")){
						return response.json();
					}else {
						return response;
					}
				})
				.then(data => { 
					const storeCopia = getStore();
					setStore({
						...storeCopia, 
						listaAgendas: data.agendas
					})
				})
			},

			getAgendaByName: (name) => {
				fetch("")
			}

			addContact: user => {
				fetch("https://playground.4geeks.com/contact/agendas", {
					method: "POST", // or 'POST'
					body: JSON.stringify(user), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", response))
					.catch(error => console.error("Error:", error));
			},
			
			addidDelete: id => {
				setStore({ idDelete: id });
			},

			removeContact: () => {
				const store = getStore();
				fetch("https://playground.4geeks.com/contact/agendas" + store.idDelete, {
					method: "DELETE"
				}).then(res => {
					if (res.ok) {
						getActions().getData();
					}
				});
			},

			editContact: (id, contact) => {
				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then(res => res.json())
					.then(results => console.log(setStore({ contact: results }), "estoy en setStore"))
					.catch(error => console.log("Error", error));
			},
			
		}
	};
};

export default getState;