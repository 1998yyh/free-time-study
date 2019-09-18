#GRID 
一般用flex一维布局
## 重要术语
Grid Container => 网格项的父元素
Grid Item      => 网格容器的子元素
Grid Line      => 组成网格的分界线
Grid Track     => 两个相邻的网格线之间网格轨道
Grid Cell      => 两个相邻的列网格线和行网格线组成的网格单元
Grid Area      => 4个网格线包围的总空间

## 属性
当元素设置了网格布局，column、float、clear、vertical-align属性无效。 display:subgrid;目前所有浏览器都不兼容。


### grid-template:
单位px：
grid-template-columns: 100px 100px 100px
grid-template-rows: 100px 100px 100px
指的是 三行三列的网格 列宽和行高都是100px

也可以用百分比:
grid-template-columns: 33.33% 33.33% 33.33%
grid-template-rows: 33.33% 33.33% 33.33%

#### repeat()
有时候，重复写同样的值非常麻烦，可以使用repeat()函数 
grid-template-columns：repeat(3,33.33%)
重复某种模式也可以
grid-template-columns：repeat(2,100px 20px 80px)

#### auto-fill
如果希望每一行容纳尽可能多的单元格,这时可以使用auto-fill关键字表示自动填充
grid-template-columns：repeat(auto-fill,100px)
填充到容器不能放置更多的列

#### 关键字
网格布局提供了fr关键字。如果两列的宽度分别是1fr和2fr，就表示前者是后者的两倍
+ 1.两列等分
  grid-template-columns：1fr 1fr;

+ 2.px+fr布局
  grid-template-columns：150px 1fr 2fr;
  第一列是150px,第二列的宽度是第三列的一半;

#### minmax()
  grid-template-columns:1fr 1fr minmax(100px,1fr);
  最小值100px 最大值1fr

#### auto
  grid-template-columns：100px auto 100px;
  两边100px 中间自适应

#### 网格线的名称
  grid-template-columns:[c1] 100px [c2] 100px [c3] 100px [c4];
  [ ] 里填的是名称

### gap
    row-gap  行间距
    column-gap   列间距

    row-gap:20px 行间距20px
    column-gap:20px 列间距20px

    gap:20px 20px; 行间距20px 列间距20px
    gap:20px;      行间距20px 列间距20px


### grid-template-areas:
  区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。

  比如，区域名为header，则起始位置的水平网格线和垂直网格线叫做header-start，终止位置的水平网格线和垂直网格线叫做header-end。

  grid-template-areas : 'header header header'
                        'main main sidebar'
                        'footer footer footer'

### grid-auto-flow 属性
  划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图数字的顺序。
  这个顺序由 grid-auto-flow 属性决定，默认值是 row，即"先行后列"。也可以将它设成 column ，变成"先列后行"。

  grid-auto-flow：column;

  grid-auto-flow：row dense;

  dense 表示尽可能紧密填满，尽量不出现空格；

### 单元格内部位置设置 => justify-items,align-items,place-items;

  justify-items：属性设置单元格内容的水平位置（左中右），
  align-items  ：属性设置单元格内容的垂直位置（上中下）。

  /start：对齐单元格的起始边缘。
  /end  ：对齐单元格的结束边缘。
  /center：单元格内部居中。
  /stretch：拉伸，占满单元格的整个宽度（默认值）。

  place-items：是justify-items和align-items的合并缩写形式:
  place-items: <align-items> <justify-items>
  如果省略第二个值，浏览器认为和第一个值相等。

### 整个内容区的位置：justify-content，align-content,place-content

  justify-content：start | end | center | stretch | space-around | space-between | space-evenly

  align-content：同上。
  place-content：<align-content> <justify-content>;

### grid-auto-columns，grid-auto-rows

  有时候，一些项目的指定位置，在现有网格的外部。比如网格只有3列，但是某一个项目指定在第5行。这时，浏览器会自动生成多余的网格，以便放置项目。

  grid-auto-columns属性和grid-auto-rows属性用来设置，浏览器自动创建的多余网格的列宽和行高。它们的写法与grid-template-columns和grid-template-rows完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高。

  grid-auto-columns：rows;

### grid-template，grid
grid-template：是 grid-template-columns，grid-template-rows，grid-template-areas 三个属性的合并简写形式。

grid：是 grid-template-rows，grid-template-columns，grid-template-areas，grid-auto-rows，gird-auto-columns，grid-auto-flow 这六个属性的合并简写形式。

## 项目属性

### 项目位置
grid-column-start：左边框所在的垂直网格线
grid-column-end：右边框所在的垂直网格线
grid-row-start：上边框所在的水平网格线
grid-row-end：下边框所在的水平网格线


这四个属性的值还可以使用span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

如果产生了项目的重叠 使用z-index属性指定项目的重叠顺序

grid-column：grid-column-start,grid-column-end的合并简写；
grid-row   ：grid-row-start,grid-row-end的合并简写
用 / 分隔开         1/2  1/3之类


### grid-area

指定放在哪一个区域；

### justify-self,align-self,place-self;

单个单元格；










