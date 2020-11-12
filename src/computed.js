import Watcher from './watcher'
export default function computed(getter) {
    const def = {}
    const computedWatcher = new Watcher(getter, { computed: true })

    Object.defineProperty(def, 'value', {
        get() {
            computedWatcher.depend()
            return computedWatcher.get()
        }
    })

    return def
}