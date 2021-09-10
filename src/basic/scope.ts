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
            cb(v, {max, min});
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


