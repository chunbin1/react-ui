## 笔记
### 轮播组件 Carousel
处理children：
#### React.Children
React.Children提供了方法去操控this.props.children这个不透明的数据结构
##### API
React.Children.map
React.Children.forEach
React.Children.count
React.Children.only
React.Children.toArray
[官网](https://zh-hans.reactjs.org/docs/react-api.html#reactchildrenonly)
#### 批量倒入图片 -- 待看相关api
```
const requireContext = require.context("./asserts/img", true, /^\.\/.*\.jpg$/);
const img = requireContext.keys().map(requireContext);
```
#### 轮播动画的实现
requestAnimationFrame((timestamp)=>{})
可以使用start记录起始时间戳
```
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
```
```
 if (progress < delay) {
        requestAnimationFrame(move);
    } 
```
以达到按时间绘制的效果，通过递归调用下一次绘制

