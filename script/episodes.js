`use strict`;

const d = document;
const poketv = `https://www.pokemon.com/el/episodios-pokemon/episodios-pokemon/temporadas-de-tv-pokemon/`;
let main = d.querySelector(`main`),
	container = d.createElement(`div`),
	selector = d.createElement(`select`),
	selector_text = d.createElement(`p`),
	titulo = d.createElement(`h3`),
	aux = d.createElement(`div`),
	figure = d.createElement(`figure`),
	iframe = d.createElement(`iframe`),
	link = d.createElement(`a`);

figure.append(iframe);
aux.append(figure);
container.append(titulo,selector_text,selector,aux,link);
main.append(container);

container.className = `row`;
selector_text.className = `my-0 text-end col-4 offset-3 col-md-3 offset-md-3`;
selector.className = `col-2 col-lg-1`;
titulo.className = ``;
aux.className = `my-4 mx-auto col-12 col-lg-10 col-xl-9 col-xxl-8`;
figure.className = `ratio ratio-16x9`;
link.className = `text-center`;

selector_text.innerHTML = `Elige la temporada: `;
link.target = `_blank`;
link.href = `${poketv}1`;
link.innerHTML = `¡Mirá la temporada 1 en la página oficial haciendo click acá!`;
link.style.color = `#F0F0F0`;
iframe.frameborder = `0`;
iframe.src = `https://www.youtube.com/embed/uDIoEbbFKAY`

for (i = 1; i <= 23; i++) {
	let option = d.createElement(`option`);
	option.innerHTML = i;
	option.id = i;
	selector.append(option);
}

selector.addEventListener(`change`, () => {
	showVideo();
})

function showVideo() {
	link.innerHTML = `¡Mirá la temporada ${selector.value} en la página oficial haciendo click acá!`;
	link.href = poketv + selector.value;
	switch (selector.value) {
		case `1`:
			iframe.src = `https://www.youtube.com/embed/uDIoEbbFKAY`;
			break;
		case `2`:
			iframe.src = `https://www.youtube.com/embed/PCak4rjM1Po`;
			break;
		case `3`:
			iframe.src = `https://www.youtube.com/embed/dWgG3bnVUS0`;
			break;
		case `4`:
			iframe.src = `https://www.youtube.com/embed/VKSn-i2DI8A`;
			break;
		case `5`:
			iframe.src = `https://www.youtube.com/embed/qGJN8-Vp3ks`;
			break;
		case `6`:
			iframe.src = `https://www.youtube.com/embed/s1c4OgsrDLE`;
			break;
		case `7`:
			iframe.src = `https://www.youtube.com/embed/yjDMoNm23EY`;
			break;
		case `8`:
			iframe.src = `https://www.youtube.com/embed/gNPp3IjlW34`;
			break;
		case `9`:
			iframe.src = `https://www.youtube.com/embed/28aplfEJ3SM`;
			break;
		case `10`:
			iframe.src = `https://www.youtube.com/embed/Cdhi0GFTj7c`;
			break;
		case `11`:
			iframe.src = `https://www.youtube.com/embed/HyE1TBRluLA`;
			break;
		case `12`:
			iframe.src = `https://www.youtube.com/embed/ASNl4Upmh1E`;
			break;
		case `13`:
			iframe.src = `https://www.youtube.com/embed/W1yLtd83n0U`;
			break;
		case `14`:
			iframe.src = `https://www.youtube.com/embed/5O8wPZTk7t8`;
			break;
		case `15`:
			iframe.src = `https://www.youtube.com/embed/tW5UYYnB20Q`;
			break;
		case `16`:
			iframe.src = `https://www.youtube.com/embed/7pYFxXq9LX4`;
			break;
		case `17`:
			iframe.src = `https://www.youtube.com/embed/l8qqLZKzjlo`;
			break;
		case `18`:
			iframe.src = `https://www.youtube.com/embed/lCLhmVVNRoc`;
			break;
		case `19`:
			iframe.src = `https://www.youtube.com/embed/SbQ8vi2bK6A`;
			break;
		case `20`:
			iframe.src = `https://www.youtube.com/embed/3eUpz5BGBnk`;
			break;
		case `21`:
			iframe.src = `https://www.youtube.com/embed/qv4EuNKAUMo`;
			break;
		case `22`:
			iframe.src = `https://www.youtube.com/embed/rwFBGbZtkVE`;
			break;
		case `23`:
			iframe.src = `https://www.youtube.com/embed/RHIq47Hbauc`;
			break;
	}
}