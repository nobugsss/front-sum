### 介绍下 BFC 及其应用

BFC（Block Format Context）块级格式化上下文，是页面盒模型中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。

创建 BFC 的方式有：

- html 根元素
- float 浮动
- 绝对定位
- overflow 不为 visible
- display 为表格布局或者弹性布局；

BFC 主要的作用是：

- 清除浮动
- 防止同一 BFC 容器中的相邻元素间的外边距重叠问题

### 怎么让一个 div 水平垂直居中？

### 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化？

### 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

- display: none - 不占空间，不能点击，会引起回流，子元素不影响
- visibility: hidden - 占据空间，不能点击，引起重绘，子元素可设置 visible 进行显示
- opacity: 0 - 占据空间，可以点击，引起重绘，子元素不影响。（会开启硬件加速）

### 简述 CSS 盒模型

- 盒子由 margin、border、padding、content 组成；
- 标准盒模型：box-sizing: content-box;
  - 在标准盒子模型中，元素的宽度和高度只包括内容（content）区域，不包括边框（border）、内边距（padding）和外边距（margin）。
- IE 盒模型：box-sizing: border-box;
  - 在 IE 盒子模型中，元素的宽度和高度包括了内容（content）、边框（border）和内边距（padding），但不包括外边距（margin）。

### 简述 Rem 及其转换原理

rem 是 CSS3 新增的相对长度单位，是指相对于根元素 html 的 font-size 计算值的大小。

- 由于 px 是相对固定单位，字号大小直接被定死，无法随着浏览器进行缩放；
- rem 直接相对于根元素 html，避开层级关系，移动端新型浏览器对其支持较好

### 移动端视口配置

`<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />`

- initial-scale: 初始的缩放比例；
- minimum-scale: 允许用户缩放到的最小比例；
- maximum-scale: 允许用户缩放到的最大比例；
- user-scalable: 用户是否可以手动缩放；

### 简述伪类和伪元素

**伪类**  
伪类用于当已有元素处于某种状态时，为其添加对应的样式，这个状态是根据用户行为变化而变化的。比如说 :hover。它只有处于 dom 树无法描述的状态才能为元素添加样式，所以称为伪类。

**伪元素**  
伪元素用于创建一些原本不在文档树中的元素，并为其添加样式，比如说 ::before。虽然用户可以看到这些内容，但是其实他不在文档树中。

**区别**

- 伪类的操作对象是文档树中已存在的元素，而伪元素是创建一个文档树外的元素。
- css 规范中用双冒号 :: 表示伪元素，用一个冒号 : 表示伪类。

### 行内元素的 margin 和 padding

- 水平方向：水平方向上，都有效；
- 垂直方向：垂直方向上，都无效；（padding-top 和 padding-bottom 会显示出效果，但是高度不会撑开，不会对周围元素有影响）

### CSS 中哪些属性可以继承？

字体系列属性 :

- font-family
- font-size
- font-weight
- font-style

文本系列属性:

- text-indent
- text-align
- line-hight
- word-spacing
- letter-spacing
- color

其他:

- cursor
- visibility

### CSS3 新增伪类有那些？（例如 nth-child）

- elem:nth-child(n): 选中父元素下的第 n 个标签名为 elem 的元素；
- elem:nth-last-child(n): 作用同上，从后开始查找；
- elem:last-child：最后一个子元素
- elem:only-child：如果 elem 是父元素下唯一的子元素，则选中；
- elem:nth-of-type(n)：选择父元素下第 n 个 elem 类型元素；
- elem:empty：选中不包含子元素和内容的 elem 类型元素；
- :not(elem)：选择非 elem 元素的每个元素；
- :enabled：启用状态的表单组件

### min-width/max-width 和 min-height/max-height 属性间的覆盖规则？

- max-width 会覆盖 width，即使 width 是行内样式或者设置了 !important。
- min-width 会覆盖 max-width，此规则发生在 min-width 和 max-width 冲突的时候；

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
