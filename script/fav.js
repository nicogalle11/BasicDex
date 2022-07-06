`use strict`;

let favorites = JSON.parse(localStorage.getItem(`favorites`));
const d = document;
let container = d.createElement(`div`);
container.className = `row`;

if (favorites[0] == null) {
	console.log(`No hay favoritos`);
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

	card.append(aux);
	aux.append(pokemon_name,pokemon_img,type,remove_fav);
	container.append(card);
	main.append(container);

	card.id = `card`;
	aux.id = `aux`;
	//card.id = `card`;

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