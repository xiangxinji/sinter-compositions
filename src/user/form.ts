import {reactive, ref, watch, Ref} from "vue";
import {useBackupData} from "../base/state"


type ElForm = {
    validate: (callbcak: (valid: boolean) => void) => void
}


export function useElForm<T extends object>(defaultModel: T, rules ?: {
    [K in keyof T]: Array<object> | object
}, elForm?: Ref<ElForm>) {

    const [model, reset] = useBackupData(defaultModel)
    const state = reactive({
        model
    })

    function validate() {
        if (elForm && elForm.value) {
            return new Promise((resolve, reject) => {
                elForm?.value.validate((valid: boolean) => {
                    if (valid) resolve(null)
                    else reject()
                })
            })
        } else return null
    }

    function setElForm(formInstance: Ref<ElForm>) {
        elForm = formInstance
    }

    watch(() => defaultModel, (v) => {
        model.value = v
    })

    return [
        state,
        rules,
        {
            clear: reset,
            validate,
            setElForm
        }
    ]
}
