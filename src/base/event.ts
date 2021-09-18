import {provide} from 'vue'
import EventEmitter from '../utils/event'

const scopeEvents = new Map<string, EventEmitter>();

function createInstance(scopeKey ?: string) {
    if (scopeKey) {
        const event = scopeEvents.get(scopeKey)
        if (!event) {
            const d = new EventEmitter()
            scopeEvents.set(scopeKey, d)
            return d
        } else return event
    }
    return new EventEmitter()
}

export function useEventEmitter({scopeKey = undefined, providerKey = undefined}) {
    const evt = createInstance(scopeKey)
    if (providerKey && typeof providerKey === 'string') {
        provide(providerKey, evt)
    }
    return evt
}

