# 人民币金额格式化工具

### 元、分互转  
`RMBTool.toYuan()`  
`RMBTool.toFen()`  
通常显示为元，存储时为分，两者之间的转换可以通过`RMBTool`的`toYuan`和`toFen`方法实现。  

```js
import { RMBTool } from '@ossso/utils';

const money = '1.23';
const fen = RMBTool.toFen(money); // 123

const fenValue = 234;
const yuan = RMBTool.toYuan(fenValue); // 2.34
```

### 显示万为单位
`RMBTool.toWan()`  

```js
import { RMBTool } from '@ossso/utils';

const money1 = '100000';
const wan1 = RMBTool.toWan(money1); // 10万

const fenValue = 10000000;
const wan2 = RMBTool.toWan(fenValue, 2, 'fen'); // 10万
```

### 金额汉字化
`RMBTool.number2Chinese()`  

```js
import { RMBTool } from '@ossso/utils';

const money1 = '100000';
const wan1 = RMBTool.number2Chinese(money1); // 壹拾万元整
```
