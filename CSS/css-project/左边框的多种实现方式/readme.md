# 左边框的多种实现方式

## 下面这个图形，只使用一个标签，可以有多少种实现方式：

![image](https://user-images.githubusercontent.com/8554143/87442343-c686c780-c626-11ea-871a-d95f3176f6a4.png)

假设我们的单标签是一个 div

### 法一：border

这个应该是最最最容易想到的了

```css
  border-left: 5px solid deeppink;
```

### 法二：使用伪元素

一个标签，算上 before 与 after 伪元素，其实算是有三个标签，这也是很多单标签作图的基础，本题中，使用伪元素可以轻易完成。

```css
div::after {
    content: "";
    width: 5px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background: deeppink;
}
```

### 法三：外 box-shadow

盒阴影 box-shadow 大部分人都只是用了生成阴影，其实阴影可以有多重阴影，阴影不可以不虚化，这就需要去了解一下 box-shaodw 的每一个参数具体作用。使用 box-shaodw 解题：

```css
div {
    box-shadow: -5px 0px 0 0 deeppink;
}
```

法四：内 box-shadow

盒阴影还有一个参数 inset ，用于设置内阴影，也可以完成：

```css
div {
    box-shadow: inset 5px 0px 0 0 deeppink;
}
```

### 法五：drop-shadow

drop-shadow 是 CSS3 新增滤镜 filter 中的其中一个滤镜，也可以生成阴影，不过它的数值参数个数只有 3 个，比之 box-shadow 少一个。

```css
div {
    filter: drop-shadow(-5px 0 0 deeppink);
}
```

### 法六：渐变 linearGradient

灵活使用 CSS3 的渐变可以完成大量想不到的图形，CSS3 的渐变分为线性渐变和径向渐变，本题使用线性渐变，可以轻易解题：

```css
div {
    background-image: linear-gradient(90deg, deeppink 0px, deeppink 5px, transparent 5px);
}
```

### 法七：轮廓 outline

这个用的比较少，outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。这个方法算是下下之选。

```css
div {
    margin-left: 25px;
    height: 50px;
    outline: 5px solid deeppink;
}
div:after {
    position: absolute;
    content: "outline实现";
    top: -5px;
    bottom: -5px;
    right: -5px;
    left: 0;
    background: #ddd;
}
```

### 法八: 滚动条

这个方法通过改变滚动条样式实现：

抛开实用性，仅仅是模拟出这个样式的话，这个方法真的让人眼前一亮

```css
div {
    width: 205px;
    background: deeppink;
    overflow-y: scroll;
}
div::-webkit-scrollbar {
    width: 200px;
    background-color: #ddd;
}
```

### 法九：使用下划线实现

下划线也是 CSS 中能够产生直线的一种方法，那么是否能够利用它来生成边框呢。

我们使用元素的伪类使用下划线，将伪类的内容设置为 ____，就可以实现内容与下划线重叠，再设置 文字颜色，下划线的颜色也将随之改变，然后是一些旋转位移：

```css
.textDecoration {
  overflow: hidden;
}
.textDecoration::before {
  position: absolute;
  content: "____";
  font-size: 40px;
  color: #000;
  bottom: 0;
  text-decoration: underline;
  color: deeppink;
  line-height: 60px;
  transform: rotate(90deg);
  right: 142px;
}
```

### 法十：使用 ::first-letter 伪元素

与 ::before、::after 伪元素类似，我们还可以使用 ::first-letter 伪元素。当然这个要求单个标签内存在内容。然后利用定位即可。

```css
.firstLetter {
    position: relative;
    overflow: hidden;
}
.firstLetter::first-letter {
    background: deeppink;
    color: transparent;
    width: 5px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 34px 0px;
    margin-left: -196px;
}
```