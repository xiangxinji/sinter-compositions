/**
 * 处理区间问题 , 如数字 , 数组区间
 */
import { computed, reactive, Ref, watch } from "vue";

/**
 * 用于数字的界限, 可以用于上一步下一步等等做一些数值判断
 * @param min 最小值
 * @param max 最大值
 *
 * Return:Array
 * Array[0]:scope 的一个状态,可以使用 current 来获得当前的数
 * Array[1]:Handlers 下面的元素
 *
 * Functions
 * next : 数++
 * prev : 数--
 * defineChange : 定义 state.current 的处理函数
 *
 * Computed
 * isMax :boolean 当前是否为最大值
 * isMin :boolean 当前是否为最小值
 */
export function useNumberScope(min: number, max: number): [{ current: number }, {
    next: () => void,
    prev: () => void,
    defineChange: (cb: Function) => void,
    isMin: Ref<boolean>,
    isMax: Ref<boolean>
}] {
    const changeCbs: Array<Function> = [];
    const state = reactive<any>({
        current: min,
    });
    const isMin = computed(() => state.current === min);
    const isMax = computed(() => state.current === max);

    function next() {
        if (state.current < max) state.current++;
    }

    function prev() {
        if (state.current > min) state.current--;
    }

    function defineChange(cb: Function) {
        if (!changeCbs.includes(cb)) changeCbs.push(cb);
    }

    watch(() => state.current, (v) => {
        if (v > max) return v = max;
        else if (v < min) return v = min;
        for (let i = 0; i < changeCbs.length; i++) {
            const cb = changeCbs[i];
            cb(v, { max, min });
        }
    });

    return [
        state,
        {
            next,
            prev,
            defineChange,
            isMin, isMax,
        },
    ];
}



function computedCurrentIndexLoop(isLoop = false, current: number, min: number, max: number): number {
    if (!isLoop) {
        return current >= max ?
            max - 1 : (current < min ? min : current)
    } else {
        return current >= max ?
            min : (current < min ? max - 1 : current)
    }
}


/**
 * 处理数组索引区间问题
 * @param data 需要监听的数组，在此之前请确保他是响应式的
 * @param options  
 * options.defaultIndex 默认的一个索引 如果Data 数组是空的，那么 defaultIndex = null 
 * options.loop 判断这个索引是否循环， 如果循环的话 Index 会在溢出时重新回归至 0 
 * @returns 
 * state : 返回这个 composition 的一些状态
 *      max : 最大值
 *      currentIndex: 当前的索引
 * Handlers :返回 这个 componsition 的一些方法
 *      prev :将索引移动至上一位
 *      next :将索引移动至下一位
 * 
 */
export function useArrayScope<T = any>(data: Array<T>, { defaultIndex = 0, loop = false }) {

    const state = reactive({
        max: data.length,
        currentIndex: defaultIndex || null 
    })

    function createNotEmptyHandler<T extends Function>(handler: T): T {
        const handlerResult = (function (...args: any[]) {
            if (data.length === 0) {
                return
            }
            return handler.apply(null, args)
        } as any)
        return handlerResult
    }

    const prev = createNotEmptyHandler(() => {
        if (state.currentIndex === null || state.currentIndex <= 0) return
        state.currentIndex--
    })


    const next = createNotEmptyHandler(() => {
        if (state.currentIndex === null || state.currentIndex >= data.length) return
        state.currentIndex++
    })

    watch(() => data, (v) => {
        state.max = v.length
        if (state.max === 0) {
            state.currentIndex = null
        }
        if (state.currentIndex === null) return
        state.currentIndex = computedCurrentIndexLoop(loop, state.currentIndex, 0, state.max)
    }, { immediate: true })

    watch(() => state.currentIndex, (v) => {
        if (v === null) return
        else if (state.max === 0) {
            return state.currentIndex = null
        }
        state.currentIndex = computedCurrentIndexLoop(loop, v, 0, state.max)
    })

    return [
        state,
        {
            prev,
            next
        }
    ]
}