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


export function mergeClass(...args: Array<(string | Array<string> | object)>): any {
    const result: any = {};
    args.forEach((name: any) => {
        if (typeof name === 'string' || Array.isArray(name)) {
            (typeof name === 'string' ? name.split(' ') : name).forEach((i) => {
                result[i] = true;
            });
        } else {
            Object.keys(name)
                .forEach((k) => {
                    if (name[k]) result[k] = true;
                });
        }
    });
    return result;
}
