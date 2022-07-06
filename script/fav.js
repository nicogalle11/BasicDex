`use strict`;

let favorites = JSON.parse(localStorage.getItem(`favorites`));
const d = document;
let container = d.createElement(`div`);
container.className = `row`;

if (!favorites || favorites[0] == null) {
	emptyFavs();
} else {
	for (let fav of favorites) {
		showFavorites(fav);
	}
}

function showFavorites(data) {
	let types = (data.pokemon.types);
	let moves = (data.pokemon.moves);

	let card = d.createElement(`div`),
		aux = d.createElement(`div`),
		pokemon_name = d.createElement(`h3`),
		pokemon_img = d.createElement(`img`),
		type = d.createElement(`p`),
		//moveset = d.createElement(`p`);
		remove_fav = d.createElement(`button`);

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
					card.style.backgroundColor = color.color;
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
		card.style.background = `linear-gradient(180deg,${type1},${type2})`;
	}

	card.append(aux);
	aux.append(pokemon_name,pokemon_img,type,remove_fav);
	container.append(card);
	main.append(container);

	card.id = `card`;
	aux.id = `aux`;

	card.className = `col-12 py-3 col-lg-6 col-xl-4`;
	aux.className = `row`;
	pokemon_name.className = `text-center`;
	pokemon_img.className = `mx-auto col-6 col-md-4 col-lg-6 col-xl-7 col-xxl-6`;
	type.className = `text-center`;
	//moveset.className =  `moveset`;
	remove_fav.className = `col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 col-lg-6 offset-lg-3 col-xl-8 offset-xl-2`;

	pokemon_name.innerHTML = `#${data.pokemon.id} - ${data.pokemon.name}`;
	pokemon_img.src = `${data.pokemon.sprites.front_default}`;
	type.innerHTML = `Type: `;

	if (types.length == 1) {
		type.innerHTML += types[0].type.name;
	} else {
		type.innerHTML += `${types[0].type.name} / ${types[1].type.name}`;
	}


	pokemon_name.style.textTransform = `capitalize`;
	type.style.textTransform = `capitalize`;

	remove_fav.innerHTML = `QUITAR DE FAVORITOS`;
	remove_fav.addEventListener(`click`, () =>{
		removeFavorite(data);
		if (card.id = data.pokemon.id) {
			card.remove();
		}
	})
}

function removeFavorite(data) {
	for (let fav of favorites) {
		if (fav.pokemon.id === data.pokemon.id) {
			favorites.splice(favorites.indexOf(fav),1);
		}
		localStorage.setItem(`favorites`, JSON.stringify(favorites));
	}
}

function emptyFavs() {
	let container = d.createElement(`div`),
		auxiliar = d.createElement(`div`),
		error_m1 = d.createElement(`p`),
		error_m2 = d.createElement(`p`);

	auxiliar.append(error_m1, error_m2);
	container.append(auxiliar);
	main.append(container);

	container.className = `row text-center py-5`;
	auxiliar.className = `error text-center col-12 col-sm-10 offset-sm-1 py-5`;
	error_m1.className = ``;
	error_m2.className = `text-center col-lg-10 offset-1`;

	error_m1.innerHTML = `:(`;
	error_m2.innerHTML = `No tenés nada agregado a favoritos. Por favor corré a buscar tu pokémon preferido y agregalo para tenerlo en este bella colección :D.`;

	error_m1.style.fontSize = `10em`;
}