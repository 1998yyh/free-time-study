# ECHARTS 个性化图标例子

- echarts.init(dom)
  初始化一个实例

- setOption({}) 
  设置内容包括series,backgroundColor,textStyle等等

- series
```javascript 
series:[//结构是一个数组，数组中每一个1元素是对象
  {
    name:'名字', //这个不显示,
    type:'pie', //图标的类型 pie表示饼图
    radius:'50%', //占整个dom实例内容大小
    roseType:'angle', //饼图的样式
    itemStyle: { //阴影的配置 
      color:'red', //设置所有的部分的颜色
      shadowBlur: 200, //模糊半径
      shadowOffsetX: 0, //左偏移量
      shadowOffsetY: 0, //右偏移量
      shadowColor: 'rgba(0,0,0,.5)',
      emphasis: { //明暗 
        shadowBlur: 200,
        shadowColor: 'rgba(0,0,0,.1)'
      }
    },
    data: [
      {
        value:111,
        name:'时评',
        itemStyle: {//设置单个的样式
          color: 'rgba(255, 255, 255, 0.3)'
        },
      }
    ]
  }
]
```

- 其他样式
背景颜色
backgroundColor:'#2c343c',
设置当前页面的文字的样式
textStyle:{
  color:'rgba(255,255,255,.3);
},
label:{
  textStyle:{
    暂时搁置,无效果
  }
},
明暗度显示
visualMap:{ 
  show:false,
  min:xx, 映射的最小值
  max:xx, 映射的最大值
  inRange:{
    colorLightness:[0,1] 明暗度的区间
  }
}