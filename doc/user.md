# User

## useScroll 
描述: 负责处理滚动监听 , 可以绑定一个容器, 进行滚动事件监听

传递参数

| 名称              | 类型                                     | 默认值 | 描述/备注                    |
| ----------------- | ---------------------------------------- | ------ | ---------------------------- |
| contain           | Ref>HTMLElement \| HTMLElement \| string |        | 需要监听滚动的容器           |
| options           | Option                                   | {}     | 其他参数                     |
| options.observer  | Boolean                                  | fase   | 滚动的数据是否需要响应式处理 |
| options.immediate | Boolean                                  | false  | 是否在使用时自动进行订阅     |

请注意: 因为在 composition 中不允许定义 onMount 的行为, 所以默认的这个 immedita = false , 大多数情况下请使用此composition 的 start 去手动触发, 否则你就必须确保在 dom 渲染完成之后再使用这个 composition 

**返回[State , Context ]**

State 

| 名称      | 类型   | 描述/备注                                                  |
| --------- | ------ | ---------------------------------------------------------- |
| top       | number | 滚动的top距离 = scrollTop                                  |
| left      | number | 滚动的left距离 = scrollLeft                                |
| direction | String | 'none' = 初始化/未滚动 vertical = 垂直 , horizontal = 水平 |

Context 

| 名称         | 类型               | 描述/备注                                                    |
| ------------ | ------------------ | ------------------------------------------------------------ |
| start        | Function           | 开始向滚动容器订阅滚动事件                                   |
| stop         | Function           | 结束滚动容器订阅滚动事件                                     |
| defineScroll | Function(Callback) | 传递一个scroll 回调, 在容器滚动的时候会执行他                |
| isVertical   | Ref>Boolean        | 当前滚动是否是垂直滚动( 这属性只有在对象是响应式的时候才会触发) |
| isHorizontal | Ref>Boolean        | 当前滚动是否是水平滚动( 这属性只有在对象是响应式的时候才会触发) |

