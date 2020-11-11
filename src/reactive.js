import Dep from './dep';
import { isObject } from './utils'

export default function reactive(data) {
    if (isObject(data)) {
        Object.keys(data).forEach((key) => {
            defaultReactive(data, key)
        })
    }
    return data
}

function defaultReactive(data, key) {
    let val = data[key]
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            dep.depend()
            return val
        },
        set(v) {
            val = v
            dep.notify()
        }
    })
    if (isObject(val)) {
        reactive(val)
    }
}