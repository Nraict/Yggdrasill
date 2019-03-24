//一. promise是单一的处理回调地狱问题的,并不能减少代码量
//二. new promise()对象后面必须跟一个函数,在函数里面执行异步操作
//三. 这个函数有两个参数resolve, reject 
//四. 当操作返回成功则使用resolve()将信息返回出去.  失败的则使用reject()
//五. .then()方法,里面可以有2个回调函数,也可以写一个, 第一个对应 resovle, 第二个对应的 reject
//    作用是,给resolve和reject 附值回调函数, 获取值
//六. .catch()方法, 抛出错误,错误之前的代码都可以执行,遇到从错误将被中断执行,抛出


const fs = require('fs')
const path = require('path')

// 因为promise对象里面的是异步操作,所以不能使用return返回内容, 只能使用回调函数进行获取内容 
// 如果有需求:遇到错误,其他的也要执行,.then()方法就需要写两个回调函数并返回需要执行的promise对象,详情看43行

//------------   以下是执行步奏   -------------------


// 1. 在内存创建一个函数并返还一个promise对象
function getPromise(url){
    //4.这里的resovle将会被赋上.then传过来的值
    return new Promise( (resolve, reject) => {
        fs.readFile(path.join(__dirname,url),'utf-8',(err, data)=>{
            if(err) return reject(err)
            //5. 这里是进行函数的调用,相对于把data实参传给下面的res形参
            resolve(data)
        })
    } )
}

//2. 调用这个函数返回promise对象里面的.then方法
getPromise('./data/1.txt')
//3. .then方法会将回调函数带入到promise对象里
.then(res=>{
    //6. 这里拿到resolve传过来的值,进行操作
    console.log(res)
    return getPromise('./data/2.txt')
})
.then( res => {
    console.log(res)
    return getPromise('./data/3.txt')
})
// ,err => {
//     console.log('这是错误'+err)
//     return getPromise('./data/3.txt')
// })
.then( res => console.log(res))
.catch( err => console.log('这是抛出的错误'+err))