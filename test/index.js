// function flatten(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		if (Array.isArray(arr[i])) {
// 			arr = arr.concat(arr[i]);
// 			arr.splice(i, 1);
// 		}
// 	}
// 	return arr;
// }

// let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];
// console.log(flatten(arr));

function curringAdd() {
	let args = [].slice.call(arguments);

	function add() {
		args = [...args, ...[].slice.call(arguments)];
		return add;
	}

	add.toString = function () {
		return args.reduce((t, a) => t + +a, 0);
	};
}

function myCall(context, ...args) {
	context ??= globalThis;

	const fnSymbol = Symbol("fn");
	context[fnSymbol] = this;

	const result = context[fnSymbol](...args);
	delete context[fnSymbol];
	return result;
}

function myApply(context, args) {
	context ??= globalThis;
	const fnSymbol = Symbol("fn");

	context[fnSymbol] = this;

	const result = Array.isArray(args) ? context[fnSymbol](...args) : context[fnSymbol]();
	delete context[fnSymbol];
	return result;
}

function myBind(context, boundArgs) {
	const self = this;

	return function (...callArgs) {
		return self.apply(context, [...boundArgs, ...callArgs]);
	};
}

Function.prototype.myBind2 = function (context, bindArgs) {
	const originalFn = this;

	function boundFn(...callArgs) {
		const isNew = this instanceof boundFn;
		const thisArg = isNew ? this : context;

		return originalFn.apply(thisArg, [...bindArgs, ...callArgs]);
	}
	if (originalFn.prototype) {
		boundFn.prototype = Object.create(originalFn.prototype);
	}

	return boundFn;
};

function myNew(fn) {
	const newObj = Object.create(fn.prototype);
	const args = [].slice.call(arguments, 1);
	const result = fn.apply(newObj, args);
	return result;
}
