import {reactive} from 'vue'

type Options = {
    immediate?: boolean
    lock?: boolean
}

export function useWrapperFetch(handler: Function, options: Options = {
    immediate: true,
    lock: true
}) {

    const state = reactive({
        loaded: false,
        loading: false,
        success: false,
    })

    function fetch(...args: Array<any>) {
        if (options.lock && state.loading) {
            return undefined
        }
        state.loading = true
        const t = handler.apply(null, args)
        if (t instanceof Promise || ( typeof t.then === 'function' && typeof t.finally === 'function' && typeof t.catch === 'function')) {
            t.then(() => {
                state.success = true
            }).catch(() => state.success = false).finally(() => {
                state.loaded = true
                state.loading = false
            })
        }
        return t
    }

    return [state, fetch] as [typeof state, typeof fetch]
}
