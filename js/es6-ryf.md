### js 原始数据类型

`undefined、null、Boolean、String、Numbe、BigInt、Symbol、Object`

### super 用法

class 继承里有二种情况：

- 第一种情况，super 作为函数调用时，代表父类的构造函数。
- 第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

在对象里：

- 指向当前对象的原型对象
- super 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。

```js
// 报错
const obj = {
	foo: super.foo
};

// 报错
const obj = {
	foo: () => super.foo
};

// 报错
const obj = {
	foo: function () {
		return super.foo;
	}
};
const proto = {
	x: "hello",
	foo() {
		console.log(this.x);
	}
};

const obj = {
	x: "world",
	foo() {
		super.foo();
	}
};

Object.setPrototypeOf(obj, proto);

obj.foo(); // "world"
// super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。
```

### 声明变量的六种方法

- `var、let、const、function、import、class`

### JSON.stringify JSON.parse 用法

`JSON.stringify(value, replacer, space)`

1. value（必填）

   要被序列化成 JSON 字符串的值（通常是对象或数组）。

2. replacer（可选）

   决定哪些值被包含进最终的 JSON 字符串。
   数组形式：指定要保留的键名
   函数形式：可以控制每个属性如何被序列化

3. space（可选）

   用于格式化输出的缩进（美化）。
   数字：表示每一级缩进的空格数
   字符串：用作缩进符，如 '\t'

```js
const obj = { name: "Tom", age: 25, password: "123456" };

const replacer = (key, value) => {
	if (key === "password") return undefined;
	// 前面属性的遍历可以修改输出对象的属性值，但最终输出的值关键还是取决于key为空字符串时的返回值，它可以将之前所有的努力都变为徒劳。
	if (key === "")
		return {
			name: "Tom2",
			age: 28
		};
	return value;
};

JSON.stringify(obj, replacer);
// '{"name":"Tom","age":25}'
```

`JSON.parse(text, reviver)`

1. text（必填）
   合法的 JSON 字符串

2. reviver（可选）
   一个函数，可在每个属性被解析时进行“转换”

```js
const jsonStr = '{"name":"Tom","birth":"2000-01-01"}';

JSON.parse(jsonStr, (key, value) => {
	if (key === "birth") {
		return new Date(value);
	}
	// 前面属性的遍历可以修改输出对象的属性值，但最终输出的值关键还是取决于key为空字符串时的返回值，它可以将之前所有的努力都变为徒劳。
	if (key === "") return { name: "tom2", birth: "1111" };
	return value;
});
```

### String 的一些方法

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let s = "Hello world!";
s.startsWith("Hello"); // true
s.endsWith("!"); // true
s.includes("o"); // true
// 这三个方法都支持第二个参数，表示开始搜索的位置。
s.startsWith("world", 6); // true
s.endsWith("Hello", 5); // true
s.includes("Hello", 6); // false
```

- repeat()

```js
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
"na".repeat(0); // ""
"na".repeat(2.9); // "nana"
// 但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
"na".repeat(-0.9); // ""
// 参数NaN等同于 0。
"na".repeat(NaN); // ""
// 如果repeat的参数是字符串，则会先转换成数字。
"na".repeat("na"); // ""
"na".repeat("3"); // "nanana"
```

- padStart()，padEnd()

```js
// padStart()用于头部补全，padEnd()用于尾部补全。
// padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
"x".padStart(5, "ab"); // 'ababx'
"x".padStart(4, "ab"); // 'abax'

"x".padEnd(5, "ab"); // 'xabab'
"x".padEnd(4, "ab"); // 'xaba'
// 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
"xxx".padStart(2, "ab"); // 'xxx'
"xxx".padEnd(2, "ab"); // 'xxx'
// 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。
"abc".padStart(10, "0123456789"); // '0123456abc'

- trimStart()，trimEnd()
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

- replaceAll()
'aabbcc'.replace('b', '_') //  'aa_bcc'
'aabbcc'.replace(/b/g, '_') // 'aa__cc'
'aabbcc'.replaceAll('b', '_') // 'aa__cc'
// replaceAll()的第二个参数replacement是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。
// $&：匹配的字符串。
// $` ：匹配结果前面的文本。
// $'：匹配结果后面的文本。
// $n：匹配成功的第n组内容，n是从1开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
// $$：指代美元符号$。
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&')
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`')
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`)
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$')
// 'a$c'
// replaceAll()的第二个参数replacement除了为字符串，也可以是一个函数，该函数的返回值将替换掉第一个参数searchValue匹配的文本。
'aabbcc'.replaceAll('b', () => '_')
// 'aa__cc'

```

- at()

```js
const str = "hello";
str.at(1); // "e"
str.at(-1); // "o"
```

### Number 的一些方法

- Number.isFinite(), Number.isNaN()
  Number.isFinite()用来检查一个数值是否为有限的（finite），即不是 Infinity。

```js
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite("foo"); // false
Number.isFinite("15"); // false
Number.isFinite(true); // false
// 如果参数类型不是 NaN，Number.isNaN 一律返回 false。
Number.isNaN(NaN); // true
Number.isNaN(15); // false
Number.isNaN("15"); // false
Number.isNaN(true); // false
Number.isNaN(9 / NaN); // true
Number.isNaN("true" / 0); // true
Number.isNaN("true" / "true"); // true

// 如果参数类型不是NaN，Number.isNaN一律返回false。
// 它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
```

- Number.parseInt(), Number.parseFloat()
  ES6 将全局方法 parseInt()和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。

```js
// ES5的写法
parseInt("12.34"); // 12
parseFloat("123.45#"); // 123.45

// ES6的写法
Number.parseInt("12.34"); // 12
Number.parseFloat("123.45#"); // 123.45
```

- Number.isInteger()  
  Number.isInteger()用来判断一个数值是否为整数。

- Number.EPSILON  
  极小的常量 Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差.  
  Number.EPSILON 实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了

- 安全整数和 Number.isSafeInteger()  
   JavaScript 能够准确表示的整数范围在-2^53 到 2^53 之间（不含两个端点），超过这个范围，无法精确表示这个值。  
   ES6 引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 这两个常量，用来表示这个范围的上下限。

  ```js
  Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1;
  // true
  Number.MAX_SAFE_INTEGER === 9007199254740991;
  // true
  Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER;
  // true
  Number.MIN_SAFE_INTEGER === -9007199254740991;
  // true

  Number.isSafeInteger("a"); // false
  Number.isSafeInteger(null); // false
  Number.isSafeInteger(NaN); // false
  Number.isSafeInteger(Infinity); // false
  Number.isSafeInteger(-Infinity); // false

  Number.isSafeInteger(3); // true
  Number.isSafeInteger(1.2); // false
  Number.isSafeInteger(9007199254740990); // true
  Number.isSafeInteger(9007199254740992); // false

  Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
  Number.isSafeInteger(Number.MIN_SAFE_INTEGER); // true
  Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
  Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false
  ```

  - BigInt 数据类型  
    JavaScript 所有数字都保存成 64 位浮点数，这给数值的表示带来了两大限制。一是数值的精度只能到 53 个二进制位（相当于 16 个十进制位），大于这个范围的整数，JavaScript 是无法精确表示，这使得 JavaScript 不适合进行科学和金融方面的精确计算。二是大于或等于 2 的 1024 次方的数值，JavaScript 无法表示，会返回 Infinity。

    ```js
    // 超过 53 个二进制位的数值，无法保持精度
    Math.pow(2, 53) === Math.pow(2, 53) + 1; // true

    // 超过 2 的 1024 次方的数值，无法表示
    Math.pow(2, 1024); // Infinity
    ```

### 函数的一些扩展

#### 作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```js
var x = 1;

function f(x, y = x) {
	console.log(y);
}

f(2); // 2
// 上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

let x = 1;

function f(y = x) {
	let x = 2;
	console.log(y);
}

f(); // 1
```

#### 严格模式

ES2016 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错

#### 箭头函数使用注意点

- 箭头函数没有自己的 this 对象（详见下文）。
- 不可以当作构造函数，也就是说，不可以对箭头函数使用 new 命令，否则会抛出一个错误。
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

### 数组的一些扩展

- Array.from()  
  Array.from()方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

```js
let arrayLike = {
	0: "a",
	1: "b",
	2: "c",
	length: 3
};

// ES5 的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6 的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.from({ length: 3 }); // [ undefined, undefined, undefined ]

Array.from({ length: 2 }, () => "jack"); // ['jack', 'jack']
```

- Array.of()

```js
Array.of(3, 11, 8); // [3,11,8]
Array.of(3); // [3]
Array.of(3).length; // 1
// 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array(); // []
Array(3); // [, , ,]
Array(3, 11, 8); // [3, 11, 8]

// Array.of()基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
Array.of(); // []
Array.of(undefined); // [undefined]
Array.of(1); // [1]
Array.of(1, 2); // [1, 2]
// Array.of()总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
```

- copyWithin()

  - `Array.prototype.copyWithin(target, start = 0, end = this.length)`
  - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
  - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

```js
[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

- find()，findIndex()，findLast()，findLastIndex()

```js
[1, 4, -5, 10, -2].find((n) => n < 0); // -5

[1, 5, 10, 15].find(function (value, index, arr) {
	return value > 9;
}); // 10

[1, 5, 10, 15].findIndex(function (value, index, arr) {
	return value > 9;
}); // 2

// find findIndex这两个方法都可以发现NaN

[NaN]
	.indexOf(NaN)
	// -1

	[NaN].findIndex((y) => Object.is(NaN, y));
// 0

const array = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];

array.findLast((n) => n.value % 2 === 1); // { value: 3 }
array.findLastIndex((n) => n.value % 2 === 1); // 2
```

- fill()

```js
["a", "b", "c"].fill(7);
// [7, 7, 7]

new Array(3).fill(7);
// [7, 7, 7]

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
["a", "b", "c"].fill(7, 1, 2);
// ['a', 7, 'c']
```

- flat()，flatMap()

```js
[1, 2, [3, 4]].flat();
// [1, 2, 3, 4]

[1, 2, [3, [4, 5]]].flat()[
	// [1, 2, 3, [4, 5]]

	(1, 2, [3, [4, 5]])
].flat(2);
// [1, 2, 3, 4, 5]

[1, [2, [3]]].flat(Infinity);
// [1, 2, 3]

[1, 2, , 4, 5].flat();
// [1, 2, 4, 5]

[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]

[1, 2, 3, 4].flatMap((x) => [[x * 2]]);
// [[2], [4], [6], [8]]
```

- at()

  - 长久以来，JavaScript 不支持数组的负索引，如果要引用数组的最后一个成员，不能写成 arr[-1]，只能使用 arr[arr.length - 1]。

```js
const arr = [5, 12, 8, 130, 44];
arr.at(2); // 8
arr.at(-2); // 130

const sentence = "This is a sample sentence";

sentence.at(0); // 'T'
sentence.at(-1); // 'e'

sentence.at(-100); // undefined
sentence.at(100); // undefined
```

- toReversed()，toSorted()，toSpliced()，with()

  - 对数组进行操作时，不改变原数组，而返回一个原数组的拷贝
  - toReversed()对应 reverse()，用来颠倒数组成员的位置。
  - toSorted()对应 sort()，用来对数组成员排序。
  - toSpliced()对应 splice()，用来在指定位置，删除指定数量的成员，并插入新成员。
  - with(index, value)对应 splice(index, 1, value)，用来将指定位置的成员替换为新的值。

- 数组的空位

  ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

  - forEach(), filter(), reduce(), every() 和 some()都会跳过空位。
  - map()会跳过空位，但会保留这个值
  - join()和 toString()会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串。

ES6 则是明确将空位转为 undefined。

```js
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
[...['a',,'b']]
// [ "a", undefined, "b" ]
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
new Array(3).fill('a') // ["a","a","a"]
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
```

### 运算符的一些扩展

#### 指数运算符

```js
2 ** 2; // 4
2 ** 3; // 8

// 相当于 2 ** (3 ** 2)
2 ** (3 ** 2);
// 512

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```

#### 链判断运算符

```js
const firstName = message?.body?.user?.firstName || "default";
const fooValue = myForm.querySelector("input[name=foo]")?.value;
// 上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。

// 下面是判断对象方法是否存在，如果存在就立即执行的例子。
iterator.return?.();

a?.b;
// 等同于
a == null ? undefined : a.b;

a?.[x];
// 等同于
a == null ? undefined : a[x];

a?.b();
// 等同于
a == null ? undefined : a.b();

a?.();
// 等同于
a == null ? undefined : a();
```

#### Null 判断运算符

```js
const headerText = response.settings.headerText ?? "Hello, world!";
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;

const animationDuration = response.settings?.animationDuration ?? 300;
```

#### 逻辑赋值运算符

```js
// 或赋值运算符
x ||= y;
// 等同于
x = x || y;

// 与赋值运算符
x &&= y;
// 等同于
x = x && y;

// Null 赋值运算符
x ??= y;
// 等同于
x = x ?? y;
```

### Symbol 的一些特性

#### Symbol.for()，Symbol.keyFor()

```js
Symbol.for("bar") === Symbol.for("bar");
// true

Symbol("bar") === Symbol("bar");
// false

// 由于Symbol()写法没有登记机制，所以每次调用都会返回一个不同的值。

// Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的key
let s1 = Symbol.for("foo");
Symbol.keyFor(s1); // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2); // undefined
// 上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined。

// 注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
function foo() {
	return Symbol.for("bar");
}

const x = foo();
const y = Symbol.for("bar");
console.log(x === y); // true
```

### Set Map

#### Set 类似于数组，但是成员的值都是唯一的，没有重复的值

```js
const set = new Set([1, 2, 3, 4, 4]);
[...set];
```

Set 实例的属性和方法

- Set.prototype.constructor：构造函数，默认就是 Set 函数。
- Set.prototype.size：返回 Set 实例的成员总数。

- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。

Set 结构集合运算方法

- Set.prototype.intersection(other)：交集
- Set.prototype.union(other)：并集
- Set.prototype.difference(other)：差集
- Set.prototype.symmetricDifference(other)：对称差集
- Set.prototype.isSubsetOf(other)：判断是否为子集
- Set.prototype.isSupersetOf(other)：判断是否为超集
- Set.prototype.isDisjointFrom(other)：判断是否不相交

#### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员，返回 WeakSet 结构本身。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员，清除成功返回 true，如果在 WeakSet 中找不到该成员或该成员不是对象，返回 false。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

#### Map

本质上是键值对的集合（Hash 结构）但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

实例的属性和操作方法

- size 属性
- Map.prototype.set(key, value)
- Map.prototype.get(key)
- Map.prototype.has(key)
- Map.prototype.delete(key)
- Map.prototype.clear()

#### WeakMap

WeakMap 结构与 Map 结构类似,但 WeakMap 只接受对象（null 除外）和 Symbol 值作为键名，不接受其他类型的值作为键名。其次，WeakMap 的键名所指向的对象，不计入垃圾回收机制。它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内

#### WeakRef

WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

#### FinalizationRegistry

ES2021 引入了清理器注册表功能 FinalizationRegistry，用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数

```js
const registry = new FinalizationRegistry((heldValue) => {
	// ....
});
registry.register(theObject, "some value");

// 上面示例中，theObject就是所要观察的目标对象，一旦该对象被垃圾回收机制清除，注册表就会在清除完成后，调用早前注册的回调函数，并将some value作为参数（前面的heldValue）传入回调函数。

// 注意，注册表不对目标对象theObject构成强引用，属于弱引用。因为强引用的话，原始对象就不会被垃圾回收机制清除，这就失去使用注册表的意义了。
// 回调函数的参数heldValue可以是任意类型的值，字符串、数值、布尔值、对象，甚至可以是undefined。
// 最后，如果以后还想取消已经注册的回调函数，则要向register()传入第三个参数，作为标记值。这个标记值必须是对象，一般都用原始对象。接着，再使用注册表实例对象的unregister()方法取消注册。

registry.register(theObject, "some value", theObject);
// ...其他操作...
registry.unregister(theObject);

// 上面代码中，register()方法的第三个参数就是标记值theObject。取消回调函数时，要使用unregister()方法，并将标记值作为该方法的参数。这里register()方法对第三个参数的引用，也属于弱引用。如果没有这个参数，则回调函数无法取消。

// 由于回调函数被调用以后，就不再存在于注册表之中了，所以执行unregister()应该是在回调函数还没被调用之前
```

### Proxy

Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 支持的拦截操作一览，一共 13 种:

- get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值。
- has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值。
- deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值。
- ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

### Reflect

Reflect 对象的设计目的有这样几个:

- 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。现阶段，某些方法同时在 Object 和 Reflect 对象上部署，未来的新方法将只部署在 Reflect 对象上。也就是说，从 Reflect 对象上可以拿到语言内部的方法。
- 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false。
- 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为。
- Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。

Reflect 对象一共有 13 个静态方法：

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

### Promise 对象

Promise 的含义： 异步编程的一种解决方案

Promise 对象有以下两个特点：

- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。

- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。、

缺点：首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

#### Promise.prototype.then()

then 方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法。

#### Promise.prototype.finally()

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

#### Promise.all()

`const p = Promise.all([p1, p2, p3]);`

面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p 的状态由 p1、p2、p3 决定，分成两种情况。

（1）只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

（2）只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

#### Promise.race()

`const p = Promise.race([p1, p2, p3]);`

上面代码中，只要 p1、p2、p3 之中有一个实例率先改变状态，p 的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给 p 的回调函数。

Promise.race()方法的参数与 Promise.all()方法一样，如果不是 Promise 实例，就会先调用下面讲到的 Promise.resolve()方法，将参数转为 Promise 实例，再进一步处理。

#### Promise.allSettled()

有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。

Promise.all()方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是
fulfilled 还是 rejected），返回的 Promise 对象才会发生状态变更。

```js
const urls = [url_1, url_2, url_3];
const requests = urls.map((x) => fetch(x));

try {
	await Promise.all(requests);
	console.log("所有请求都成功。");
} catch {
	console.log("至少一个请求失败，其他请求可能还没结束。");
}
```

```js
const promises = [fetch("/api-1"), fetch("/api-2"), fetch("/api-3")];

await Promise.allSettled(promises);
removeLoadingIndicator();
// 上面示例中，数组promises包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），removeLoadingIndicator()才会执行。
```

#### Promise.any()

```js
Promise.any([
	fetch("https://v8.dev/").then(() => "home"),
	fetch("https://v8.dev/blog").then(() => "blog"),
	fetch("https://v8.dev/docs").then(() => "docs")
])
	.then((first) => {
		// 只要有一个 fetch() 请求成功
		console.log(first);
	})
	.catch((error) => {
		// 所有三个 fetch() 全部请求失败
		console.log(error);
	});
// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
// Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。
```

#### Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

```js
const jsPromise = Promise.resolve($.ajax("/whatever.json"));

Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

Promise.resolve()方法的参数分成四种情况:

（1）参数是一个 Promise 实例

如果参数是 Promise 实例，那么 Promise.resolve 将不做任何修改、原封不动地返回这个实例。

（2）参数是一个 thenable 对象

thenable 对象指的是具有 then 方法的对象，比如下面这个对象。

Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then()方法。

```js
let thenable = {
	then: function (resolve, reject) {
		resolve(42);
	}
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
	console.log(value); // 42
});
```

（3）参数不是具有 then()方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有 then()方法的对象，则 Promise.resolve()方法返回一个新的 Promise 对象，状态为 resolved。

```js
const p = Promise.resolve("Hello");

p.then(function (s) {
	console.log(s);
});
// Hello

// 上面代码生成一个新的 Promise 对象的实例p。由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。Promise.resolve()方法的参数，会同时传给回调函数。
```

（4）不带有任何参数

Promise.resolve()方法允许调用时不带参数，直接返回一个 resolved 状态的 Promise 对象。

#### Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

### Iterator 和 for...of 循环

Iterator 的作用有三个：

- 一是为各种数据结构，提供一个统一的、简便的访问接口；
- 二是使得数据结构的成员能够按某种次序排列；
- 三是 ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费。

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的 next 方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的 next 方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的 next 方法，直到它指向数据结构的结束位置。

yield\* :

```js
let generator = function* () {
	yield 1;
	yield* [2, 3, 4];
	yield 5;
};

var iterator = generator();

iterator.next(); // { value: 1, done: false }
iterator.next(); // { value: 2, done: false }
iterator.next(); // { value: 3, done: false }
iterator.next(); // { value: 4, done: false }
iterator.next(); // { value: 5, done: false }
iterator.next(); // { value: undefined, done: true }
```

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”

（iterable）。Symbol.iterator 属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名 Symbol.iterator，它是一个表达式，返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

```js
const obj = {
	[Symbol.iterator]: function () {
		return {
			next: function () {
				return {
					value: 1,
					done: true
				};
			}
		};
	}
};
// 上面代码中，对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。
```

ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被 for...of 循环遍历。原因在于，这些数据结构原生部署了 Symbol.iterator 属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了 Symbol.iterator 属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

### Generator 函数的语法

Generator 函数是 ES6 提供的一种异步编程解决方案.

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

#### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield 表达式就是暂停标志。

遍历器对象的 next 方法的运行逻辑如下。

（1）遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值。

（2）下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。

（3）如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值。

（4）如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined。

```js
function* gen() {
	yield 123 + 456;
}
// 上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。
function* f() {
	console.log("执行了！");
}

var generator = f();

setTimeout(function () {
	generator.next();
}, 2000);
// 上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个 Generator 函数，就变成只有调用next方法时，函数f才会执行。
```

另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

#### next 方法的参数

yield 表达式本身没有返回值，或者说总是返回 undefined。next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。

```js
function* f() {
	for (var i = 0; true; i++) {
		var reset = yield i;
		if (reset) {
			i = -1;
		}
	}
}

var g = f();

g.next(); // { value: 0, done: false }
g.next(); // { value: 1, done: false }
g.next(true); // { value: 0, done: false }
```

```js
function* foo(x) {
	var y = 2 * (yield x + 1);
	var z = yield y / 3;
	return x + y + z;
}

var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:true}

var b = foo(5);
b.next(); // { value:6, done:false }
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }

// 上面代码中，第二次运行next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN），除以 3 以后还是NaN，因此返回对象的value属性也等于NaN。第三次运行next方法的时候不带参数，所以z等于undefined，返回对象的value属性等于5 + NaN + undefined，即NaN。
```

#### for...of 循环

for...of 循环可以自动遍历 Generator 函数运行时生成的 Iterator 对象，且此时不再需要调用 next 方法。

```js
function* foo() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	return 6;
}

for (let v of foo()) {
	console.log(v);
}
// 1 2 3 4 5
```

#### Generator.prototype.throw()

Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获。

```js
var g = function* () {
	try {
		yield;
	} catch (e) {
		console.log("内部捕获", e);
	}
};

var i = g();
i.next();

try {
	i.throw("a");
	i.throw("b");
} catch (e) {
	console.log("外部捕获", e);
}
// 内部捕获 a
// 外部捕获 b

// 上面代码中，遍历器对象i连续抛出两个错误。第一个错误被 Generator 函数体内的catch语句捕获。i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了，所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
```

throw 方法可以接受一个参数，该参数会被 catch 语句接收，建议抛出 Error 对象的实例。

```js
var g = function* () {
	try {
		yield;
	} catch (e) {
		console.log(e);
	}
};

var i = g();
i.next();
i.throw(new Error("出错了！"));
// Error: 出错了！(…)
```

注意，不要混淆遍历器对象的 throw 方法和全局的 throw 命令。上面代码的错误，是用遍历器对象的 throw 方法抛出的，而不是用 throw 命令抛出的。后者只能被函数体外的 catch 语句捕获。

```js
var g = function* () {
	while (true) {
		try {
			yield;
		} catch (e) {
			if (e != "a") throw e;
			console.log("内部捕获", e);
		}
	}
};

var i = g();
i.next();

try {
	throw new Error("a");
	throw new Error("b");
} catch (e) {
	console.log("外部捕获", e);
}
// 外部捕获 [Error: a]

// 上面代码之所以只捕获了a，是因为函数体外的catch语句块，捕获了抛出的a错误以后，就不会再继续try代码块里面剩余的语句了。
```

如果 Generator 函数内部没有部署 try...catch 代码块，那么 throw 方法抛出的错误，将被外部 try...catch 代码块捕获。

```js
var g = function* () {
	while (true) {
		yield;
		console.log("内部捕获", e);
	}
};

var i = g();
i.next();

try {
	i.throw("a");
	i.throw("b");
} catch (e) {
	console.log("外部捕获", e);
}
// 外部捕获 a

// 上面代码中，Generator 函数g内部没有部署try...catch代码块，所以抛出的错误直接被外部catch代码块捕获。
```

如果 Generator 函数内部和外部，都没有部署 try...catch 代码块，那么程序将报错，直接中断执行。

```js
var gen = function* gen() {
	yield console.log("hello");
	yield console.log("world");
};

var g = gen();
g.next();
g.throw();
// hello
// Uncaught undefined

// 上面代码中，g.throw抛出错误以后，没有任何try...catch代码块可以捕获这个错误，导致程序报错，中断执行。
```

throw 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 next 方法。

```js
function* gen() {
	try {
		yield 1;
	} catch (e) {
		console.log("内部捕获");
	}
}

var g = gen();
g.throw(1);
// Uncaught 1

// 上面代码中，g.throw(1)执行时，next方法一次都没有执行过。这时，抛出的错误不会被内部捕获，而是直接在外部抛出，导致程序出错。这种行为其实很好理解，因为第一次执行next方法，等同于启动执行 Generator 函数的内部代码，否则 Generator 函数还没有开始执行，这时throw方法抛错只可能抛出在函数外部。
```

throw 方法被内部捕获以后，会附带执行到下一条 yield 表达式，这种情况下等同于执行一次 next 方法。

```js
var gen = function* gen() {
	try {
		yield 1;
	} catch (e) {
		yield 2;
	}
	yield 3;
};

var g = gen();
g.next(); // { value:1, done:false }
g.throw(); // { value:2, done:false }
g.next(); // { value:3, done:false }
g.next(); // { value:undefined, done:true }

// 上面代码中，g.throw方法被内部捕获以后，等同于执行了一次next方法，所以返回{ value:2, done:false }。另外，也可以看到，只要 Generator 函数内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误，不影响下一次遍历。
```

另外，throw 命令与 g.throw 方法是无关的，两者互不影响。

```js
var gen = function* gen() {
	yield console.log("hello");
	yield console.log("world");
};

var g = gen();
g.next();

try {
	throw new Error();
} catch (e) {
	g.next();
}
// hello
// world

// 上面代码中，throw命令抛出的错误不会影响到遍历器的状态，所以两次执行next方法，都进行了正确的操作。
```

这种函数体内捕获错误的机制，大大方便了对错误的处理。多个 yield 表达式，可以只用一个 try...catch 代码块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次 catch 语句就可以了。

Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的 catch 捕获。

```js
function* foo() {
	var x = yield 3;
	var y = x.toUpperCase();
	yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
	it.next(42);
} catch (err) {
	console.log(err);
}
// 上面代码中，第二个next方法向函数体内传入一个参数 42，数值是没有toUpperCase方法的，所以会抛出一个 TypeError 错误，被函数体外的catch捕获。
```

一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用 next 方法，将返回一个 value 属性等于 undefined、done 属性等于 true 的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

```js
function* g() {
	yield 1;
	console.log("throwing an exception");
	throw new Error("generator broke!");
	yield 2;
	yield 3;
}

function log(generator) {
	var v;
	console.log("starting generator");
	try {
		v = generator.next();
		console.log("第一次运行next方法", v);
	} catch (err) {
		console.log("捕捉错误", v);
	}
	try {
		v = generator.next();
		console.log("第二次运行next方法", v);
	} catch (err) {
		console.log("捕捉错误", v);
	}
	try {
		v = generator.next();
		console.log("第三次运行next方法", v);
	} catch (err) {
		console.log("捕捉错误", v);
	}
	console.log("caller done");
}

log(g());
// starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done

// 上面代码一共三次运行next方法，第二次运行的时候会抛出错误，然后第三次运行的时候，Generator 函数就已经结束了，不再执行下去了。
```

#### Generator.prototype.return()

Generator 函数返回的遍历器对象，还有一个 return()方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() {
	yield 1;
	yield 2;
	yield 3;
}

var g = gen();

g.next(); // { value: 1, done: false }
g.return("foo"); // { value: "foo", done: true }
g.next(); // { value: undefined, done: true }
```

如果 return()方法调用时，不提供参数，则返回值的 value 属性为 undefined。

```js
function* gen() {
	yield 1;
	yield 2;
	yield 3;
}

var g = gen();

g.next(); // { value: 1, done: false }
g.return(); // { value: undefined, done: true }
```

如果 Generator 函数内部有 try...finally 代码块，且正在执行 try 代码块，那么 return()方法会导致立刻进入 finally 代码块，执行完以后，整个函数才会结束。

```js
function* numbers() {
	yield 1;
	try {
		yield 2;
		yield 3;
	} finally {
		yield 4;
		yield 5;
	}
	yield 6;
}
var g = numbers();
g.next(); // { value: 1, done: false }
g.next(); // { value: 2, done: false }
g.return(7); // { value: 4, done: false }
g.next(); // { value: 5, done: false }
g.next(); // { value: 7, done: true }

// 上面代码中，调用return()方法后，就开始执行finally代码块，不执行try里面剩下的代码了，然后等到finally代码块执行完，再返回return()方法指定的返回值。
```

#### next()、throw()、return() 的共同点

next()、throw()、return()这三个方法本质上是同一件事，可以放在一起理解。它们的作用都是让 Generator 函数恢复执行，并且使用不同的语句替换 yield 表达式。

next()是将 yield 表达式替换成一个值。

```js
const g = function* (x, y) {
	let result = yield x + y;
	return result;
};

const gen = g(1, 2);
gen.next(); // Object {value: 3, done: false}

gen.next(1); // Object {value: 1, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = 1;

// 上面代码中，第二个next(1)方法就相当于将yield表达式替换成一个值1。如果next方法没有参数，就相当于替换成undefined。
```

throw()是将 yield 表达式替换成一个 throw 语句。

```js
gen.throw(new Error("出错了")); // Uncaught Error: 出错了
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));
```

return()是将 yield 表达式替换成一个 return 语句。

```js
gen.return(2); // Object {value: 2, done: true}
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;
```

#### yield\* 表达式

如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。

```js
function* foo() {
	yield "a";
	yield "b";
}

function* bar() {
	yield "x";
	// 手动遍历 foo()
	for (let i of foo()) {
		console.log(i);
	}
	yield "y";
}

for (let v of bar()) {
	console.log(v);
}
// x
// a
// b
// y

// 上面代码中，foo和bar都是 Generator 函数，在bar里面调用foo，就需要手动遍历foo。如果有多个 Generator 函数嵌套，写起来就非常麻烦。

// ES6 提供了yield*表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。
function* bar() {
	yield "x";
	yield* foo();
	yield "y";
}

// 等同于
function* bar() {
	yield "x";
	yield "a";
	yield "b";
	yield "y";
}

// 等同于
function* bar() {
	yield "x";
	for (let v of foo()) {
		yield v;
	}
	yield "y";
}

for (let v of bar()) {
	console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

```js
function* inner() {
	yield "hello!";
}

function* outer1() {
	yield "open";
	yield inner();
	yield "close";
}

var gen = outer1();
gen.next().value; // "open"
gen.next().value; // 返回一个遍历器对象
gen.next().value; // "close"

function* outer2() {
	yield "open";
	yield* inner();
	yield "close";
}

var gen = outer2();
gen.next().value; // "open"
gen.next().value; // "hello!"
gen.next().value; // "close"

// 上面例子中，outer2使用了yield*，outer1没使用。结果就是，outer1返回一个遍历器对象，outer2返回该遍历器对象的内部值。
```

#### 作为对象属性的 Generator 函数

```js
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
// 等价于
let obj = {
  myGeneratorMethod: function* () {
    // ···
  }
};
```

#### Generator 函数的 this

Generator 函数总是返回一个遍历器，ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的 prototype 对象上的方法。

```js
function* g() {}

g.prototype.hello = function () {
	return "hi!";
};

let obj = g();

obj instanceof g; // true
obj.hello(); // 'hi!'
```

上面代码表明，Generator 函数 g 返回的遍历器 obj，是 g 的实例，而且继承了 g.prototype。但是，如果把 g 当作普通的构造函数，并不会生效，因为 g 返回的总是遍历器对象，而不是 this 对象。

```js
function* g() {
	this.a = 11;
}

let obj = g();
obj.next();
obj.a; // undefined

// 上面代码中，Generator 函数g在this对象上面添加了一个属性a，但是obj对象拿不到这个属性。
```

Generator 函数也不能跟 new 命令一起用，会报错。

```js
unction* F() {
  yield this.x = 2;
  yield this.y = 3;
}

new F()
// TypeError: F is not a constructor
```

下面是一个变通方法。首先，生成一个空对象，使用 call 方法绑定 Generator 函数内部的 this

```js
function* F() {
	this.a = 1;
	yield (this.b = 2);
	yield (this.c = 3);
}
var obj = {};
var f = F.call(obj);

f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}

obj.a; // 1
obj.b; // 2
obj.c; // 3
```

上面代码中，首先是 F 内部的 this 对象绑定 obj 对象，然后调用它，返回一个 Iterator 对象。这个对象执行三次 next 方法（因为 F 内部有两个 yield 表达式），完成 F 内部所有代码的运行。这时，所有内部属性都绑定在 obj 对象上了，因此 obj 对象也就成了 F 的实例。  
上面代码中，执行的是遍历器对象 f，但是生成的对象实例是 obj，有没有办法将这两个对象统一呢？

一个办法就是将 obj 换成 F.prototype

```js
function* F() {
	this.a = 1;
	yield (this.b = 2);
	yield (this.c = 3);
}
var f = F.call(F.prototype);

f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}

f.a; // 1
f.b; // 2
f.c; // 3
```

再将 F 改成构造函数，就可以对它执行 new 命令了。

```js
function* gen() {
	this.a = 1;
	yield (this.b = 2);
	yield (this.c = 3);
}

function F() {
	return gen.call(gen.prototype);
}

var f = new F();

f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}

f.a; // 1
f.b; // 2
f.c; // 3
```

#### Generator 与协程

协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

（1）协程与子例程的差异

传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为协程。

从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。

（2）协程与普通线程的差异

不难看出，协程适合用于多任务运行的环境。在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

由于 JavaScript 是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈。这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。

**Generator 函数是 ES6 对协程的实现，但属于不完全实现。Generator 函数被称为“半协程”（semi-coroutine）**，意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

如果将 Generator 函数当作协程，完全可以将多个需要互相协作的任务写成 Generator 函数，它们之间使用 yield 表达式交换控制权。

#### Generator 与上下文

JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

Generator 函数不是这样，它执行产生的上下文环境，一旦遇到 yield 命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行 next 命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

```js
function* gen() {
	yield 1;
	return 2;
}

let g = gen();

console.log(g.next().value, g.next().value);
```

上面代码中，第一次执行 g.next()时，Generator 函数 gen 的上下文会加入堆栈，即开始运行 gen 内部的代码。等遇到 yield 1 时，gen 上下文退出堆栈，内部状态冻结。第二次执行 g.next()时，gen 上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

### async 函数

async 函数是什么？一句话，它就是 Generator 函数的语法糖.

async 函数对 Generator 函数的改进，体现在以下四点。

- 内置执行器
- 更好的语义
- 更广的适用性
- 返回值是 Promis

#### 返回 Promise 对象

async 函数返回一个 Promise 对象。

async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数。

#### await 命令

正常情况下，await 命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```js
async function f() {
	// 等同于
	// return 123;
	return await 123;
}

f().then((v) => console.log(v));
// 123
```

另一种情况是，await 命令后面是一个 thenable 对象（即定义了 then 方法的对象），那么 await 会将其等同于 Promise 对象。

```js
class Sleep {
	constructor(timeout) {
		this.timeout = timeout;
	}
	then(resolve, reject) {
		const startTime = Date.now();
		setTimeout(() => resolve(Date.now() - startTime), this.timeout);
	}
}

(async () => {
	const sleepTime = await new Sleep(1000);
	console.log(sleepTime);
})();
// 1000
```

await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到。

```js
async function f() {
	await Promise.reject("出错了");
}

f()
	.then((v) => console.log(v))
	.catch((e) => console.log(e));
// 出错了
// 注意，上面代码中，await 语句前面没有 return，但是 reject 方法的参数依然传入了 catch 方法的回调函数。这里如果在 await 前面加上 return，效果是一样的。
```

任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行。

```js
async function f() {
	await Promise.reject("出错了");
	await Promise.resolve("hello world"); // 不会执行
}
// 上面代码中，第二个await语句是不会执行的，因为第一个await语句状态变成了reject。
```

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个 await 放在 try...catch 结构里面，这样不管这个异步操作是否成功，第二个 await 都会执行。

```js
async function f() {
	try {
		await Promise.reject("出错了");
	} catch (e) {}
	return await Promise.resolve("hello world");
}

f().then((v) => console.log(v));
// hello world
```

另一种方法是 await 后面的 Promise 对象再跟一个 catch 方法，处理前面可能出现的错误。

```js
async function f() {
	await Promise.reject("出错了").catch((e) => console.log(e));
	return await Promise.resolve("hello world");
}

f().then((v) => console.log(v));
// 出错了
// hello world
```

#### async 函数的实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
	// ...
}

// 等同于

function fn(args) {
	return spawn(function* () {
		// ...
	});
}
```

所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。

下面给出 spawn 函数的实现，基本就是前文自动执行器的翻版。

```js
function spawn(genF) {
	return new Promise(function (resolve, reject) {
		const gen = genF();
		function step(nextF) {
			let next;
			try {
				next = nextF();
			} catch (e) {
				return reject(e);
			}
			if (next.done) {
				return resolve(next.value);
			}
			Promise.resolve(next.value).then(
				function (v) {
					step(function () {
						return gen.next(v);
					});
				},
				function (e) {
					step(function () {
						return gen.throw(e);
					});
				}
			);
		}
		step(function () {
			return gen.next(undefined);
		});
	});
}
```

### class 基本语法

```js
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return "(" + this.x + ", " + this.y + ")";
	}
}
```

上面代码定义了一个“类”，可以看到里面有一个 constructor()方法，这就是构造方法，而 this 关键字则代表实例对象。

```js
class Point {
	constructor() {
		// ...
	}

	toString() {
		// ...
	}

	toValue() {
		// ...
	}
}

// 等同于

Point.prototype = {
	constructor() {},
	toString() {},
	toValue() {}
};
```

上面代码中，constructor()、toString()、toValue()这三个方法，其实都是定义在 Point.prototype 上面。

因此，在类的实例上面调用方法，其实就是调用原型上的方法。

prototype 对象的 constructor 属性，直接指向“类”的本身，这与 ES5 的行为是一致的。

`Point.prototype.constructor === Point // true`

类的内部所有定义的方法，都是不可枚举的

#### constructor() 方法

constructor()方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor()方法，如果没有显式定义，一个空的 constructor()方法会被默认添加。

#### 类的实例

生成类的实例的写法，也是使用 new 命令。前面说过，如果忘记加上 new，像函数那样调用 Class()，将会报错

#### 实例属性的新写法

```js
class IncreasingCounter {
	constructor() {
		this._count = 0;
	}
	get value() {
		console.log("Getting the current value!");
		return this._count;
	}
	increment() {
		this._count++;
	}
}

class IncreasingCounter {
	_count = 0;
	get value() {
		console.log("Getting the current value!");
		return this._count;
	}
	increment() {
		this._count++;
	}
}

// 注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。
```

#### 取值函数（getter）和存值函数（setter）

```js
class MyClass {
	constructor() {
		// ...
	}
	get prop() {
		return "getter";
	}
	set prop(value) {
		console.log("setter: " + value);
	}
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop;
// 'getter'
```

#### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

```js
class Foo {
	static classMethod() {
		return "hello";
	}
}

Foo.classMethod(); // 'hello'

var foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function
```

注意，如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。

```js
class Foo {
	static bar() {
		this.baz();
	}
	static baz() {
		console.log("hello");
	}
	baz() {
		console.log("world");
	}
}

Foo.bar(); // hello
```

父类的静态方法，可以被子类继承。

静态方法也是可以从 super 对象上调用的。

#### 静态属性

静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性。

```js
class Foo {}

Foo.prop = 1;
Foo.prop; // 1
```

现在有一个提案提供了类的静态属性，写法是在实例属性的前面，加上 static 关键字。

```js
// 老写法
class Foo {
	// ...
}
Foo.prop = 1;

// 新写法
class Foo {
	static prop = 1;
}
```

#### 私有方法和私有属性

私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但早期的 ES6 不提供，只能通过变通方法模拟实现。

一种做法是在命名上加以区别。

另一种方法就是索性将私有方法移出类，因为类内部的所有方法都是对外可见的。

还有一种方法是利用 Symbol 值的唯一性，将私有方法的名字命名为一个 Symbol 值。

```js
class Widget {
	// 公有方法
	foo(baz) {
		this._bar(baz);
	}

	// 私有方法
	_bar(baz) {
		return (this.snaf = baz);
	}

	// ...
}
class Widget {
	foo(baz) {
		bar.call(this, baz);
	}

	// ...
}

function bar(baz) {
	return (this.snaf = baz);
}

const bar = Symbol("bar");
const snaf = Symbol("snaf");

// 一般情况下无法获取到它们，因此达到了私有方法和私有属性的效果。但是也不是绝对不行，Reflect.ownKeys()依然可以拿到它们
export default class myClass {
	// 公有方法
	foo(baz) {
		this[bar](baz);
	}

	// 私有方法
	[bar](baz) {
		return (this[snaf] = baz);
	}

	// ...
}
```

#### 私有属性的正式写法

ES2022 正式为 class 添加了私有属性，方法是在属性名之前使用#表示。

```js
class IncreasingCounter {
	#count = 0;
	get value() {
		console.log("Getting the current value!");
		return this.#count;
	}
	increment() {
		this.#count++;
	}
}

const counter = new IncreasingCounter();
counter.#count; // 报错
counter.#count = 42; // 报错
```

私有属性和私有方法前面，也可以加上 static 关键字，表示这是一个静态的私有属性或私有方法。

```js
class FakeMath {
	static PI = 22 / 7;
	static #totallyRandomNumber = 4;

	static #computeRandomNumber() {
		return FakeMath.#totallyRandomNumber;
	}

	static random() {
		console.log("I heard you like random numbers…");
		return FakeMath.#computeRandomNumber();
	}
}

FakeMath.PI; // 3.142857142857143
FakeMath.random();
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber; // 报错
FakeMath.#computeRandomNumber(); // 报错
```

这种写法不仅可以写私有属性，还可以用来写私有方法。

```js
class Foo {
	#a;
	#b;
	constructor(a, b) {
		this.#a = a;
		this.#b = b;
	}
	#sum() {
		return this.#a + this.#b;
	}
	printSum() {
		console.log(this.#sum());
	}
}
```

#### 静态块

静态属性的一个问题是，如果它有初始化逻辑，这个逻辑要么写在类的外部，要么写在 constructor()方法里面。

```js
class C {
  static x = 234;
  static y;
  static z;
}

try {
  const obj = doSomethingWith(C.x);
  C.y = obj.y
  C.z = obj.z;
} catch {
  C.y = ...;
  C.z = ...;
}
```

ES2022 引入了静态块（static block），允许在类的内部设置一个代码块，在类生成时运行且只运行一次，主要作用是对静态属性进行初始化。以后，新建类的实例时，这个块就不运行了。

```js
class C {
  static x = ...;
  static y;
  static z;

  static {
    try {
      const obj = doSomethingWith(this.x);
      this.y = obj.y;
      this.z = obj.z;
    }
    catch {
      this.y = ...;
      this.z = ...;
    }
  }
}
// 上面代码中，类的内部有一个 static 代码块，这就是静态块。它的好处是将静态属性y和z的初始化逻辑，写入了类的内部，而且只运行一次。
```

每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性。另外，静态块的内部不能有 return 语句。

静态块内部可以使用类名或 this，指代当前类。

```js
class C {
	static x = 1;
	static {
		this.x; // 1
		// 或者
		C.x; // 1
	}
}
// 上面示例中，this.x和C.x都能获取静态属性x。
```

除了静态属性的初始化，静态块还有一个作用，就是将私有属性与类的外部代码分享。

```js
let getX;

export class C {
	#x = 1;
	static {
		getX = (obj) => obj.#x;
	}
}

console.log(getX(new C())); // 1
// 上面示例中，#x是类的私有属性，如果类外部的getX()方法希望获取这个属性，以前是要写在类的constructor()方法里面，这样的话，每次新建实例都会定义一次getX()方法。现在可以写在静态块里面，这样的话，只在类生成时定义一次。
```

#### 类的注意点

- 严格模式

类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。

- 不存在提升

类不存在变量提升（hoist），这一点与 ES5 完全不同。

#### this 的指向

类的方法内部如果含有 this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

```js
class Logger {
	printName(name = "there") {
		this.print(`Hello ${name}`);
	}

	print(text) {
		console.log(text);
	}
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```

#### new.target 属性

new 是从构造函数生成实例对象的命令。ES6 为 new 命令引入了一个 new.target 属性，该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数。如果构造函数不是通过 new 命令或 Reflect.construct()调用的，new.target 会返回 undefined，因此这个属性可以用来确定构造函数是怎么调用的。

```js
function Person(name) {
	if (new.target !== undefined) {
		this.name = name;
	} else {
		throw new Error("必须使用 new 命令生成实例");
	}
}

// 另一种写法
function Person(name) {
	if (new.target === Person) {
		this.name = name;
	} else {
		throw new Error("必须使用 new 命令生成实例");
	}
}

var person = new Person("张三"); // 正确
var notAPerson = Person.call(person, "张三"); // 报错
```

Class 内部调用 new.target，返回当前 Class。

```js
class Rectangle {
	constructor(length, width) {
		console.log(new.target === Rectangle);
		this.length = length;
		this.width = width;
	}
}

var obj = new Rectangle(3, 4); // 输出 true
```

需要注意的是，子类继承父类时，new.target 会返回子类。

```js
class Rectangle {
	constructor(length, width) {
		console.log(new.target === Rectangle);
		// ...
	}
}

class Square extends Rectangle {
	constructor(length, width) {
		super(length, width);
	}
}

var obj = new Square(3); // 输出 false
```

### Class 的继承

```js
class Point {
	/* ... */
}

class ColorPoint extends Point {
	constructor(x, y, color) {
		super(x, y); // 调用父类的constructor(x, y)
		this.color = color;
	}

	toString() {
		return this.color + " " + super.toString(); // 调用父类的toString()
	}
}
// 上面示例中，constructor()方法和toString()方法内部，都出现了super关键字。super在这里表示父类的构造函数，用来新建一个父类的实例对象。
```

ES6 规定，子类必须在 constructor()方法中调用 super()，否则就会报错。这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用 super()方法，子类就得不到自己的 this 对象。

```js
class Point {
	/* ... */
}

class ColorPoint extends Point {
	constructor() {}
}

let cp = new ColorPoint(); // ReferenceError
```

另一个需要注意的地方是，在子类的构造函数中，只有调用 super()之后，才可以使用 this 关键字，否则会报错。这是因为子类实例的构建，必须先完成父类的继承，只有 super()方法才能让子类实例继承父类。

如果子类没有定义 constructor()方法，这个方法会默认添加，并且里面会调用 super()。也就是说，不管有没有显式定义，任何一个子类都有 constructor()方法。

```js
class ColorPoint extends Point {}

// 等同于
class ColorPoint extends Point {
	constructor(...args) {
		super(...args);
	}
}
```

#### 私有属性和私有方法的继承

父类所有的属性和方法，都会被子类继承，除了私有的属性和方法。

子类无法继承父类的私有属性，或者说，私有属性只能在定义它的 class 里面使用。

```js
class Foo {
	#p = 1;
	#m() {
		console.log("hello");
	}
}

class Bar extends Foo {
	constructor() {
		super();
		console.log(this.#p); // 报错
		this.#m(); // 报错
	}
}
```

#### 静态属性和静态方法的继承

父类的静态属性和静态方法，也会被子类继承。

注意，静态属性是通过浅拷贝实现继承的。

```js
class A {
	static foo = 100;
}
class B extends A {
	constructor() {
		super();
		B.foo--;
	}
}

const b = new B();
B.foo; // 99
A.foo; // 100
// B 类继承静态属性时，会采用浅拷贝，拷贝父类静态属性的值，因此A.foo和B.foo是两个彼此独立的属性
```

但是，由于这种拷贝是浅拷贝，如果父类的静态属性的值是一个对象，那么子类的静态属性也会指向这个对象，因为浅拷贝只会拷贝对象的内存地址。

```js
class A {
	static foo = { n: 100 };
}

class B extends A {
	constructor() {
		super();
		B.foo.n--;
	}
}

const b = new B();
B.foo.n; // 99
A.foo.n; // 99
```

#### super 关键字

第一种情况，super 作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次 super()函数。

第二种情况，super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

### Module 的语法

#### 严格模式

严格模式主要有以下限制。

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 with 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]
- eval 不会在它的外层作用域引入变量
- eval 和 arguments 不能被重新赋值
- arguments 不会自动反映函数参数的变化
- 不能使用 arguments.callee
- 不能使用 arguments.caller
- 禁止 this 指向全局对象
- 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
- 增加了保留字（比如 protected、static 和 interface）

#### export 命令

export 输出的变量就是本来的名字，但是可以使用 as 关键字重命名

```js
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

需要特别注意的是，export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

```js
// 报错
export 1;

// 报错
var m = 1;
export m;

// 正确写法
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

```

同样的，function 和 class 的输出，也必须遵守这样的写法。

另外，export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js
export var foo = "bar";
setTimeout(() => (foo = "baz"), 500);
// 代码输出变量foo，值为bar，500 毫秒之后变成baz。
```

#### import 命令

注意，import 命令具有提升效果，会提升到整个模块的头部，首先执行

由于 import 是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

最后，import 语句会执行所加载的模块，因此可以有下面的写法。

如果多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。

```js
import "lodash";
import "lodash";

import { foo } from "my_module";
import { bar } from "my_module";

// 等同于
import { foo, bar } from "my_module";
```

#### 模块的整体加载

```js
// circle.js
export function area(radius) {
	return Math.PI * radius * radius;
}

export function circumference(radius) {
	return 2 * Math.PI * radius;
}

// main.js
import { area, circumference } from "./circle";
console.log("圆面积：" + area(4));
console.log("圆周长：" + circumference(14));
// 上面写法是逐一指定要加载的方法，整体加载的写法如下。
import * as circle from "./circle";
console.log("圆面积：" + circle.area(4));
console.log("圆周长：" + circle.circumference(14));

// 注意，模块整体加载所在的那个对象（上例是circle），应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的。
import * as circle from "./circle";

// 下面两行都是不允许的
circle.foo = "hello";
circle.area = function () {};
```

#### export default 命令

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。

其他模块加载该模块时，import 命令可以为该匿名函数指定任意名字。

export default 命令用在非匿名函数前，也是可以的。

```js
// export-default.js
export default function foo() {
  console.log('foo');
}

// 或者写成

function foo() {
  console.log('foo');
}

export default foo;
// foo函数的函数名foo，在模块外部是无效的。加载的时候，视同匿名函数加载。
```

比较一下默认输出和正常输出

```js
// 第一组
export default function crc32() {
	// 输出
	// ...
}

import crc32 from "crc32"; // 输入

// 第二组
export function crc32() {
	// 输出
	// ...
}

import { crc32 } from "crc32"; // 输入

// 第一组是使用export default时，对应的import语句不需要使用大括号；第二组是不使用export default时，对应的import语句需要使用大括号。
```

export default 命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此 export default 命令只能使用一次。所以，import 命令后面才不用加大括号，因为只可能唯一对应 export default 命令。

本质上，export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的

```js
// modules.js
function add(x, y) {
	return x * y;
}
export { add as default };
// 等同于
// export default add;

// app.js
import { default as foo } from "modules";
// 等同于
// import foo from 'modules';
```

正是因为 export default 命令其实只是输出一个叫做 default 的变量，所以它后面不能跟变量声明语句。

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

同样地，因为 export default 命令的本质是将后面的值，赋给 default 变量，所以可以直接将一个值写在 export default 之后。

```js
// 正确
export default 42;

// 报错
export 42;
```

有了 export default 命令，输入模块时就非常直观了，以输入 lodash 模块为例。

如果想在一条 import 语句中，同时输入默认方法和其他接口，可以写成下面这样。

```js
import _, { each, forEach } from "lodash";
```

对应上面代码的 export 语句如下。

```js
export default function (obj) {
	// ···
}

export function each(obj, iterator, context) {
	// ···
}

export { each as forEach };
```

#### export 与 import 的复合写法

如果在一个模块之中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起。

```js
export { foo, bar } from "my_module";

// 可以简单理解为
import { foo, bar } from "my_module";
export { foo, bar };

// 接口改名
export { foo as myFoo } from "my_module";

// 整体输出
export * from "my_module";

// 默认接口的写法如下
export { default } from "foo";

// 具名接口改为默认接口的写法如下

export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;

// 默认接口也可以改名为具名接口
export { default as es6 } from './someModule';


export * as ns from "mod";

// 等同于
import * as ns from "mod";
export {ns};
```

#### 模块的继承

模块之间也可以继承。

假设有一个 circleplus 模块，继承了 circle 模块。

```js
// circleplus.js

export * from "circle";
export var e = 2.71828182846;
export default function (x) {
	return Math.exp(x);
}
// 上面代码中的export *，表示再输出circle模块的所有属性和方法。注意，export *命令会忽略circle模块的default方法。然后，上面代码又输出了自定义的e变量和默认方法。
```

这时，也可以将 circle 的属性或方法，改名后再输出

```js
// circleplus.js

export { area as circleArea } from "circle";
// 上面代码表示，只输出circle模块的area方法，且将其改名为circleArea。
```

加载上面模块的写法如下。

```js
// main.js

import * as math from "circleplus";
import exp from "circleplus";
console.log(exp(math.e));
// 上面代码中的import exp表示，将circleplus模块的默认方法加载为exp方法。
```

#### import()

import 命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行（import 命令叫做“连接” binding 其实更合适）。

```js
// 报错
if (x === 2) {
	import MyModual from "./myModual";
}
```

import 和 export 命令只能在模块的顶层，不能在代码块之中（比如，在 if 代码块之中，或在函数之中）

ES2020 提案 引入 import()函数，支持动态加载模块。

import()返回一个 Promise 对象。下面是一个例子。

```js
const main = document.querySelector("main");

import(`./section-modules/${someVariable}.js`)
	.then((module) => {
		module.loadPageInto(main);
	})
	.catch((err) => {
		main.textContent = err.message;
	});
```

import()函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用。它是运行时执行，也就是说，什么时候运行到这一句，就会加载指定的模块。另外，import()函数与所加载的模块没有静态连接关系，这点也是与 import 语句不相同。import()类似于 Node.js 的 require()方法，区别主要是前者是异步加载，后者是同步加载。

由于 import()返回 Promise 对象，所以需要使用 then()方法指定处理函数。考虑到代码的清晰，更推荐使用 await 命令。

```js
async function renderWidget() {
	const container = document.getElementById("widget");
	if (container !== null) {
		// 等同于
		// import("./widget").then(widget => {
		//   widget.render(container);
		// });
		const widget = await import("./widget.js");
		widget.render(container);
	}
}

renderWidget();
```

#### import()适用场合

（1）按需加载。

- import()可以在需要的时候，再加载某个模块。

```js
button.addEventListener("click", (event) => {
	import("./dialogBox.js")
		.then((dialogBox) => {
			dialogBox.open();
		})
		.catch((error) => {
			/* Error handling */
		});
});
```

（2）条件加载

- import()可以放在 if 代码块，根据不同的情况，加载不同的模块。

```js
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

（3）动态的模块路径

- import()允许模块路径动态生成。

```js
import(f())
.then(...);
```

**注意点**

import()加载模块成功以后，这个模块会作为一个对象，当作 then 方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```js
// export1和export2都是myModule.js的输出接口，可以解构获得。
import("./myModule.js").then(({ export1, export2 }) => {
	// ...·
});

// 如果模块有default输出接口，可以用参数直接获得。
import("./myModule.js").then((myModule) => {
	console.log(myModule.default);
});

// 也可以使用具名输入的形式。
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});

// 想同时加载多个模块，可以采用下面的写法。
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});

// import()也可以用在 async 函数之中。
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();

```

#### import.meta

使用一个模块时，有时需要知道模板本身的一些信息（比如模块的路径）。ES2020 为 import 命令添加了一个元属性 import.meta，返回当前模块的元信息。

import.meta 只能在模块内部使用，如果在模块外部使用会报错。

这个属性返回一个对象，该对象的各种属性就是当前运行的脚本的元信息。具体包含哪些属性，标准没有规定，由各个运行环境自行决定。一般来说，import.meta 至少会有下面两个属性。

1. import.meta.url

import.meta.url 返回当前模块的 URL 路径。举例来说，当前模块主文件的路径是https://foo.com/main.js，import.meta.url就返回这个路径。如果模块里面还有一个数据文件data.txt，那么就可以用下面的代码，获取这个数据文件的路径。
`new URL('data.txt', import.meta.url)`

注意，Node.js 环境中，import.meta.url 返回的总是本地路径，即 file:URL 协议的字符串，比如 file:///home/user/foo.js。

2. import.meta.scriptElement

import.meta.scriptElement 是浏览器特有的元属性，返回加载模块的那个<\script>元素，相当于 document.currentScript 属性。

```js
// HTML 代码为
// <script type="module" src="my-module.js" data-foo="abc"></script>

// my-module.js 内部执行下面的代码
import.meta.scriptElement.dataset.foo;
// "abc"
```

3. 其他

Deno 现在还支持 import.meta.filename 和 import.meta.dirname 属性，对应 CommonJS 模块系统的**filename 和**dirname 属性。

- import.meta.filename：当前模块文件的绝对路径。
- import.meta.dirname：当前模块文件的目录的绝对路径。

### Module 的加载实现

#### 浏览器加载

如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户会感觉到浏览器“卡死”了，没有任何响应。这显然是很不好的体验，所以浏览器允许脚本异步加载，下面就是两种异步加载的语法。

```html
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```

#### 加载规则

浏览器加载 ES6 模块，也使用<\script>标签，但是要加入 type="module"属性。

```html
<script type="module" src="./foo.js"></script>
<!-- 由于type属性设为module，所以浏览器知道这是一个 ES6 模块。 -->
```

浏览器对于带有 type="module"的<\script>，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了<\script>标签的 defer 属性。

```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

如果网页有多个<\script type="module">，它们会按照在页面出现的顺序依次执行。

<\script>标签的 async 属性也可以打开，这时只要加载完成，渲染引擎就会中断渲染立即执行。执行完成后，再恢复渲染。

```html
<script type="module" src="./foo.js" async></script>
<!-- 一旦使用了async属性，<\script type="module">就不会按照在页面出现的顺序执行，而是只要该模块加载完成，就执行该模块。 -->
```

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```html
<script type="module">
	import utils from "./utils.js";

	// other code
</script>
```

对于外部的模块脚本（上例是 foo.js），有几点需要注意。

- 代码是在模块作用域之中运行，而不是在全局作用域运行。模块内部的顶层变量，外部不可见。
- 模块脚本自动采用严格模式，不管有没有声明 use strict。
- 模块之中，可以使用 import 命令加载其他模块（.js 后缀不可省略，需要提供绝对 URL 或相对 URL），也可以使用 export 命令输出对外接口。
- 模块之中，顶层的 this 关键字返回 undefined，而不是指向 window。也就是说，在模块顶层使用 this 关键字，是无意义的。
- 同一个模块如果加载多次，将只执行一次。

下面是一个示例模块。

```js
import utils from "https://example.com/js/utils.js";

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
```

利用顶层的 this 等于 undefined 这个语法点，可以侦测当前代码是否在 ES6 模块之中。

```js
const isNotModuleScript = this !== undefined;
```

#### ES6 模块与 CommonJS 模块的差异

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

#### Node.js 的模块加载方法

JavaScript 现在有两种模块。一种是 ES6 模块，简称 ESM；另一种是 CommonJS 模块，简称 CJS。

它们采用不同的加载方案。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。

Node.js 要求 ES6 模块采用.mjs 后缀文件名。也就是说，只要脚本文件里面使用 import 或者 export 命令，那么就必须采用.mjs 后缀名。Node.js 遇到.mjs 文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。

如果不希望将后缀名改成.mjs，可以在项目的 package.json 文件中，指定 type 字段为 module。

```json
{
	"type": "module"
}
```

##### package.json 的 main 字段

package.json 文件有两个字段可以指定模块的入口文件：main 和 exports。比较简单的模块，可以只使用 main 字段，指定模块加载的入口文件。

```json
// ./node_modules/es-module-package/package.json
{
	"type": "module",
	"main": "./src/index.js"
}
```

上面代码指定项目的入口脚本为./src/index.js，它的格式为 ES6 模块。如果没有 type 字段，index.js 就会被解释为 CommonJS 模块。

然后，import 命令就可以加载这个模块

```js
// ./my-app.mjs

import { something } from "es-module-package";
// 实际加载的是 ./node_modules/es-module-package/src/index.js
```

上面代码中，运行该脚本以后，Node.js 就会到./node_modules 目录下面，寻找 es-module-package 模块，然后根据该模块 package.json 的 main 字段去执行入口文件。

这时，如果用 CommonJS 模块的 require()命令去加载 es-module-package 模块会报错，因为 CommonJS 模块不能处理 export 命令。

##### package.json 的 exports 字段

exports 字段的优先级高于 main 字段。它有多种用法。

1. 子目录别名

package.json 文件的 exports 字段可以指定脚本或子目录的别名。

```json
// ./node_modules/es-module-package/package.json
{
	"exports": {
		"./submodule": "./src/submodule.js"
	}
}
```

上面的代码指定 src/submodule.js 别名为 submodule，然后就可以从别名加载这个文件。

```js
import submodule from "es-module-package/submodule";
// 加载 ./node_modules/es-module-package/src/submodule.js
```

下面是子目录别名的例子。

```json
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./features/": "./src/features/"
  }
}

import feature from 'es-module-package/features/x.js';
// 加载 ./node_modules/es-module-package/src/features/x.js
```

如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

```js
// 报错
import submodule from "es-module-package/private-module.js";

// 不报错
import submodule from "./node_modules/es-module-package/private-module.js";
```

2. main 的别名

exports 字段的别名如果是`.`，就代表模块的主入口，优先级高于 main 字段，并且可以直接简写成 exports 字段的值。

```json
{
  "exports": {
    ".": "./main.js"
  }
}

// 等同于
{
  "exports": "./main.js"
}
```

由于 exports 字段只有支持 ES6 的 Node.js 才认识，所以可以搭配 main 字段，来兼容旧版本的 Node.js。

```json
{
	"main": "./main-legacy.cjs",
	"exports": {
		".": "./main-modern.cjs"
	}
}
```

上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是 main-legacy.cjs，新版本的 Node.js 的入口文件是 main-modern.cjs。

3. 条件加载

利用`.`这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。

```json
{
	"type": "module",
	"exports": {
		".": {
			"require": "./main.cjs",
			"default": "./main.js"
		}
	}
}
```

上面代码中，别名.的 require 条件指定 require()命令的入口文件（即 CommonJS 的入口），default 条件指定其他情况的入口（即 ES6 的入口）。

上面的写法可以简写如下

```json
{
	"exports": {
		"require": "./main.cjs",
		"default": "./main.js"
	}
}
```

注意，如果同时还有其他别名，就不能采用简写，否则会报错。

```json
{
	// 报错
	"exports": {
		"./feature": "./lib/feature.js",
		"require": "./main.cjs",
		"default": "./main.js"
	}
}
```

##### CommonJS 模块加载 ES6 模块

CommonJS 的 require()命令不能加载 ES6 模块，会报错，只能使用 import()这个方法加载。

```js
(async () => {
	await import("./my-app.mjs");
})();
```

require()不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层 await 命令，导致无法被同步加载。

##### ES6 模块加载 CommonJS 模块

ES6 模块的 import 命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。

```js
// 正确
import packageMain from "commonjs-package";

// 报错
import { method } from "commonjs-package";
```

这是因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是 module.exports，是一个对象，无法被静态分析，所以只能整体加载。

加载单一的输出项，可以写成下面这样。

```js
import packageMain from "commonjs-package";
const { method } = packageMain;
```

还有一种变通的加载方法，就是使用 Node.js 内置的 module.createRequire()方法。

```js
// cjs.cjs
module.exports = "cjs";

// esm.mjs
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const cjs = require("./cjs.cjs");
cjs === "cjs"; // true
```

上面代码中，ES6 模块通过 module.createRequire()方法可以加载 CommonJS 模块。但是，这种写法等于将 ES6 和 CommonJS 混在一起了，所以不建议使用。

##### 同时支持两种格式的模块

一个模块同时要支持 CommonJS 和 ES6 两种格式，也很容易。

如果原始模块是 ES6 格式，那么需要给出一个整体输出接口，比如 export default obj，使得 CommonJS 可以用 import()进行加载。

如果原始模块是 CommonJS 格式，那么可以加一个包装层。

```js
import cjsModule from "../index.js";
export const foo = cjsModule.foo;
```

上面代码先整体输入 CommonJS 模块，然后再根据需要输出具名接口。

你可以把这个文件的后缀名改为.mjs，或者将它放在一个子目录，再在这个子目录里面放一个单独的 package.json 文件，指明{ type: "module" }。

另一种做法是在 package.json 文件的 exports 字段，指明两种格式模块各自的加载入口。

```json
"exports"：{
  "require": "./index.js"，
  "import": "./esm/wrapper.js"
}
```

上面代码指定 require()和 import，加载该模块会自动切换到不一样的入口文件

##### Node.js 的内置模块

Node.js 的内置模块可以整体加载，也可以加载指定的输出项。

##### 加载路径

ES6 模块的加载路径必须给出脚本的完整路径，不能省略脚本的后缀名。import 命令和 package.json 文件的 main 字段如果省略脚本的后缀名，会报错。

```js
// ES6 模块中将报错
import { something } from "./index";
```

为了与浏览器的 import 加载规则相同，Node.js 的.mjs 文件支持 URL 路径。

```js
import "./foo.mjs?query=1"; // 加载 ./foo 传入参数 ?query=1
```

上面代码中，脚本路径带有参数?query=1，Node 会按 URL 规则解读。同一个脚本只要参数不同，就会被加载多次，并且保存成不同的缓存。由于这个原因，只要文件名中含有:、%、#、?等特殊字符，最好对这些字符进行转义。

目前，Node.js 的 import 命令只支持加载本地模块（file:协议）和 data:协议，不支持加载远程模块。另外，脚本路径只支持相对路径，不支持绝对路径（即以/或//开头的路径）。

##### 内部变量

ES6 模块应该是通用的，同一个模块不用修改，就可以用在浏览器环境和服务器环境。为了达到这个目标，Node.js 规定 ES6 模块之中不能使用 CommonJS 模块的特有的一些内部变量。

其次，以下这些顶层变量在 ES6 模块之中都是不存在的。

- arguments
- require
- module
- exports
- \_\_filename
- \_\_dirname
