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
    (newValue, oldValue) => {
        console.log({ oldValue, newValue });
    })

document.getElementById('btn').addEventListener('click', function () {
    data.num++
    console.log('点击了按钮');
})
document.getElementById('msgInput').addEventListener('input', (e) => {
    data.msg = e.target.value
})

// 显示状态
new Watcher(() => {
    document.getElementById('state').innerHTML = `
    <h2>tip：控制台随意改变data</h2>
    <h2>显示：</h2>
        data： {
             msg："${data.msg}", num：${data.num}
            }
            <br/>
            <br/>
    `
})

// msg
new Watcher(() => {
    document.getElementById('app').innerHTML = `
    <h5>
        <p>msg => ${data.msg}</p>
    </h5>
    <h5>
        <p>watch监听了 'data.msg'，更改后在控制台可以看到</p>
    </h5>
    `
    document.getElementById('msgInput').value = `${data.msg}`
})

// num
new Watcher(() => {
    document.getElementById('app2').innerHTML = `
        <h5>
            <p>num => ${data.num}</p>
            <p>
                计算属性numPlusOne => "()=>{${data.num} + 1}", 映射后为：${numPlusOne.value}
            </p>
        </h5>
    `
})