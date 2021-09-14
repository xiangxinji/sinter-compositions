# data 

## useStack 

描述: 封装了一个简单的栈结构 ,可以使用 push 和 pop 来进行操作 

传递参数

| 名称             | 类型    | 默认值 | 描述/备注            |
| ---------------- | ------- | ------ | -------------------- |
| data             | Array   |        | 默认数据             |
| options          | Options | {}     | 其他配置             |
| options.observer | boolean | false  | 栈结构是否需要响应式 |

**返回 [Data, Context]**

Data :数组, 如果 options.observer =true , 那Data 就是 reactive 之后的对象 

Context

| 名称 | 类型     | 描述/备注        |
| ---- | -------- | ---------------- |
| push | Function | 向栈中推入一个值 |
| pop  | Function | 向栈中推出一个值 |

