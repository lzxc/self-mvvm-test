export default class Dep {
    constructor() {
        this.deps = new Set()
    }

    depend() {
        if (Dep.target) {
            this.deps.add(Dep.target)
        }
    }

    notify() {
        this.deps.forEach(watcher => {
            watcher.update()
        })
    }
}

// Watcher实例
Dep.target = null

const targetTask = []

export function pushTargetTask(_target) {
    if (Dep.target) {
        targetTask.push(Dep.target)
    }
    Dep.target = _target
}

export function popTargetTask() {
    Dep.target = targetTask.pop()
}