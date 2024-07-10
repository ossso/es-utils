# 常用校验


### 对象判断
`isObject(obj)`  
是否为对象

`hasOwn(obj, key)`  
Object的hasOwnProperty缩写方法，判断对象是否有某个属性  

`isSet(var)`  
判断值是否已经设置类型数据  
**null**、**undefined**为**false**，其他为**true**  

`isEmpty(var[, options])`  
判断值是否为空，包括空字符串  
**options**: 如果为Boolean: true，判断值为对象/数组，表示是否判断空对象、空数组  
**options.allEmpty**: 如果为Boolean: true，判断值为对象/数组，表示是否判断空对象、空数组  
**options.objectEmpty**: 如果为Boolean: true，判断值为对象，是否判断空对象  
**options.arrayEmpty**: 如果为Boolean: true，判断值为数组，是否判断空数组  


### 数字校验

纯数字字符串判断，并支持判断小数点后N位  
```js
import { numberToFixedValid } from '@ossso/utils';

const num = '123';
const result = numberToFixedValid(num, 2);
console.log(result); // true
```
衍生方法，常见金额字符串判断
```js
import { normalMoneyValid } from '@ossso/utils';

const money = '123.45';
const result = normalMoneyValid(money);
console.log(result); // true
```

### 手机号验证

`mobileValid('13123456789')`