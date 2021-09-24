# base

## useNumberScope
描述: 负责处理数字的一些区域判断问题, 比如我需要一个做一个步骤判断, 需要走4步, 那么可以使用这个 componsition

传递参数

| 名称                | 类型     | 默认值 | 描述/备注                                                    |
| ------------------- | -------- | ------ | ------------------------------------------------------------ |
| min                 | number   |        | 区域最小值                                                   |
| max                 | number   |        | 区域最大值                                                   |
| options             | Option   | {}     | 其他配置                                                     |
| options.loop        | boolean  | false  | 是否是循环步骤, 如果是,则会在当前值超过区域值之后自动设为循环值.  比如min =1 , max = 4 , loop = true , 则 current = 5之后自动为1 |
| options.step        | number  | 1  | next 和 prev 的前进步长 |
| options.onInitState | Function |        | 当 composition 初始化 state 之后进行触发                     |
| options.onChange    | Function |        | 当当前步骤改变时进行触发                                     |

**返回[ State , Context ]**

State

| 名称    | 类型   | 描述/备注        |
| ------- | ------ | ---------------- |
| current | number | 当前的值         |
| min     | number | 用户传入的最小值 |
| min     | number | 用户传入的最大值 |

Context

| 名称  | 类型        | 描述/备注          |
| ----- | ----------- | ------------------ |
| next  | Function    | 调用可进行下一个值 |
| prev  | Function    | 调用可进行上一个值 |
| isMin | Ref>boolean | 当前值是否是最小值 |
| isMax | Ref>boolean | 当前值是否是最大值 |

示例


```ts
import { useNumberScope } from 'sinter-compositions'
const [ scopeState , { next , prev , isMin , isMax }] = useNumberScope(1,3)
// .... 
```

示例2

min / max 的值是变动的

```ts
import { reactive , watch } from 'vue'
import { useNumberScope } from 'sinter-compositions'
const state = reactive({
  	data : []
})
const [ scopeState , { next , prev , isMin , isMax }] = useNumberScope(0 ,state.data.length, {
  onInitState (state) {
    watch(() => state.data , (v) => {
      state.max = v.length
    })
  }
})
```





## useCommands

描述: 用于处理一些 tab 页类似的逻辑, 可以封装一组指令, 然后进行指令的激活和各个指令的位置交换等

传递参数

| 名称                 | 类型                                  | 默认值 | 描述/备注                                      |
| -------------------- | ------------------------------------- | ------ | ---------------------------------------------- |
| commands             | Array<T extends { command : string }> | []     | 指令组, 注意:这个指令必须要 command 字段来标识 |
| options              | Option                                | {}     | 额外选项                                       |
| options.defaultIndex | number                                | -1     | 默认指令索引                                   |
| options.onInitState  | Function                              |        | 在初始化参数之后进行调用                       |
| options.onChange     | Function                              |        | 当当前指令索引改变后进行调用                   |

**返回[State , Context]**

State

| 名称         | 类型   | 描述/备注                 |
| ------------ | ------ | ------------------------- |
| commands     | T      | 指令组                    |
| currentIndex | number | 当前指令的索引 , 默认  -1 |

Context

| 名称           | 类型                                                | 描述/备注                         |
| -------------- | --------------------------------------------------- | --------------------------------- |
| currentCommand | ComputedRef>T                                       | 当前指令 , 如果没有,则返回null    |
| isHeader       | ComputedRef>boolean                                 | 当前指令是否是在开头              |
| isFooter       | ComputedRef>boolean                                 | 当钱指令是否是在结尾              |
| swapIndex      | Function (targetIndex: number, originIndex: number) | 两个位置交换指令                  |
| activeIndex    | Function(index:number)                              | 根据索引激活指定指令              |
| activeCommand  | Function(command : string  \| T )                   | 根据 command 或者指令本身进行激活 |

示例

```ts
import { useCommands } from "sinter-compositions"
const commands = [
  { label: "计划任务", command: "plan-task" },
  { label: "快速检索", command: "fast-search" },
  { label: "工作流", command: "workflow" },
];
const [commandState, {
  activeIndex,
  currentCommand,
  swapIndex,
  isHeader,
  isFooter,
}] = useCommands(commands, { defaultIndex: 0 });
// 这样就可以在template 中调用 activeIndex 或者 swapIndex 去激活对应的指令了 , 如果需要判断还可以使用 isHeader 和 isFooter 
```





## useBackupData

描述： 用于简单数据的备份，可以使用 reset 进行还原

传递参数

| 名称 | 类型             | 默认值 | 描述/备注      |
| ---- | ---------------- | ------ | -------------- |
| data | T extends object |        | 需要备份的数据 |

返回 [Ref>Data, ResetFunction]

| 名称          | 类型     | 描述/备注                                                    |
| ------------- | -------- | ------------------------------------------------------------ |
| data          | Ref>Data | 这个data 是传入进来的data ， 但是进行了 ref 包装，所以使用的时候需要.value 的方式访问实际值 |
| resetFunction | Function | reset 函数 ，调用这个方法可以使 data 重置回初始值            |



## useEventEmitter 
描述: 用于创建一个基础的事件通讯 , 功能与 eventEmitter 类似 

传递参数 

| 名称                | 类型    | 默认值 | 描述/备注                                                    |
| ------------------- | ------- | ------ | ------------------------------------------------------------ |
| options             | Options |        | 选项, 如下                                                   |
| options.scopeKey    | string  |        | 从作用域中进行创建,并且把它存至作用域中 可以用于临时存储或者是区域共享 |
| options.providerKey | string  |        | 如果提供了将会从当前组件中进行 provider                      |

返回 EventEmitter 

返回 EventEmitter 类对象,可以使用 on , emit , off , once 等函数进行事件通讯 



