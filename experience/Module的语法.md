### javascript 的模块加载机制

在 ES6 之前，之前存在的一些模块加载方案

CommonJS：服务器

AMD：浏览器



ES6 模块的设计思想是尽量的静态化，使得`编译时`就能确定模块的依赖关系，以及输入和输出的变量


CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```
	// CommonJS模块
	let { stat, exists, readFile } = require('fs');
	
	// 等同于
	let _fs = require('fs');
	// 运行时加载
	let stat = _fs.stat;
	let exists = _fs.exists;
	let readfile = _fs.readfile;

```

相当于生成了一个 `_fs` 没办法在编译时做“静态优化”。


ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过import命令输入。

```
// ES6模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从fs模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载

- 不再需要UMD模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

## export

```
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
// 相同的

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```

`export` 重命名

```
	// 写法三
	var n = 1;
	export {n as m};
```

同样的，function和class的输出，也必须遵守这样的写法。

### 动态绑定

另外，export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

```

最后，export命令可以出现在模块的任何位置，只要处于模块顶层就可以。如果处于块级作用域内，就会报错，下一节的import命令也是如此。这是因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷。

## import

```
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;

```

上面代码中，脚本加载了变量a，对其重新赋值就会报错，因为a是一个只读的接口。但是，如果a是一个对象，改写a的属性是允许的。

```
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

上面代码中，a的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，建议凡是输入的变量，都当作完全只读，轻易不要改变它的属性。

### 路径说明

import后面的from指定模块文件的位置，可以是相对路径，也可以是绝对路径，.js后缀可以省略。如果只是模块名，不带有路径，那么必须有配置文件，告诉 JavaScript 引擎该模块的位置。

### 直接执行

最后，import语句会执行所加载的模块，因此可以有下面的写法。

```import 'lodash';```

上面代码仅仅执行lodash模块，但是不输入任何值。

如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。

```
import 'lodash';
import 'lodash';

```

### 整体加载


```
// circle.js

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
```
整体加载 

```
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```


### export default


使用export default 导出的时候 需要使用 
import crc32 from 'crc32';

不需要使用{}

本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。


### export 与 import 的复合写法



摘自 阮一峰老师的开源书籍 [ECMAScript 6 入门](http://es6.ruanyifeng.com/)