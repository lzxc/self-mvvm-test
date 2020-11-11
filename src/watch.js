import Watcher from './watcher'

export default function watch(getter, callback) {
    return new Watcher(getter, { watch: true, callback })
}