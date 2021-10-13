import {ref} from 'vue'


const defaultProps = {
    key: 'id',
    children: 'children'
}
type EachParams = {
    level: number
    parentIndex: number
    parent: any | null
}

type CallbackParams = EachParams & {
    hasChildren: boolean
    index: number
}

export function useTree({props = defaultProps} = {}, d: Array<any> = []) {
    const data = ref([] as any[])

    function each(callback: (node: any, params: CallbackParams) => void | any) {
        const _each = (d: any [], {
            level, parentIndex, parent
        }: EachParams): void | any => {
            for (let i = 0; i < d.length; i++) {
                const node = d[i] as any
                const hasChildren = node[props.children] && Array.isArray(node[props.children]) && node[props.children].length > 0
                const res = callback(d[i], {level, parentIndex, hasChildren, parent, index: i})
                if (typeof res === 'undefined' && hasChildren) {
                    return _each(node[props.children], {
                        level: level + 1, parentIndex: i, parent: node
                    })
                }
                return res
            }
        }
        return _each(data.value, {
            level: 1,
            parentIndex: -1,
            parent: null
        })
    }

    function find(key: string) {
        let r = null
        each((node: any) => {
            if (node[props.key] === key) return r = node
        })
        return r
    }

    function set(d: any []) {
        data.value = d
    }

    function remove(key: string) {
        each((node: any, {level, parent, index}) => {
            if (node[props.key] === key) {
                if (level === 1) data.value.splice(data.value.find(i => i[props.key] === key), 1)
                else {
                    parent[props.children].splice(index, 1)
                }
                return node
            }
        })
    }

    const handlers = {
        each,
        find,
        remove,
        set
    }
    const result: [typeof data, typeof handlers] = [data, handlers]
    return result
}
