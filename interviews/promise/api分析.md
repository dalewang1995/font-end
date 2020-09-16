## Promise 分析


Promise是同步的立即执行函数，执行resolve或者reject的时候是异步操作
```js
console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
```

当JS主线程执行到Promise对象时，

- promise1.then() 的回调就是一个 task

- promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue

- promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中

- setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况


### Promise.finally 

- 返回一个Promise
- 无论结果是fulfilled或者是rejected，都会执行指定的回调函数
- finally 不代表最后执行

代码实现

```js
Promise.prototype.finally = function(callback){
    let P = this.constructor // Promise
    // callback 一定会执行
    return this.then(
        value  => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
    )
}

```

### Promise.all

- 方法返回一个 Promise 实例
- 参数为一个可迭代对象
- 所有promise都执行完成（resolved）,执行回调完成（resolve）
- 有一个失败就返回（reject）
- 返回的成功结果是有顺序的，失败返回的是第一个失败的原因

```js
all(list){
   
    return new Promise((resolve,reject)=>{
        let resValues = []
        let counts = 0
        for(let [i,p] of list){
            resolve(p).then(res => {
                    counts++;
                    resValues[i] = res;
                    if (counts === list.length) {
                        resolve(resValues)
                    }
            , err => {
                    reject(err)
                })
        }
    })
}

```