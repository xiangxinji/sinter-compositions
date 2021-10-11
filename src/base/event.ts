import { provide } from "vue";
import EventEmitter from "../utils/event";

const scopeEvents = new Map<string, EventEmitter>();

function createInstance(scopeKey ?: string) {
    if (scopeKey) {
        const event = scopeEvents.get(scopeKey);
        if (!event) {
            const d = new EventEmitter();
            scopeEvents.set(scopeKey, d);
            return d;
        } else return event;
    }
    return new EventEmitter();
}

export function useEventEmitter(options: {
    scopeKey?: string,
    providerKey?: string
}) {
    const evt = createInstance(options.scopeKey);
    if (options?.providerKey) {
        provide(options.providerKey, evt);
    }
    return evt;
}

