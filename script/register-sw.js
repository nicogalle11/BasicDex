`use strict`;

if (`serviceWorker` in navigator){
	navigator.serviceWorker.register(`../service-worker.js`).then((message) => {
		console.log(`Funciona`);
	});
} else {
	console.log(`No funciona`);
}