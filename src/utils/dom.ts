import {Ref} from "vue";


export function querySelector(el: Ref<HTMLElement> | HTMLElement | String): HTMLElement | null {
    let result = null as HTMLElement | null
    if (typeof el === 'string') {
        result = document.querySelector(el as any)
    } else if (el instanceof HTMLElement) {
        result = el
    } else result = (el as Ref<HTMLElement>).value
    if (!result) return null
    return result
}
