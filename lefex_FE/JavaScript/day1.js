// const name = '极客学伟';
// console.log(name);
// let call = function() {
//     console.log("call fun:" + name);
// };
// call();

// let sub = function (a, b) {
//     return a - b;
// };
// console.log(sub);

// function invoke(a, b, func) {
//     if (!a || !b) {
//         return -1;
//     }
//     return func(a, b);
// }

// let ret = invoke(0, 2, function(a, b) {
//     return a + b;
// });
// console.log(ret);

// function kill(a, b) {
//     console.log("arguments: " + arguments);
//     return a * a - b;
// }
// console.log( kill(4, 1) );


// 第1题
// var name = 'suyan';
// function call() {
//     // name 的值是什么 ?
//     console.log(name);
//     var name = '前端小课';
// }
// call();


// 第2题
// var name = 'suyan';
// function call() {
//     // name 的值是什么
//     console.log(name);
//     let name = '前端小课';
// }
// call();


// 第3题
// var name = 'suyan';
// function call(isTrue) {
//     if (isTrue) {
//         let name = '前端小课';
//     }
//     // name 的值是什么
//     console.log(name);
// }
// call(true);


// 第4题
// var name = 'suyan';
// function call(isTrue) {
//     if (isTrue) {
//         // name 的值是什么
//         console.log(name);
//         let name = '前端小课';
//     }
// }
// call(true);

// 第5题
// let from = 'BJ';
// console.log(window.from);
// var type = 1;
// console.log(window.type);

// console.log(name);
// var name = 'suyan';


// 数组直接量
let names1 = ['a', 'b', 'c', 'd'];

// new Array
let names2 = new Array('c', 'd');

// console.log(names1.copyWithin(0, 1, 3));

// let idx = names1.findIndex( function(e, index, Array) {
//     return e == 'c';
// }
// )

// names1.forEach(
//     function(e, index) {
//         console.log(e);
//     }
// )

// let names = [1, 2, 3, 4];

// let names3 = names.map(
//     x => x * 2
// )
// console.log(names3);

// function log() {
//     console.log(name);
//  }
 
//  function welcome() {
//      var name = "前端小课";
//      log();
//  }
//  var name = "素燕";
//  welcome();

// let from = 'WuHan';

// var obj = {
//     from: 'BeiJing',
//     logFrom: function () {
//         console.log(this.from);
//     }
// };

// let logFrom = obj.logFrom;
// logFrom();
// obj.logFrom();

{
    function suyan() {
        console.log(this.a); // ?
    }
    var obj = {
        a: 2,
        suyanF: suyan
    };
    var tempSuyanF = obj.suyanF;
    var a = 'global a';

    // 第 1.1 题：suyan 函数中 a 的值是啥 - global a
    tempSuyanF();
    // 第 1.2 题：suyan 函数中 a 的值是啥 - 2
    obj.suyanF();
}

{
    function suyan() {
        console.log(this.a); // ?
    }
    function doSuyna(fn) {
        fn();
    }
    var obj = {
        a: 2,
        suyanF: suyan
    };
    var a = 'global a';
    // 第 2.1 题：suyan 函数中 a 的值是啥 - undefined
    doSuyna(obj.suyanF);
    // 第 2.2 题：suyan 函数中 a 的值是啥 - 2
    obj.suyanF();
}