import Dep, { pushTarget, popTarget } from './dep'
export default class Watcher {
    constructor(getter, option = {}) {
        const { computed, watch, callback } = option
        this.getter = getter

        this.computed = computed
        this.callback = callback
        this.watch = watch
        if (this.computed) {
            this.dep = new Dep()
        } else {
            this.get()
        }
    }

    depend() {
        this.dep.depend()
    }

    get() {
        pushTarget(this)
        this.value = this.getter()
        popTarget()
        return this.value
    }

    update() {
        if (this.computed) {
            this.get()
            this.dep.notify()
        } else if (this.watch) {
            const oldVal = this.value
            this.get()
            this.callback(this.value, oldVal)
        }
        else {
            this.get()
        }
    }
}