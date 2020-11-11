import Dep, { pushTargetTask, popTargetTask } from './dep';

export default class Watcher {
    constructor(getter, option = {}) {
        const { computed, watch, callback } = option
        this.getter = getter
        this.computed = computed
        this.watch = watch
        this.callback = callback
        if (this.computed) {
            this.dep = new Dep
        } else {
            this.get()
        }
    }

    get() {
        pushTargetTask(this)
        this.value = this.getter()
        popTargetTask()
        return this.value
    }

    depend() {
        this.dep.depend()
    }

    update() {
        if (this.computed) {
            this.get()
            this.dep.notify()
        } else if (this.watch) {
            const oldValue = this.value
            this.get()
            this.callback(this.value, oldValue)
        }
        else {
            this.get()
        }
    }
}