/**
 *  处理用户滚动的一些操作
 */
import {computed, onMounted, reactive, Ref} from "vue";
import {querySelector} from "../utils/dom";

type ScrollState = {
    top: number
    left: number
    direction: 'none' | 'vertical' | 'horizontal'
}
type UseScrollResult = [
    ScrollState, {
        isVertical: Ref<boolean>,
        isHorizontal: Ref<boolean>,
        start: () => void
        stop: () => void
        defineScroll: (callback: Function) => void
    }
]


// 计算滚动方向
function createComputedScrollDirective(bTop: number, bLeft: number) {
    let beforeTop = bTop
    let beforeLeft = bLeft

    function computedDirection(top: number, left: number, beforeDirection: ScrollState["direction"]): ScrollState["direction"] {
        if (top !== beforeTop) {
            beforeTop = top
            beforeLeft = left
            return 'vertical'
        }
        if (left !== beforeLeft) {
            beforeTop = top
            beforeLeft = left
            return 'horizontal'
        }
        return beforeDirection
    }

    return computedDirection
}


/**
 * 将一个容器订阅scroll 事件
 * @param contain 容器 el
 * @param observer scroll 数据是否需要响应式
 * @param immediate 是否在一开始默认执行获取容器和绑定事件
 */
export function useScroll(contain: Ref<HTMLElement> | HTMLElement | String, {
    observer = false,
    immediate = false,
} = {}): UseScrollResult {
    const t = {top: 0, left: 0, direction: 'none'}
    const state = (observer ? reactive(t) : t) as ScrollState
    const isVertical = computed(() => state.direction === 'vertical')
    const isHorizontal = computed(() => state.direction === 'horizontal')
    let handler: Function | null = null
    let container: HTMLElement | null = null
    let onScroll: Function | null = null

    function start() {
        const computedDirection = createComputedScrollDirective(state.top, state.left)
        container = querySelector(contain)
        console.log(container)
        if (container === null) {
            return console.warn('[useScroll]:找不到 scroll 容器')
        }
        handler = (event: Event) => {
            const target = event.target as HTMLElement
            state.top = target.scrollTop
            state.left = target.scrollLeft
            state.direction = computedDirection(state.top, state.left, state.direction)
            if (onScroll) {
                onScroll(state, event)
            }
        }
        if (handler !== null) {
            container.addEventListener('scroll', handler as any)
        }
    }

    function stop() {
        if (container && handler) container.removeEventListener('scroll', handler as any)
    }

    function defineScroll(callback: Function) {
        onScroll = callback
    }

    onMounted(() => {
        if (immediate) {
            start()
        }
    })
    return [
        state,
        {start, stop, isVertical, isHorizontal, defineScroll}
    ]
}












