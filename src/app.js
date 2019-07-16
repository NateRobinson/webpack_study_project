import Vue from "vue";
import App from "./app.vue";
import router from "./router";

// 引入示例模块
import print from "./print";
print();

let p = new Promise(function(resolve, reject) {
	setTimeout(() => {
		resolve("done");
	}, 1000);
});
p.then(res => {
	console.log(res);
});

// 新增代码，测试观察模式。
console.log("hello world111");

new Vue({
	el: "#app",
	router,
	render: h => h(App),
});

// 增加对HMR的实现
if (module.hot) {
  module.hot.accept("./print.js", function() {
    console.log("接收更新后的模块");
    print();
  });
}
