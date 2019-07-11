import Vue from "vue";
import App from "./app.vue";
import router from "./router";

let p = new Promise(function(resolve, reject) {
	setTimeout(() => {
		resolve("done");
	}, 1000);
});
p.then(res => {
	console.log(res);
});

new Vue({
	el: "#app",
	router,
	render: h => h(App),
});
