### 函数执行结果

```js
function Foo() {
	Foo.a = function () {
		console.log(1);
	};
	this.a = function () {
		console.log(2);
	};
}
Foo.prototype.a = function () {
	console.log(3);
};
Foo.a = function () {
	console.log(4);
};
Foo.a();
let obj = new Foo();
obj.a();
Foo.a();
```

---

```js
function changeObjProperty(o) {
	o.siteUrl = "http://www.baidu.com";
	o = new Object();
	o.siteUrl = "http://www.google.com";
}
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

---

```js
async function async1() {
	console.log("async1 start");
	await async2();
	console.log("async1 end");
}
async function async2() {
	console.log("async2");
}
console.log("script start");
setTimeout(function () {
	console.log("setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
	console.log("promise1");
	resolve();
}).then(function () {
	console.log("promise2");
});
console.log("script end");
```

---

```js
var b = 10;
(function b() {
	b = 20; // 在严格模式下会抛错； 在非严格模式下，它默默失败，b 仍然指向函数本身
	console.log(b);
})();
```

- 这是一个具名函数表达式（Named Function Expression）；
- 这里的 b 仅在函数内部可见，相当于在函数作用域中创建了一个常量的函数名绑定；
- 在这个作用域中，b 是函数自身的名字，它是只读的。

---

```js
var a = 10;
(function () {
	console.log(a);
	a = 5;
	console.log(window.a);
	var a = 20;
	console.log(a);
})();
```

---

```js
var obj = {
	2: 3,
	3: 4,
	length: 2,
	splice: Array.prototype.splice,
	push: Array.prototype.push
};
obj.push(1);
obj.push(2);
console.log(obj);
```

---

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);
```

---

```js
// example 1
var a = {},
	b = "123",
	c = 123;
a[b] = "b";
a[c] = "c";
console.log(a[b]);

// example 2
var a = {},
	b = Symbol("123"),
	c = Symbol("123");
a[b] = "b";
a[c] = "c";
console.log(a[b]);

// example 3
var a = {},
	b = { key: "123" },
	c = { key: "456" };
a[b] = "b";
a[c] = "c";
console.log(a[b]);
```

---

### 如何实现函数的柯里化？

```js
function curringAdd() {
	let args = [].slice.call(arguments);

	function add() {
		args = [...args, ...[].slice.call(arguments)];
		return add;
	}

	add.toString = function () {
		return args.reduce((t, a) => t + +a, 0);
	};

	return add;
}

console.log(curringAdd(1)(2)(3)); // 6
console.log(curringAdd(1, 2, 3)(4)); // 10
console.log(curringAdd(1)(2)(3)(4)(5)); // 15
console.log(curringAdd(2, 6)(1)); // 9
console.log(curringAdd(1)); // 1
```

**注意：**
arguments 在 箭头函数中不可用  
新代码建议用 Array.from(arguments) 或 [...arguments]（配合 rest 参数）

```js
function curringAdd(...args) {
	function add(...newArgs) {
		args = [...args, ...newArgs];
		return add;
	}

	add.toString = function () {
		return args.reduce((t, a) => t + +a, 0);
	};

	return add;
}
```

---

### 手写 bind、call、apply

```js
// call
Function.prototype.myCall = function (context, ...args) {
	context = context || globalThis; // null/undefined 用全局对象替代

	const fnSymbol = Symbol(); // 避免覆盖原属性
	context[fnSymbol] = this; // this 是调用 myCall 的函数

	const result = context[fnSymbol](...args);
	delete context[fnSymbol]; // 清理
	return result;
};

// apply
Function.prototype.myApply = function (context, args) {
	context = context || globalThis;
	const fnSymbol = Symbol();
	context[fnSymbol] = this;

	const result = Array.isArray(args) ? context[fnSymbol](...args) : context[fnSymbol](); // 兼容 null

	delete context[fnSymbol];
	return result;
};

//  简化版（不含 new 情况）：
Function.prototype.myBind = function (context, ...boundArgs) {
	const self = this;

	return function (...callArgs) {
		return self.apply(context, [...boundArgs, ...callArgs]);
	};
};

//  完整版 bind（支持构造函数调用）
Function.prototype.myBind = function (context, ...boundArgs) {
	const originalFn = this;

	function boundFunction(...callArgs) {
		// this instanceof boundFunction 为 true ⇒ 使用 new 调用
		const isNew = this instanceof boundFunction;
		const finalContext = isNew ? this : context;

		return originalFn.apply(finalContext, [...boundArgs, ...callArgs]);
	}

	// 复制原函数原型（让 new 出来的对象有原型链）
	boundFunction.prototype = Object.create(originalFn.prototype);
	return boundFunction;
};
```

---

### 模拟 new 的实现

```js
function myNew(fn) {
	const newObj = Object.create(fn.prototype);
	const args = Array.prototype.slice.call(arguments, 1);
	const result = fn.apply(newObj, args);
	return typeof result === "object" && result !== null ? result : newObj;
}
```

---

### 手写 Promise

**最简版手写 Promise 实现（支持 .then()）**  
支持内容:

- ✅ 异步执行
- ✅ .then() 链式调用
- ✅ 状态不可逆
- ✅ 错误捕获（try/catch）
- ✅ 微任务模拟

```js
class MyPromise {
	constructor(executor) {
		this.state = "pending"; // 初始状态
		this.value = undefined; // 终值或拒因
		this.callbacks = []; // 存储 then 中的回调

		const resolve = (value) => {
			if (this.state !== "pending") return;
			this.state = "fulfilled";
			this.value = value;
			this.callbacks.forEach((cb) => cb.onFulfilled(value));
		};

		const reject = (reason) => {
			if (this.state !== "pending") return;
			this.state = "rejected";
			this.value = reason;
			this.callbacks.forEach((cb) => cb.onRejected(reason));
		};

		try {
			executor(resolve, reject); // 立即执行传入函数
		} catch (err) {
			reject(err);
		}
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const handle = () => {
				queueMicrotask(() => {
					try {
						if (this.state === "fulfilled") {
							const result = onFulfilled ? onFulfilled(this.value) : this.value;
							resolve(result);
						} else if (this.state === "rejected") {
							const result = onRejected ? onRejected(this.value) : this.value;
							reject(result);
						}
					} catch (err) {
						reject(err);
					}
				});
			};

			if (this.state === "pending") {
				this.callbacks.push({
					onFulfilled: () => handle(),
					onRejected: () => handle()
				});
			} else {
				handle();
			}
		});
	}
}
```

**功能目标（第二阶段）**

- then() 完整处理（包括返回 Promise 的情况）
- .catch() 捕获异常
- .finally() 支持
- 状态锁定、防止重复 resolve/reject
- 微任务调度模拟（queueMicrotask）
- 支持链式调用中的异步/同步值

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
	constructor(executor) {
		this.state = PENDING;
		this.value = undefined;
		this.onFulfilledCallbacks = [];
		this.onRejectedCallbacks = [];

		const resolve = (value) => {
			queueMicrotask(() => {
				if (this.state !== PENDING) return;
				this.resolvePromise(value);
			});
		};

		const reject = (reason) => {
			queueMicrotask(() => {
				if (this.state !== PENDING) return;
				this.state = REJECTED;
				this.value = reason;
				this.onRejectedCallbacks.forEach((cb) => cb(reason));
			});
		};

		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	resolvePromise(value) {
		if (value === this) {
			return this.reject(new TypeError("Chaining cycle"));
		}

		if (value instanceof MyPromise) {
			return value.then(
				(v) => this.resolvePromise(v),
				(r) => this.reject(r)
			);
		}

		if ((value && typeof value === "object") || typeof value === "function") {
			let then;
			try {
				then = value.then;
			} catch (err) {
				return this.reject(err);
			}

			if (typeof then === "function") {
				let called = false;
				try {
					then.call(
						value,
						(v) => {
							if (called) return;
							called = true;
							this.resolvePromise(v);
						},
						(r) => {
							if (called) return;
							called = true;
							this.reject(r);
						}
					);
				} catch (err) {
					if (!called) this.reject(err);
				}
				return;
			}
		}

		this.state = FULFILLED;
		this.value = value;
		this.onFulfilledCallbacks.forEach((cb) => cb(value));
	}

	reject(reason) {
		if (this.state !== PENDING) return;
		this.state = REJECTED;
		this.value = reason;
		this.onRejectedCallbacks.forEach((cb) => cb(reason));
	}

	then(onFulfilled, onRejected) {
		return new MyPromise((resolve, reject) => {
			const handle = () => {
				queueMicrotask(() => {
					try {
						if (this.state === FULFILLED) {
							const result = onFulfilled ? onFulfilled(this.value) : this.value;
							resolve(result);
						} else if (this.state === REJECTED) {
							const result = onRejected ? onRejected(this.value) : this.value;
							reject(result);
						}
					} catch (err) {
						reject(err);
					}
				});
			};

			if (this.state === PENDING) {
				this.onFulfilledCallbacks.push(() => handle());
				this.onRejectedCallbacks.push(() => handle());
			} else {
				handle();
			}
		});
	}

	catch(onRejected) {
		return this.then(null, onRejected);
	}

	finally(callback) {
		return this.then(
			(value) => MyPromise.resolve(callback()).then(() => value),
			(reason) =>
				MyPromise.resolve(callback()).then(() => {
					throw reason;
				})
		);
	}

	// 静态方法
	static resolve(value) {
		if (value instanceof MyPromise) return value;
		return new MyPromise((resolve) => resolve(value));
	}

	static reject(reason) {
		return new MyPromise((_, reject) => reject(reason));
	}
}
```

### 使用迭代的方式实现 flatten 函数

```js
function flatten(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (Array.isArray(arr[i])) {
			arr = arr.concat(arr[i]);
			arr.splice(i, 1);
		}
	}
	return arr;
}

let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]];

console.log(flatten(arr));
```

### reduce()的用法

```js
arr.reduce((accumulator, currentValue, index, array) => {
	// return 新的 accumulator
}, initialValue);
```

- accumulator：累加器，记录上一次返回的结果
- currentValue：当前处理的数组元素
- initialValue：第一次执行时 accumulator 的初始值（建议总是传）

```js
// 数组求和
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10

// 扁平化嵌套数组
const nested = [
	[1, 2],
	[3, 4]
];
const flat = nested.reduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // [1, 2, 3, 4]

// 统计字符串中字符出现次数
const chars = ["a", "b", "a", "c", "b"];
const count = chars.reduce((acc, char) => {
	acc[char] = (acc[char] || 0) + 1;
	return acc;
}, {});
console.log(count); // { a: 2, b: 2, c: 1 }

// 找出最大值
const nums = [5, 10, 3, 8];
const max = nums.reduce((acc, curr) => (curr > acc ? curr : acc), nums[0]);
console.log(max); // 10
```
