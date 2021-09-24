# functions

负责一些轻量函数, 功能也更加单一

## useOnce

描述: 可以传递进入一个函数, 这个函数只会被执行一次

传递参数

| 名称     | 类型     | 默认值 | 描述/备注                         |
| -------- | -------- | ------ | --------------------------------- |
| callback | Function |        | 传入的回调,或者是你需要执行的操作 |

返回: Function

Example

```ts
import {useOnce} from "sinter-compositions"

const call = useOnce(() => {
    console.log(1)
})
// 只执行一次
call()
call()
```

## useToggle

描述: 模拟一个boolean 的开关功能

传递参数

| 名称         | 类型     | 默认值 | 描述/备注                           |
| ------------ | -------- | ------ | ----------------------------------- |
| defaultValue | boolean  | false  | 默认 true/false                     |
| callback     | Function |        | 在 toggle 方法触发以后,会执行此函数 |

**返回 [State , ToggleFunction ]**

State

| 名称  | 类型    | 描述/备注  |
| ----- | ------- | ---------- |
| value | boolean | 目前的状态 |

ToggleFunction 可以直接调用

Example

```ts
import {useToggle} from "sinter-compositions"

const [state, toggle] = useToggle()
toggle() // state.value = true 
toggle() // state.value = false 
```





