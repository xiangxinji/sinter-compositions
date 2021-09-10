/**
 *  处理用户滚动的一些操作
 */
import {Ref} from "vue";


// 给一个容器绑定 scroll 事件 , 并且获取他的一些基本信息
export function useScroll(container: Ref<HTMLElement> | HTMLElement, {} = {}) {
    let ctn: HTMLElement | null = null
    if (!(container instanceof HTMLElement)) {
        ctn = container.value
    }
    if (ctn === null) return
    const state = {top: 0, left: 0}
    ctn.addEventListener('scroll', (event: Event) => {
        const target = event.target as HTMLElement
        state.top = target.scrollTop
        state.left = target.scrollLeft
    })
    return [
        state
    ]
}


// 聚焦到容器的 target 位置
export function useScrollFocus(container: Ref<HTMLElement> | HTMLElement) {

    function focus(target: Ref<HTMLElement> | HTMLElement, {offset = 0, direction = 'top'} = {}) {

    }

    return {
        container,
        focus
    }
}




