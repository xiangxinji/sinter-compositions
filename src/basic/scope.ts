/**
 * 处理区间问题 , 如数字 , 数组区间
 */
import {computed, ComputedRef, reactive, ref, Ref, watch} from "vue";


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
 * 用于数字的界限, 可以用于上一步下一步等等做一些数值判断
 * @param min 最小值
 * @param max 最大值
 * options :
 *      loop: 规定这个数字超过界限是否进行循环
 *      onInitState : 会在初始化 state 之后进行调用
 *      onChange : 在 current 改变之后会进行调用
 * Return:Array
 * Array[0]:scope 的一个状态,可以使用 current 来获得当前的数
 * Array[1]:Handlers 下面的元素
 *
 * Functions
 * next : 数++
 * prev : 数--
 *
 * Computed
 * isMax :boolean 当前是否为最大值
 * isMin :boolean 当前是否为最小值
 */
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


type CommandsState<T> = {
    commands: Array<T>,
    currentIndex: number
}
type CommandsHandlers<T> = {
    currentCommand: ComputedRef<T | null>
    isHeader: ComputedRef<boolean>
    isFooter: ComputedRef<boolean>
    swapIndex: (targetIndex: number, originIndex: number) => void,
    activeIndex: (index: number) => void
    activeCommand: (command: string | T) => void
}

/**
 * 用于处理一些命令组合,可以做一些类似 tab 爷的操作逻辑
 * @param commands 命令列表
 * options :
 *      onInitState : 会在初始化 state 之后进行调用
 *      onChange : 在 index 改变,并且 index 是有效值 之后会进行调用
 * Return : Array[2]
 * Array[0] : commands 的一个状态
 * Array[1] : Handlers 下面的元素
 *
 * Computed :
 *      currentCommand : 当前的 command
 * Functions :
 *      swapIndex : 将commands 中的两个索引进行互换 , 默认 originIndex = currentInde
 *      activeIndex : 可以传入 index , 更改 currentIndex
 *      activeCommand : 可以传入 command 对象 , 也可以传入 string 去查找指定的 command
 */
export function useCommands<T extends { command: string }>(commands: Array<T> = [], {
    defaultIndex = -1,
    onInitState = null as Function | null,
    onChange = null as Function | null
} = {}): [CommandsState<T>, CommandsHandlers<T>] {

    const state = reactive({
        commands: commands,
        currentIndex: defaultIndex
    }) as CommandsState<T>

    if (onInitState) onInitState(state)

    const currentCommand = computed(() => {
        if (state.currentIndex === -1) return null
        return state.commands[state.currentIndex]
    })
    const isHeader = computed(() => state.currentIndex === 0)
    const isFooter = computed(() => state.currentIndex === state.commands.length - 1)

    function swapIndex(targetIndex: number, originIndex: number = state.currentIndex) {
        if (targetIndex < 0 || originIndex < 0) return
        else if (targetIndex >= state.commands.length || originIndex >= state.commands.length) return
        const temp = state.commands[targetIndex]
        state.commands[targetIndex] = state.commands[originIndex]
        state.commands[originIndex] = temp
    }

    function activeIndex(index: number) {
        state.currentIndex = index
    }

    function activeCommand(command: string | T) {
        let i = -1
        if (typeof command === 'string') {
            i = state.commands.findIndex(item => item.command === command)
        } else {
            i = state.commands.findIndex(item => item.command === command.command)
        }
        if (i === -1) return
        state.currentIndex = i
    }

    watch(() => state.currentIndex, (v) => {
        if (v < 0) {
            return state.currentIndex = 0
        } else if (v >= state.commands.length) {
            return state.currentIndex = state.commands.length - 1
        }
        if (onChange) onChange(v)
    })
    return [
        state,
        {
            currentCommand,
            isHeader,
            isFooter,
            swapIndex,
            activeIndex,
            activeCommand
        }
    ]
}



