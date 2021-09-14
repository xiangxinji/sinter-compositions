/**
 *  处理用户滚动的一些操作
 */
import {onMounted, reactive, Ref} from "vue";


type ScrollState = {
    top: number
    left: number
    direction: 'none' | 'vertical' | 'horizontal'
}
type UseScrollResult = [
    ScrollState, {
        start: () => void
    }
]

function querySelector(el: Ref<HTMLElement> | HTMLElement | String): HTMLElement | null {
    let result = null as HTMLElement | null
    if (el instanceof String) {
        result = document.querySelector(el as any)
    } else if (el instanceof HTMLElement) {
        result = el
    } else result = el.value
    if (!result) return null
    return result
}


function createComputedScrollDirective(bTop: number, bLeft: number) {
    let beforeTop = bTop
    let beforeLeft = bLeft

    function computedDirection(top: number, left: number, beforeDirection: ScrollState["direction"]): ScrollState["direction"] {
        if (top !== beforeTop) return 'vertical'
        if (left !== beforeLeft) return 'horizontal'
        beforeTop = top
        beforeLeft = left
        return beforeDirection
    }

    return computedDirection
}


// 给一个容器绑定 scroll 事件 , 并且获取他的一些基本信息
export function useScroll(contain: Ref<HTMLElement> | HTMLElement | String, {
    observer = false,
    immediate = true
} = {}): UseScrollResult {
    const t = {top: 0, left: 0, direction: 'none'}
    const state = (observer ? reactive(t) : t) as ScrollState

    function start() {
        const computedDirection = createComputedScrollDirective(state.top, state.left)

        onMounted(() => {
            const container = querySelector(contain)
            if (container === null) {
                return console.warn('[useScroll]:找不到 scroll 容器')
            }
            container.addEventListener('scroll', (event: Event) => {
                const target = event.target as HTMLElement
                state.top = target.scrollTop
                state.left = target.scrollLeft
                state.direction = computedDirection(state.top, state.left, state.direction)
            })
        })
    }

    if (immediate) {
        start()
    }
    return [
        state,
        {start}
    ]
}






