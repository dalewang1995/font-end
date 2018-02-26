js类型
1.值类型 2.引用类型  （对象 数组 函数）共用内存 减少内存空间

typeof 运算符
值类型
1. typeof undefined // undefined
2. typeof 'abc'     // string
3. typeof 123       // number
引用类型 
4. typeof {}/[]/null(空指针)     // object
5. typeof console.log // function

值类型-变量计算-类型转换计算

1.字符串拼接
2.== 运算符
3.if 语句
4.逻辑运算

100 == '100'   // true
0 == ''        // true
null == undefined // true

if (obj.a == null ) {
    // 相当于 obj.a === null || obj.a === undefined
}

if (0 NaN "" null undefined false) {

}

js 内置函数
Object
Array
Boolean
Number
String
Function
Date
RegExp
Error

JSON 只不过是js的一个对象

JSON.stringify({a:10, b:20})
JSOn.parse('{"a":10,"b":20}')