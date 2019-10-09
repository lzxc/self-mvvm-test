class Compile {
    constructor(el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm
        this.fragment = null
        this.init()
    }

    init() {
        if (!this.el) throw Error('找不到Dom')
        this.fragment = this.nodeToFragment(this.el)
        this.compileElement(this.fragment)
        this.el.appendChild(this.fragment)
    }

    nodeToFragment(el) {
        const fragment = document.createDocumentFragment()
        let child = el.firstChild
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
     }

    compileElement(el) {
        const reg = /\{\{\s*(.*?)\s*\}\}/
        const childNodes = el.childNodes
        Array.prototype.slice.call(childNodes).forEach(node => {
            const text = node.textContent
            if (this.isTextNode(node) && reg.test(text)) {
                this.compileText(node, reg.exec(text)[1])
            }
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node)
            }
        })
    }

    compileText(node, exp) {
        const initText = this.vm[exp]
        this.updateText(node, initText)
        new Watch(this.vm, exp, (val) => {
            this.updateText(node, val)
        })
    }

    updateText(node, val) {
        node.textContent = typeof val === 'undefined' ? '' : val
    }

    isTextNode(node) {
        return node.nodeType === 3
    }
}