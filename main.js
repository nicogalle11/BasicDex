`use strict`;

const API_KEY = `https://graphql-pokeapi.graphcdn.app/`;
const d = document;
const search_button = d.getElementById(`button`);
const search_input = d.getElementById(`input`);
const texto = d.getElementById(`prueba`);
const pokemonQuery = (pokemon) =>
	`query {
		pokemon(name: "${pokemon}") {
			id
			name
			sprites {front_default}
			moves {
				move {name}
			}
			types {
				type {name}
			}
		}
	}`;

let favorites;
cargarLocalStorage();
onlineTest();

search_button.addEventListener(`click`, () =>{
	pokemonSearch(input.value.toLowerCase());
})

function pokemonSearch(pokemon) {
	const options = {
		method: "post",
		headers: {
			"Content-Type":"application/json"
		},
		body: JSON.stringify({query: pokemonQuery(pokemon)})
	}

	fetch(API_KEY, options)
		.then(function(res){
			//localStorage.getItem(`lastvisit`) = res;
			return res.json()
		})
		.then(function(json){
			if(json.data.pokemon.id == null) {
				notFound();
			} else {
				let datos = json.data;
				localStorage.setItem(`lastvisit`, JSON.stringify(datos));
				mostrarResultado(datos);
			}
		})
		.finally(function(){

		})
		.catch(function(error){
			console.log(`ESTE ES EL ERROR: ` + error.message);
		})
}

function mostrarResultado(data) {
	if (d.getElementById(`notFound`)) {
		d.getElementById(`notFound`).remove();
	}
	let types = (data.pokemon.types);
	let moves = (data.pokemon.moves);

	if (d.querySelector(`#container`)) {
		d.querySelector(`#container`).remove();
	}

	//CREANDO LAS ETIQUETAS DEL HTML

	let container = d.createElement(`div`),
		pokemon_name = d.createElement(`h2`),
		pokemon_img = d.createElement(`img`),
		type = d.createElement(`p`),
		//moveset = d.createElement(`p`);
		add_fav = d.createElement(`button`);
		remove_fav = d.createElement(`button`);
	container.append(pokemon_name,pokemon_img,type,add_fav,remove_fav);
	main.append(container);


	//IDENTIFICANDO CADA ETIQUETA CON SU ID

	container.id = `container`;
	pokemon_name.id = `pokemon_name`;
	pokemon_img.id = `pokemon_img`;
	type.id = `type`;
	//moveset.id =  `moveset`;
	add_fav.id = `add_fav`;
	remove_fav.id = `remove_fav`;


	//APLICANDO BOOTSTRAP

	container.className = `row py-4`;
	pokemon_name.className = `col-8 offset-2 text-center`;
	pokemon_img.className = `col-8 offset-2 col-md-6 offset-md-3 col-lg-4 mx-lg-auto offset-lg-0 col-xl-4 col-xxl-3`;
	type.className = `col-8 offset-2 text-center`;
	//moveset.className =  `moveset`;
	add_fav.className = `col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 `;
	remove_fav.className = `col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4`;

	//SETEANDO LA PALETA DE COLORES SEGÚN TYPE

	let colors = [{name: `bug`,color: `rgba(170,197,54,1)`},{name: `dark`,color: `rgba(86,84,98,1)`},
			{name: `dragon`,color: `rgba(3,107,98,1)`},{name: `electric`,color: `rgba(245,212,73,1)`},
			{name: `fairy`,color: `rgba(240,141,234,1)`},{name: `fighting`,color: `rgba(214,60,100,1)`},
			{name: `fire`,color: `rgba(254,158,82,1)`},{name: `flying`,	color: `rgba(143,168,224,1)`},
			{name: `ghost`,color: `rgba(104,111,192,1)`},{name: `grass`,color: `rgba(100,185,90,1)`},
			{name: `ground`,color: `rgba(211,148,102,1)`},{name: `ice`,color: `rgba(114,206,195,1)`},
			{name: `normal`,color: `rgba(146,155,164,1)`},{name: `poison`,color: `rgba(169,98,202,1)`},
			{name: `psychic`,color: `rgba(245,112,115,1)`},{name: `rock`,color: `rgba(198,181,138,1)`},
			{name: `steel`,color: `rgba(87,136,158,1)`},{name: `water`,color: `rgba(103,182,223,1)`}];

	if (types.length == 1) {
		for (let type of types) {
			for (let color of colors) {
				if (type.type.name == color.name) {
					main.style.backgroundColor = color.color;
				}
			}
		}
	} else {
		let type1, type2;
			for (let color of colors) {
				if (types[0].type.name == color.name){
					type1 = color.color;
				}
				if (types[1].type.name == color.name){
					type2 = color.color;
				}				
			}		
		main.style.background = `linear-gradient(180deg,${type1},${type2})`;
	}

	//AGREGANDO DATOS AL HTML
	
	pokemon_name.innerHTML = `#${data.pokemon.id} - ${data.pokemon.name}`;
	pokemon_img.src = `${data.pokemon.sprites.front_default}`;
	type.innerHTML = `Type: `;
	if (types.length == 1) {
		type.innerHTML += types[0].type.name;
	} else {
		type.innerHTML += `${types[0].type.name} / ${types[1].type.name}`;
	}
	add_fav.innerHTML = `AGREGAR A FAVORITOS`;
	remove_fav.innerHTML = `QUITAR DE FAVORITOS`;

	//PROGRAMANDO LOS BOTONES
	
	add_fav.addEventListener(`click`, () =>{
		addFavorite(data);
		testFavorite(data, add_fav, remove_fav);
	})

	remove_fav.addEventListener(`click`, () =>{
		removeFavorite(data);
		testFavorite(data, add_fav, remove_fav);
	})

	//AGREGANDO ESTILOS AL HTML

	pokemon_name.style.textTransform = `capitalize`;
	type.style.textTransform = `capitalize`;
	//moveset.style.textTransform = `capitalize`;
	testFavorite(data, add_fav, remove_fav);
}

function addFavorite(data) {
	if (favorites != null) {
		let fav_list = JSON.parse(localStorage.getItem(`favorites`));
		favorites.push(data);
		fav_list.push(JSON.stringify(favorites))
		localStorage.setItem(`favorites`, JSON.stringify(favorites));
	} else {
		favorites = [];
		favorites.push(data);
		localStorage.setItem(`favorites`, JSON.stringify(favorites));
	}
}

function removeFavorite(data) {
	for (let fav of favorites) {
		if (fav.pokemon.id === data.pokemon.id) {
			favorites.splice(favorites.indexOf(fav),1);
		}
		localStorage.setItem(`favorites`, JSON.stringify(favorites));
	}
}

function testFavorite(data, add_fav, remove_fav) {
	if (favorites) {
		for (let fav of favorites) {
			if (fav.pokemon.id === data.pokemon.id) {
				add_fav.style.visibility = `hidden`;
				remove_fav.style.visibility = `visible`;
				return data;
			}
		}
	remove_fav.style.visibility = `hidden`;
	add_fav.style.visibility = `visible`;
	} else {
		remove_fav.style.visibility = `hidden`;
		add_fav.style.visibility = `visible`;
	}
}

function cargarLocalStorage() {

	if (localStorage.getItem(`lastvisit`) && localStorage.getItem(`lastvisit`) != `[object Response]`) {
		last_visit = JSON.parse(localStorage.getItem(`lastvisit`));
		favorites = JSON.parse(localStorage.getItem(`favorites`));
		mostrarResultado(last_visit);
	} else if (localStorage.getItem(`favorites`)) {
		favorites = JSON.parse(localStorage.getItem(`favorites`));
	}
}

function notFound() {
	if (d.querySelector(`#container`)) {
		d.querySelector(`#container`).remove();
	}
	if (d.getElementById(`notFound`)) {
		d.getElementById(`notFound`).remove();
	}
	let container = d.createElement(`div`),
		auxiliar = d.createElement(`div`),
		error_m1 = d.createElement(`p`),
		error_m2 = d.createElement(`p`);

	container.id = `notFound`;

	auxiliar.append(error_m1, error_m2);
	container.append(auxiliar);
	main.append(container);

	container.className = `row text-center py-5`;
	auxiliar.className = `error text-center col-12 col-sm-10 offset-sm-1 py-5`;
	error_m1.className = ``;
	error_m2.className = `text-center col-lg-10 offset-1`;

	error_m1.innerHTML = `:(`;
	error_m2.innerHTML = `No se encontró la especie que estás buscando, porfi revisá que esté bien escrita. Recordamos que, por el momento, la búsqueda está limitada a especies pokémon que efectivamente existan y no sean inventadas por usuarixs. Muchas gracias.`;

	error_m1.style.fontSize = `10em`;
}

function onlineTest() {
	if (!navigator.onLine) {
		cargarLocalStorage();
		if (d.querySelector(`#container`)) {
			d.querySelector(`#container`).remove();
		}
		d.getElementById(`search`).remove();

		let container = d.createElement(`div`),
			auxiliar = d.createElement(`div`),
			error_m1 = d.createElement(`p`),
			error_m2 = d.createElement(`p`),
			img = d.createElement(`img`),
			texto = d.createElement(`p`),
			input = d.createElement(`input`),
			button = d.createElement(`button`),
			answer = d.createElement(`p`),
			aux = d.createElement(`div`);

		auxiliar.append(error_m1, error_m2);
		container.append(auxiliar);
		main.append(container);

		container.className = `row text-center py-5`;
		auxiliar.className = `error text-center col-12 col-sm-10 offset-sm-1`;
		error_m1.className = ``;
		error_m2.className = `text-center col-lg-10 offset-1`;
		img.className = `col-8 offset-2 col-md-6 offset-md-3 col-lg-4 mx-lg-auto offset-lg-0 col-xl-4 col-xxl-3`;
		aux.className = `mx-auto col-8 col-sm-6 col-md-4`;
		input.className =  ``;
		button.className = ``;

		error_m1.innerHTML = `:(`;
		error_m2.innerHTML = `¡Uy! ¡No tenés internet! Mientras vamos a ponerte a prueba y ver si te acordás los nombres de tus favoritos. Aparecerán en forma aleatoria ¡Divertite!`;
		button.innerHTML = `¡Adiviná!`
		texto.innerHTML = `Cuando quieras cambiar, podés refrescar la página para le siguiente.`;

		error_m1.style.fontSize = `10em`;
		error_m2.style.color = `#000000`;
		texto.style.color = `#000000`;
		answer.style.color = `#000000`;
		error_m1.style.color = `#000000`;
		main.style.background = `linear-gradient(180deg,rgba(255,255,255,0.8),rgba(100,100,100,0.8)`

		let game = favorites[Math.floor(Math.random() * favorites.length)];

		img.src = `${game.pokemon.sprites.front_default}`;

		aux.append(input,button);
		container.append(img,texto,aux,answer);

		button.addEventListener(`click`, () => {
			if (game.pokemon.name == input.value.toLowerCase()) {
				answer.innerHTML = `¡CORRECTO!`;
			} else {
				answer.innerHTML = `Incorrecto :(`
			}
		});
	}
}

window.addEventListener(`offline`, event => {
	console.log(`todo offline`);
});

window.addEventListener(`online`, event => {
	console.log(`todo online`);
});