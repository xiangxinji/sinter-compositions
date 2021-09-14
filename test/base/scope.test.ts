import {useNumberScope} from "../../src/base/scope"


describe('测试 numberScope composition 基础功能', () => {

    const [state, handlers] = useNumberScope(1, 3,)
    it('存储基本变量', () => {
        expect(state.current).toBe(1)
        expect(state.min).toBe(1)
        expect(state.max).toBe(3)
    })
    it('next , prev 操作', () => {
        handlers.next()
        expect(state.current).toBe(2)
        handlers.prev()
        expect(state.current).toBe(1)
    })
    it('computed isMax , isMin ', () => {
        expect(handlers.isMin.value).toBe(true)
        expect(handlers.isMax.value).toBe(false)
    })
    it('事件是否正常触发', () => {
        const onInitState = jest.fn(() => {
        })
        const [state, handler] = useNumberScope(1, 3, {
               onInitState
        })
        expect(onInitState).toBeCalled()
        handler.next()
    })

})
