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
onlineTest();
cargarLocalStorage();

search_button.addEventListener(`click`, () =>{
	pokemonSearch(input.value);
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
			if(json.cod == `404`) {
				//notFound();
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


	//datos.className = `text-center col-12 col-sm-10 offset-sm-1`;
	//auxiliar.className = `row`;
	//resumen.className = `col-12 col-lg-6`;
	//detalles.className = `text-start mb-4 col-10 offset-1 col-md-8 offset-md-2 col-lg-5 m-lg-auto col-xxl-4`;
	//mapa.className = `col-12 p-0 col-sm-10 offset-sm-1`;

	//SETEANDO LA PALETA DE COLORES SEGÚN TEMPERATURA
/*
	let paleta = ``,
		blanco = `rgba(255,255,255,0.8)`, //#FFFFFF
		celeste = `rgba(92,209,255,0.8)`, //#5CD1FF
		verde = `rgba(71,255,71,0.8)`, //#47FF47
		amarillo = `rgba(255,255,92,0.8)`, //#FFFF5C
		naranja = `rgba(255,173,92,0.8)`, //#FFAD5C
		rojo = `rgba(255,71,71,0.8)`; //#FF4747

	if (parseInt(data.main.temp) <= 5) {
		paleta = `linear-gradient(45deg,${blanco},${celeste})`;
	} else if (data.main.temp <= 15) {
		paleta = `linear-gradient(45deg,${celeste},${verde})`;
	} else if (data.main.temp <= 25) {
		paleta = `linear-gradient(45deg,${verde},${amarillo})`;
	} else if (data.main.temp <= 30) {
		paleta = `linear-gradient(45deg,${amarillo},${naranja})`;
	} else if (data.main.temp > 30) {
		paleta = `linear-gradient(45deg,${naranja},${rojo})`;
	}
*/
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
/*
	datos.style.background = paleta;
	titulo.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png) no-repeat`;
	titulo.style.backgroundPosition = `bottom`;
	footer.style.background = paleta;
	*/
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

function onlineTest() {
	if (!navigator.onLine) {
		console.log(`sin conexion`);
		let texto = d.createElement(`p`);
		texto.innerHTML = `UY NO TENÉS INTERNET :(`;
		main.append(texto);
	}
}

window.addEventListener(`offline`, event => {
	console.log(`todo offline`);
});

window.addEventListener(`online`, event => {
	console.log(`todo online`);
});

/*if (!navigator.onLine) {
	console.log(`sin conexion`);
	let texto = d.createElement(`p`);
	texto.innerHTML = `UY NO TENÉS INTERNET :(`;
	main.append(texto);
}*/