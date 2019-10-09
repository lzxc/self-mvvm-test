class SelfVm {
    constructor(option) {
        this.vm = this
        this.el = option.el
        this.data = option.data
        observer(this.data)
        Object.keys(this.data).forEach(key => {
            this.proxySelf(key)
        })
        new Compile(this.el, this.vm)
    }

    proxySelf(key) {
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get() {
                return this.data[key]
            },
            set(newVal) {
                this.data[key] = newVal
            }
        })
    }
}