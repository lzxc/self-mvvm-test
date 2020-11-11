import reactive from './reactive'
import Watcher from './watcher'
import computed from './computed.js'
import watch from './watch'

const data = reactive({
    msg: '我是信息',
    num: 1
})
window.data = data
const numPlusOne = computed(() => data.num + 1)
watch(
    () => data.msg,
    (oldValue, newValue) => {
        console.log({ oldValue, newValue });
    })

document.getElementById('btn').addEventListener('click', function () {
    console.log(data.msg, 'data');
    data && data.msg === '还原信息' ? data.msg = '点击改变了信息' : data.msg = '还原信息'
    data.num++
})

new Watcher(() => {
    document.getElementById('state').innerHTML = `
        data: { msg: ${data.msg}, num: ${data.num} }
    `
    document.getElementById('app').innerHTML = `
    <h4>
    <p>data.msg=> ${data.msg}</p>
    <p>data.num=>${data.num}</p>
    </h4>
    `
    document.getElementById('app2').innerHTML = `
    <h4>
     data.num为 ${data.num}, 计算属性numPlusOne: +1 后为${numPlusOne.value}
    </h4>
    <h4>
        watch：data.msg被watch了，控制台随意改变msg监听
    </h4>
    `
})