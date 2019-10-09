class Observer {
    constructor(data) {
        this.data = data
        this.walk(this.data)
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            this.defineReative(data, key, data[key])
        })
    }

    defineReative(data, key, value) {
        const dep = new Dep()
        observer(value)
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.addSubs(Dep.target)
                }
                return value
            },
            set(newVal) {
                if (value !== newVal) {
                    value = newVal
                    dep.notify()
                }
            }
        })
    }
}

class Dep {
    constructor() {
        this.subs = []
    }
    addSubs(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => { sub.update() })
    }
}

function observer(data) {
    if (!data || typeof data !== 'object') return
    new Observer(data)
}