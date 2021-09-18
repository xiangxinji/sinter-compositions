type EventData = {
    once: boolean
    handler: Function
}

export default class EventEmitter {
    private eventData = new Map<string, Array<EventData>>()

    public on(eventName: string, handler: Function, once = false): void {
        if (this.include(eventName, handler)) return
        let data = (this.eventData.has(eventName) ? this.eventData.get(eventName) : []) as EventData[]
        data.push({
            once, handler
        })
        this.eventData.set(eventName, data)
    }

    public once(eventName: string, handler: Function): void {
        this.on(eventName, handler, true)
    }

    public emit(eventName: string, ...args: Array<any>) {
        let r = this.eventData.get(eventName)
        if (!r) return
        r.forEach(data => {
            try {
                data.handler.apply(null, args)
            } catch (e) {
                console.error('[EventEmitter]: handler 执行异常', e)
            }
        })
        r = r.filter(i => !i.once)
        this.eventData.set(eventName, r)
    }

    public include(eventName: string, handler: Function): boolean {
        const data = this.eventData.get(eventName)
        if (!data) return false
        const ind = data.findIndex(d => d.handler === handler)
        if (ind === -1) return false
        return true
    }

    public off(eventName: string, handler: Function) {
        if (!this.include(eventName, handler)) return
        const r = this.eventData.get(eventName) as EventData []
        const t = r.filter(i => i.handler !== handler)
        this.eventData.set(eventName, t)
    }

}
