/**
 *  负责状态的一些管理
 */
import {Ref, ref} from 'vue'
import {UnwrapRef} from "@vue/reactivity";


/**
 * 将一个数据进行备份
 * Return:Array
 * Array[0]: 备份的数据 , 通过Ref 进行保存
 * Array[1]: reset 方法 , 调用可以将 state 恢复到一开始的状态
 * @param data
 */
export function useBackupData<T extends object>(data: T): [T extends Ref ? T : Ref<UnwrapRef<T>>, () => void] {
    function deepClone(value: any) {
        return JSON.parse(JSON.stringify(data))
    }

    const temp = deepClone(data)
    const state = ref<T>(data)
    return [
        state,
        function reset() {
            state.value = deepClone(temp)
        }
    ]
}















