import {reactive} from "vue";


// 这个方法只会被执行一次
export function useOnce(callback: Function) {
    let called = false
    return function (...args: Array<any>) {
        if (!called) return
        return callback.apply(args)
    }
}

// 开关 , 每次调用 toggle 都会进行 boolean 的取反
export function useToggle(defaultValue ?: boolean, callback ?: Function) {
    const state = reactive({
        value: !!defaultValue
    })

    function toggle() {
        state.value = !state.value
        if (callback) {
            return callback(state.value)
        }
    }

    return [state, toggle] as [typeof state, typeof toggle]
}





