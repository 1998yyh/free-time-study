# 移动端与H5Video（遇到BUG踩坑）

## IOS播放全屏 
``` html
<video webkit-playsinline="true" playsinline="true"></dideo>
<!-- 这两个属性解决ios播放全屏问题 -->
```

## IOS12 - 12.2 滑动时会暂停视频播放
解决方法：采用局部滑动的方法，滑动区域与视频播放区域分离开。

## IOS同时开启多个音频（原生）
问题BUG：IOS原生音频时单例模式，不支持开启多个音频（测试时可以同时播放，暂停会丢失一个音频对象，续播的时候没有声音）

## 预加载preload
问题BUG：预加载，preload属性ios下是不支持的，android下也不能检测是否加载成功，所以通用的做法是对视频进行play方法然后立刻暂停。
如果设置了自动播放autoplay,preload会自动失效。

## 循环播放，部分(IOS)不支持
解决方法：
``` javascript
let video = document.querySelector('video');
video.addEventListener('ended',function(){
  video.play();
})
```

## 设置currenttime 
需求：点击某btn时跳转到x时间点，并在视频可播放时进行XXX操作；
问题BUG：安卓机续在触发canplay事件后才可设置currenttime,ios设置currenttime才会触发canplay事件。ios的canplay事件只会触发一次
解决方案：
``` javascript
let firstIn = true;
let isIos = false;
btn.onclick = function(){
  if(isIos){
    if(firstIn){
      firstIn = false;
      video.play();
      video.currentTime = 0;
      video.oncanplay = function(){
        dosth();
      }
    }else{
      video.play();
      video.currentTime = 0;
      dosth();
    }
  }else{
    video.play();
    video.oncanplay = function(){
      video.currentTime = 0;
      dosth();
    }
  }
}

```

## video暂停继续播放 不会有加载时间