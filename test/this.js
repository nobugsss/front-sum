// var a = "global";
// let obj = {
// 	a: "haha",
// 	fn: function () {
// 		console.log(this.a);
// 	},
// 	fn2: () => {
// 		console.log(this.a);
// 	}
// };
// obj.fn();
// obj.fn2();

// console.log(globalThis.a);

global.name = "zbq";

let obj = {
	name: "hahah",
	fn: function () {
		return function () {
			return this.name;
		};
	}
};

console.log(obj.fn()());
