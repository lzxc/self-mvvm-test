
class Compile {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    if (this.$el) {
      // 将dom内部元素转成documentFragment
      this.$fragment = this.node2Fragment(this.$el)
      // 
      this.compile(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }

  // 将宿主元素中代码片段取出遍历
  node2Fragment(el) {
    const frag = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      frag.appendChild(child)
    }
    return frag
  }

  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        console.log('我是elemtn');
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
          console.log({ attr });
          const attrName = attr.name
          const exp = attr.value
          // m-xxx这类的指令逻辑
          if (this.isDirective(attrName)) {
            const dir = attrName.substring(2)
            this[dir] && this[dir](node, this.$vm, exp)
          }
          // @事件逻辑
          if (this.isEvent(attrName)) {
            const dir = attrName.substring(1)
            this.eventHandler(node, this.$vm, exp, dir)
          }
        })

      } else if (this.isInterpolation(node)) {
        console.log('我是文本插值', node.textContent);
        this.complieText(node)
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译文本插值
  complieText(node) {
    this.update(node, this.$vm, RegExp.$1, 'text')
  }

  // m-text逻辑
  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }

  // m-model逻辑
  model(node, vm, exp) {
    // 指定 input 标签的 value 属性,并走 update 逻辑添加 Watcher
    this.update(node, vm, exp, 'model')
    // 绑定dom的事件,并改变vm上对应的值
    node.addEventListener('input', function (e) {
      vm[exp] = e.target.value
    })
  }

  // m-html逻辑
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }

  // 通用编译器update函数
  update(node, vm, exp, dir) {
    const updaterFn = this[dir + 'Updater']
    updaterFn && updaterFn(node, vm[exp])

    new Watcher(vm, exp, function (value) {
      updaterFn && updaterFn(node, value)
    })
  }

  // 事件处理
  eventHandler(node, vm, exp, dir) {
    // vm.$options.methods[exp] => @click="change"中的change
    const fn = vm.$options.methods && vm.$options.methods[exp]
    node.addEventListener(dir, fn.bind(vm))
  }

  // text的update逻辑
  textUpdater(node, value) {
    node.textContent = value
  }

  // model的update逻辑
  modelUpdater(node, value) {
    node.value = value
  }

  // html的update逻辑
  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  isDirective(name) {
    return name.indexOf('m-') == 0
  }

  isEvent(name) {
    return name.indexOf('@') == 0
  }

  isElement(node) {
    return node.nodeType === 1
  }

  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}