const app = new mvvm({
  el: "#app",
  data: {
    box: '111',
    name: "i am name",
    age: '12岁',
    footer: {
      text: '1'
    },
    html: '我是html内容'
  },
  created() {
    console.log('created执行', this);
    setTimeout(() => {
      this.name = '改变了name'
      console.log('改变了name');
    }, 1000)
  },
  methods: {
    changeName() {
      this.name = '点击按钮手动改变了name'
      this.age = '11岁'
    }
  },
})
app.$data.box = '2222'
app.$data.footer.text = '深层极的对象改变值'

console.log(app);