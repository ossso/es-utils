# 字符串对象映射工具

示例1：
```javascript
import { mapping } from '@ossso/utils';

const originData = {
  a: {
    b: {
      c: 'abc value'
    }
  },
  d: 'd value',
};
const key = 'a.b.c';

const result = mapping(originData, key);
console.log(result); // abc value
```

示例2：
```javascript
import { mapping } from '@ossso/utils';

const originData = {
  a: {
    b: {
      c: 'abc value'
    }
  },
  d: 'd value',
};
const key = 'd';

const result = mapping(originData, key);
console.log(result); // d value
```

示例3：
```javascript
import { Mapping } from '@ossso/utils';

const originData = {
  a: {
    b: {
      c: 'abc value'
    }
  },
  d: 'd value',
};
const keys = {
  key1: 'a.b.c',
  key2: 'd',
};

const result = Mapping.each(originData, keys);
console.log(result); // { key1: 'abc value', key2: 'd value' }
```

Tips.0: 如果originData为**null**或**undefined**，返回`undefined`  
Tips.1: 如果key不存在，返回`undefined`  
Tips.2: 如果key为**null**或**undefined**，返回`undefined`  


