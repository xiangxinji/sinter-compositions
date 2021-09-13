/**
 * 处理区间问题 , 如数字 , 数组区间
 */
import {computed, ComputedRef, reactive, ref, Ref, watch} from "vue";


function computedCurrentIndexLoop(isLoop = false, current: number, min: number, max: number): number {
    if (!isLoop) {
        return current > max ?
            max : (current < min ? min : current)
    } else {
        return current > max ?
            min : (current < min ? max : current)
    }
}

export function useNumberScope(min: number, max: number, {
    loop = false,
    onChange = null as Function | null,
    onInitState = null as Function | null,
} = {}): [{ current: number, min: number, max: number }, {
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

