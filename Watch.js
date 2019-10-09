class Watch {
    constructor(vm, exp, cb) {
        this.vm = vm
        this.exp = exp
        this.cb = cb
        this.value = this.get()
    }

    update() {
        this.run()
    }

    run() {
        const value = this.vm[this.exp]
        const oldVal = this.value
        if (value !== oldVal) {
            this.value = value
            this.cb.call(this.vm, value, oldVal)
        }
    }

    get() {
        Dep.target = this
        const value = this.vm[this.exp]
        Dep.target = null
        return value
    }
}