### 双向绑定和 vuex 是否冲突

### Vue 的父组件和子组件生命周期钩子执行顺序是什么

- 加载渲染过程：父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted；
- 子组件更新过程：父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated；
- 父组件更新过程：父 beforeUpdate -> 父 updated；
- 销毁过程：父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed；

### Vue 组件间如何通信？

**父子组件通信**

- props + emit
- $refs + $parent(vue2)
- provider/inject
  **兄弟组件通信**
- eventBus(vue2)(有三方库)
- $parent.$refs(vue2)
- provider/inject
- mitt 库

### Vue 中 computed 和 watch 的差异？

- computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数据，所以用 watch 同样可以监听 computed 计算属性的变化；
- computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 值，才会计算新的值。而 watch 则是当数据发送变化便会调用执行函数；
- 从使用场景上来说，computed 适用一个数据被多个数据影响，而 watch 使用一个数据影响多个数据。

### 简单聊聊 new Vue 以后发生的事情

- new Vue 会调用 Vue 原型链上的 \_init 方法对 Vue 实例进行初始化；
- 首先是 initLifecycle 初始化生命周期，对 Vue 实例内部的一些属性（如 children、parent、isMounted）进行初始化；
- initEvents，初始化当前实例上的一些自定义事件（Vue.$on）；
- initRender，解析 slots 绑定在 Vue 实例上，绑定 createElement 方法在实例上；
- 完成对生命周期、自定义事件等一系列属性的初始化后，触发生命周期钩子 beforeCreate；
- initInjections，在初始化 data 和 props 之前完成依赖注入（类似于 React.Context）；
- initState，完成对 data 和 props 的初始化，同时对属性完成数据劫持内部，启用监听者对数据进行监听（更改）；
- initProvide，对依赖注入进行解析；
- 完成对数据（state 状态）的初始化后，触发生命周期钩子 created；
- 进入挂载阶段，将 vue 模板语法通过 vue-loader 解析成虚拟 DOM 树，虚拟 DOM 树与数据完成双向绑定，触发生命周期钩子 beforeMount；
-

DOM 树通过 vue 渲染成真实 DOM，触发生命周期钩子 mounted；

### reactive()局限性

- 有限的值类型
- 不能替换整个对象
- 对解构操作不友好

reactive() 将深层地转换对象：当访问嵌套对象时，它们也会被 reactive() 包装。当 ref 的值是一个对象时，ref() 也会在内部调用它。

### 计算属性缓存 vs 方法

两种方式在结果上确实是完全相同的，然而，不同之处在于计算属性值会基于其响应式依赖被缓存。一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要响应式依赖不改变，无论多少次访问

### v-for 与 v-if 优先级

v-if 比 v-for 的优先级更高。同时使用 v-if 和 v-for 是不推荐的

### watch vs. watchEffect

watch 和 watchEffect 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- watch 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。watch 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- watchEffect，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

### Vue3 做了哪些优化

- diff 算法优化
- 静态提升
- 事件监听缓存
- SSR 优化
- 体积优化
- 编译优化
- 数据劫持优化
- 优化逻辑组织
- 优化逻辑复用

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###

###
