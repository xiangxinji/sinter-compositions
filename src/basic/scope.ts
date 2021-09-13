/**
 * 处理区间问题 , 如数字 , 数组区间
 */
import {computed, reactive, Ref, watch} from "vue";

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


function computedCurrentIndexLoop(isLoop = false, current: number, min: number, max: number): number {
    if (!isLoop) {
        return current >= max ?
            max - 1 : (current < min ? min : current)
    } else {
        return current >= max ?
            min : (current < min ? max - 1 : current)
    }
}


export function useNumberScope(min: number, max: number, {
    loop = false,
    onChange = null as Function | null,
    onInitState = null as Function | null,
} = {}): [{ current: number }, {
    next: () => void,
    prev: () => void,
    isMin: Ref<boolean>,
    isMax: Ref<boolean>,
}] {
    const state = reactive<any>({
        current: min,
        min,
        max
    });
    if (onInitState) {
        onInitState(state)
    }
    const isMin = computed(() => state.current === state.min);
    const isMax = computed(() => state.current === state.max);

    function next() {
        state.current++;
    }

    function prev() {
        state.current--;
    }

    watch(() => state.current, (v) => {
        state.current = computedCurrentIndexLoop(loop, v, state.min, state.max)
        // 有越界 , 或者进行循环
        if (v !== state.current && onChange) {
            onChange(state.current, v)
        }
    });

    return [
        state,
        {
            next,
            prev,
            isMin, isMax,
        },
    ];
}






