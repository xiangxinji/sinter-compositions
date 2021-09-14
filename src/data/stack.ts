import {reactive} from "vue";


type StackResult<T> = [
    T [],
    {
        push: (item: T) => void,
        pop: () => T | null
    }
]

/**
 * 栈
 * @param data 处理栈数据
 * @param observer 是否开启响应式
 */
export function useStack<T>(data: Array<T> = [], {observer = false} = {}): StackResult<T> {
    let state = (observer ? reactive(data) : data) as T []

    function push(item: T) {
        state.push(item)
    }

    function pop(): T | null {
        if (state.length === 0) return null
        const t = state.pop()
        if (t) return t
        return null
    }

    return [
        state,
        {
            push,
            pop
        }
    ]
}
