class mvvm {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    this.observer(this.$data)

    new Compile(options.el, this)

    if (options.created) {
      options.created.call(this)
    }
  }

  observer(obj) {
    if (!obj || typeof obj !== 'object') return
    Object.keys(obj).forEach(key => {
      this.defineReative(obj, key, obj[key])
      // 劫持$data
      this.proxyData(key)
    })
  }

  defineReative(obj, key, value) {
    // 这里需要递归监听所有data，暂时只监听2层
    this.observer(value)

    const dep = new Dep()
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDeps(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal === value) return
        value = newVal
        dep.notify()
      }
    })
  }

  // 劫持代理$data
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// Dep，收集Watcher
class Dep {
  constructor() {
    this.deps = []
  }

  // 添加Watcher
  addDeps(dep) {
    this.deps.push(dep)
  }

  // 出发收集器中的所有Watcher的update函数
  notify() {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}

// Watcher,用于监听
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    console.log('属性改变了');
    this.cb.call(this.vm, this.vm[this.key])
  }
}
