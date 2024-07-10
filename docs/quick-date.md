# 快捷日期工具

### 日期与时间的格式化
`quickDate.format('yyyy-mm-dd', Date | String)`  
参数1：替换符模板  
参数2：日期对象或时间戳，缺省为当前时间  

| 替换符 | 说明 | 示例 |
| --- | --- | --- |
| yyyy | 四位年份 | 2024 |
| yy | 两位年份 | 24 |
| mm | 填充月份 | 01 |
| m | 月份 | 1 |
| dd | 填充日期 | 01 |
| d | 日期 | 1 |
| w | 周N, 1到7 | 1 |
| ww | 周N, 1到7 | 01 |
| wz | 周N, 日到六 | 日 |
| hh | 填充小时，24小时制 | 00 |
| h | 小时，24小时制 | 0 |
| hhs | 填充小时，12小时制 | 00 |
| hs | 小时，12小时制 | 0 |
| p | 上午:AM，下午:PM | AM |
| pz | AM:上午，PM:下午 | 上午 |
| apz | 0-6：凌晨，6-12：上午，12-18：下午，18-24：晚上 | 凌晨 |
| ii | 填充分钟 | 00 |
| i | 分钟 | 0 |
| ss | 填充秒 | 00 |
| s | 秒 | 0 |
| mss | 填充毫秒 | 000 |
| ms | 毫秒 | 0 |

模板忽略大小写，非替换符的字符内容保留
```js
import { quickDate } from '@ossso/utils';

const date = new Date(); // 或者 指定的时间日期
const result = quickDate.format('yyyy-mm-dd hh:ii:ss', date);
console.log(result); // 2021-01-01 12:00:00
```

#### 衍生方法
`quickDate.autoYearFormat('-' | { y: '年', m: '月', d: '日' }, Date | String)`  
例如今年的日期通常可以不显示年份，其他时间需要显示年份，可以用这个方法
```js
quickDate.autoYearFormat('-', new Date()); // 01-01
quickDate.autoYearFormat('-', '2000/01/01'); // 2000-01-01
quickDate.autoYearFormat({
  y: '年',
  m: '月',
  d: '日',
}, new Date()); // 01月01日
quickDate.autoYearFormat({
  y: '年',
  m: '月',
  d: '日',
}, '2000/01/01'); // 2000年01月01日
```

### 相对时间处理  
示例：7天前、10分钟前  
`quickDate.ago(aDate: Date | String, bDate: Date | String, maxDays, callback)`  
aDate：开始时间  
bDate：结束时间  
maxDays：最大显示天数，超过天数显示具体日期  
callback：超出最大天数的回调函数，缺省为format()  

### 相差天数
`quickDate.diffDays(aDate: Date | String, bDate: Date | String)`  
aDate：开始时间  
bDate：结束时间  
Tips: 相同日期相差为0  

### 自动处理为时间对象
`quickDate.auto(Date | String)`

### 闰年判断
`quickDate.leapYear(year: Date | String, isDate: Boolean = true)`  
year为类时间对象，如果是年份数字需要isDate为false

### 范围时间
`quickDate.getTimeFixed(Date | String, 'start' | 'end')`  
start：当地时间的指定日期开始时间 **毫秒数**  
end：当地时间的指定日期结束时间 **毫秒数**  

`quickDate.getDateFixed(Date | String, 'start' | 'end')`  
start：当地时间的指定日期开始时间 **时间对象**  
end：当地时间的指定日期结束时间 **时间对象**  

`quickDate.getFirstDayOfMonth(year, month)`  
获取指定年月的月份第一天  

`quickDate.getLastDayOfMonth(year, month)`  
获取指定年月的月份最后一天

`quickDate.getCurrentQuarter(Date | String)`  
获取指定时间的季度

`quickDate.getSomeDaysDate(num, Date | String)`  
获取指定时间的前后N天  
num: 正负整数  

`quickDate.getSomeMonthsDate(num, Date | String)`  
获取指定时间的前后N月  
num: 正负整数  

`quickDate.getSomeHoursDate(num, Date | String)`  
获取指定时间的前后N小时  
num: 正负整数  

`quickDate.getSomeMinutesDate(num, Date | String)`  
获取指定时间的前后N分钟  
num: 正负整数  

`quickDate.getSomeSecondsDate(num, Date | String)`  
获取指定时间的前后N秒  
num: 正负整数  
