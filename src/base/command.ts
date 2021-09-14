import {computed, ComputedRef, reactive, watch} from "vue";

type CommandsState<T> = {
    commands: Array<T>,
    currentIndex: number
}


type CommandsHandlers<T> = {
    currentCommand: ComputedRef<T | null>
    isHeader: ComputedRef<boolean>
    isFooter: ComputedRef<boolean>
    swapIndex: (targetIndex: number, originIndex?: number) => void,
    activeIndex: (index: number) => void
    activeCommand: (command: string | T) => void
}

/**
 * 指令组 composition
 * @param commands 指令集合
 * @param defaultIndex 默认索引
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
        if (state.currentIndex === -1 || state.currentIndex >= state.commands.length) return null
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
