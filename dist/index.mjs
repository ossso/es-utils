/**
 * 身份证验证
 */
const CITY_CODE = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
};
/**
 * 验证身份证号码是否有效。
 *
 * @param val 身份证号码字符串。
 * @returns 如果身份证号码有效返回true，否则返回false。
 */
const idCardValid = (val) => {
    // 将输入的字符串转换为大写并去除首尾空格，以统一处理。
    const str = (val || '').toUpperCase().trim();
    // 如果处理后的字符串为空，则身份证号码无效。
    if (!str) {
        return false;
    }
    // 检查身份证号码长度是否为18位。
    if (str.length !== 18) {
        return false;
    }
    // 使用正则表达式检查身份证号码的格式是否正确。
    if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)) {
        return false;
    }
    // 检查身份证号码的前两位是否在城市代码表中。
    if (!CITY_CODE[str.substring(0, 2)]) {
        return false;
    }
    // 对于18位身份证，验证最后一位校验位是否正确。
    // 18位身份证需要验证最后一位校验位
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    // 计算身份证号码前17位的加权和。
    for (let i = 0; i < 17; i += 1) {
        ai = +str[i];
        wi = factor[i];
        sum += ai * wi;
    }
    // 检查校验位是否正确，即加权和模11的结果是否与最后一位相符。
    return parity[sum % 11] === str[17];
};

/**
 * hasOwnProperty缩写
 */
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
/**
 * 是否为对象
 */
const isObject = (val) => typeof val === 'object' && val !== null && val.constructor.name === 'Object';
/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
const isSet = (val) => val !== null && val !== undefined;
const isEmpty = (val, options = null) => {
    let allEmpty = false;
    let objectEmpty = false;
    let arrayEmpty = false;
    if (options === true) {
        allEmpty = true;
    }
    else {
        const emptyOptions = options || {};
        allEmpty = emptyOptions.allEmpty || false;
        objectEmpty = emptyOptions.objectEmpty || false;
        arrayEmpty = emptyOptions.arrayEmpty || false;
    }
    if (val === null
        || val === undefined
        || (typeof val === 'string' && val === '')) {
        return true;
    }
    if ((allEmpty || objectEmpty)
        && isObject(val)
        && Object.getOwnPropertyNames(val).length === 0) {
        return true;
    }
    if ((allEmpty || arrayEmpty) && Array.isArray(val) && val.length === 0) {
        return true;
    }
    return false;
};
/**
 * 浮点数字小数点位数验证
 */
const numberToFixedValid = (val, fixed = 2) => {
    if (Number.isNaN(+val)) {
        return false;
    }
    // 小数点后两位验证
    const str = val.toString();
    const dotIndex = str.indexOf('.');
    if (dotIndex === 0) {
        return false;
    }
    const dotIndex2 = str.lastIndexOf('.');
    if (dotIndex !== dotIndex2) {
        return false;
    }
    if (dotIndex > -1) {
        return str.length - dotIndex < (fixed + 2);
    }
    return true;
};
/**
 * 常见的金钱数字验证
 */
const normalMoneyValid = (val) => numberToFixedValid(val, 2);
/**
 * 手机号验证
 */
const mobileValid = (val) => {
    const str = (val || '').toString().trim();
    if (str.length !== 11) {
        return false;
    }
    return /^1\d{10}$/.test(str);
};

class Mapping {
    /**
     * 字符串映射对象
     *
     * @param {Record<string, any>} obj 查找的对象
     * @param {string} key 查找的属性
     *
     * @return {any}
     */
    static mapping(obj, key) {
        if (!obj || typeof obj !== 'object') {
            throw new Error('Invalid input: obj is null or not an object');
        }
        if (typeof key !== 'string') {
            throw new Error('Invalid input: key is not a string');
        }
        if (key.includes('..') || key.startsWith('.') || key.endsWith('.')) {
            return undefined;
        }
        if (key.includes('.')) {
            return key.split('.').reduce((val, k) => (val !== undefined ? Mapping.get(val, k) : undefined), obj);
        }
        return Mapping.get(obj, key);
    }
    /**
     * 获取数据
     * 支持处理数组指针
     * @param {Record<string, any> | any[]} obj 属性对象
     * @param {string} key 属性名称
     * @return {any}
     */
    static get(obj, key) {
        if (!obj || typeof obj !== 'object' || !key) {
            return undefined;
        }
        const indexMatch = key.match(/\[(\d+)\]/);
        if (indexMatch) {
            const [fullMatch, indexStr] = indexMatch;
            const index = Number(indexStr);
            const matchIndex = key.indexOf(fullMatch);
            if (matchIndex === 0) {
                if (Array.isArray(obj) && index < obj.length) {
                    const val = obj[index];
                    const restKey = key.slice(fullMatch.length);
                    return restKey ? Mapping.get(val, restKey) : val;
                }
            }
            else {
                const pre = key.slice(0, matchIndex);
                const list = obj[pre];
                if (Array.isArray(list) && index < list.length) {
                    const val = list[index];
                    const restKey = key.slice(matchIndex + fullMatch.length);
                    return restKey ? Mapping.get(val, restKey) : val;
                }
            }
            return undefined;
        }
        return obj[key];
    }
    /**
     * 数据根据key的映射进行组装
     *
     * @param {KeyMap} keys 映射对象
     * @param {Record<string, any>} data 数据对象
     *
     * @return {Record<string, any>}
     */
    static each(keys, data) {
        if (!keys || typeof keys !== 'object') {
            throw new Error('Invalid input: keys is not a valid object');
        }
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid input: data is null or not an object');
        }
        return Object.entries(keys).reduce((acc, [key, value]) => {
            if (typeof value === 'string') {
                acc[key] = Mapping.mapping(data, value);
            }
            return acc;
        }, {});
    }
}
const { mapping } = Mapping;

/**
 * 时间工具
 */
class QuickDate {
    /**
     * 自动处理为时间对象
     * @param {number | string | Date | null} date 时间字符串或时间戳或时间对象
     *
     * @return {Date}
     */
    auto(date = null) {
        /**
         * 如果date本身就是时间对象直接返回
         */
        if (date instanceof Date) {
            return QuickDate.Clone(date);
        }
        /**
         * 如果date是false、undefined、null等非法值，返回一个当前时间对象
         */
        if (date === undefined
            || date === null
            || date === '') {
            return new Date();
        }
        /**
         * date可能是一个符合时间表达式的字符串，尝试用new Date的方式创建
         */
        const d = new Date(date);
        if (Number.isInteger(d.getTime())) {
            return d;
        }
        /**
         * 把字符串数字也当作时间戳来处理
         */
        if (typeof date === 'string' && !/[^0-9]/.test(date)) {
            return new Date(parseInt(date, 10));
        }
        /**
         * 通常到了这里，都是出现了JS引擎对-/等符号的兼容不支持
         * 丢到parse格式化方法里面去处理
         */
        if (typeof date === 'string') {
            return QuickDate.Parse(date);
        }
        throw Error(`无法将“${date}”转为可用时间对象`);
    }
    /**
     * Alias By QuickDate.Parse
     * 时间字符串转为时间
     * @param {string} dateString 时间字符串
     *
     * @return {Date}
     */
    parse(dateString) {
        return QuickDate.Parse(dateString);
    }
    /**
     * 闰年判断
     */
    leapYear(date = null, isDate = true) {
        const d = this.auto(date);
        const year = isDate ? d.getFullYear() : date;
        return year % 400 !== 0 && year % 4 === 0;
    }
    /**
     * 格式化输出时间
     * @param {string} tpl 字符串模板
     * @param {string | number | Date | null} date 被转换的时间
     *
     * @return {string} 2000/01/01 00:00:00
     */
    format(tpl = 'yyyy/mm/dd hh:ii:ss', date = null) {
        const d = this.auto(date);
        const o = {};
        o.yyyy = d.getFullYear();
        o.yy = `${o.yyyy}`.substring(2);
        o.m = d.getMonth() + 1;
        o.mm = o.m < 10 ? `0${o.m}` : o.m;
        o.d = d.getDate();
        o.dd = o.d < 10 ? `0${o.d}` : o.d;
        if (tpl && tpl.indexOf('h') > -1) {
            o.h = d.getHours();
            o.hh = o.h < 10 ? (`0${o.h}`) : o.h;
            o.i = d.getMinutes();
            o.ii = o.i < 10 ? (`0${o.i}`) : o.i;
            o.s = d.getSeconds();
            o.ss = o.s < 10 ? (`0${o.s}`) : o.s;
            o.ms = d.getMilliseconds();
            if (o.ms < 10) {
                o.mss = `00${o.s}`;
            }
            else if (o.ms < 100) {
                o.mss = `0${o.ms}`;
            }
            else {
                o.mss = o.ms;
            }
        }
        if (tpl && tpl.indexOf('w') > -1) {
            o.w = d.getDay() || 7;
            o.ww = `0${o.w}`;
            o.wz = ('日一二三四五六')[o.w % 7];
        }
        const dateTemplate = tpl || 'yyyy/mm/dd';
        const regexp = /(yyyy|yy|mss|ms|mm|m|dd|d|hh|h|ii|i|ss|s|wz|ww|w)/ig;
        return dateTemplate.replace(regexp, (key) => o[key.toLowerCase()]);
    }
    /**
     * 自动处理跨年份时间格式化
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
     * @param {string | number | Date | null} date 时间字符串或时间对象
     */
    autoYearFormat(symbol = '/', date = null) {
        const d = this.auto(date);
        const dYear = d.getFullYear();
        const nowYear = (new Date()).getFullYear();
        if (nowYear !== dYear) {
            const tpl = QuickDate.GetFormatTpl(symbol, true);
            return this.format(tpl, d);
        }
        const tpl = QuickDate.GetFormatTpl(symbol);
        return this.format(tpl, d);
    }
    /**
     * 获取指定日期的开始时间戳或者结束时间戳
     * @param {string | Date | number} date 日期符号
     * @param {string} tag start开始 end结束
     * @returns {Date} 毫秒级时间戳
     */
    getDateFixed(date, tag = 'start') {
        const d = this.auto(date);
        if (tag === 'start') {
            d.setHours(0, 0, 0, 0);
        }
        if (tag === 'end') {
            d.setHours(23, 59, 59, 999);
        }
        return d;
    }
    /**
     * 获取指定日期的开始时间戳或者结束时间戳
     * @param {string | Date | number} date 日期符号
     * @param {string} tag start开始 end结束
     * @returns {number} 毫秒级时间戳
     */
    getTimeFixed(date, tag = 'start') {
        const d = this.getDateFixed(date, tag);
        return d.getTime();
    }
    /**
     * 多久前or后
     * @param {string | number | Date} aDate 对比时间
     * @param {string | number | Date | null} bDate 缺省为当前时间
     * @param {number} maxDays 对比的最大天数，超过后返回aDate的时间字符串
     * @param {(aDate: string | number | Date, bDate: string | number | Date | null, maxDays: number, s: number, symbol: string) => string} callback 当超过指定天数后，可选执行回调函数的方式返回一个指定的字符串内容
     *
     * @return {string} xxx前/后
     */
    ago(aDate, bDate = null, maxDays = 365, callback = null) {
        const aTime = this.auto(aDate).getTime();
        const bTime = this.auto(bDate).getTime();
        const s = Math.abs(aTime - bTime);
        const symbol = aTime - bTime < 0 ? '前' : '后';
        if (s < 5 * 1000) {
            return symbol === '前' ? '刚刚' : '即将';
        }
        if (s < 60 * 1000) {
            return `1分钟${symbol}`;
        }
        if (s < 60 * 60 * 1000) {
            return `${Math.floor(s / 60 / 1000)}分钟${symbol}`;
        }
        if (s < 24 * 60 * 60 * 1000) {
            return `${Math.floor(s / 60 / 60 / 1000)}小时${symbol}`;
        }
        if (s < maxDays * 24 * 60 * 60 * 1000) {
            return `${Math.floor(s / 24 / 60 / 60 / 1000)}天${symbol}`;
        }
        if (typeof callback === 'function') {
            return callback(aDate, bDate, maxDays, s, symbol);
        }
        return this.format(undefined, aDate);
    }
    /**
     * 两个日期之间的相差天数
     * @param {string | Date} aDate A日期
     * @param {string | Date | null} bDate B日期 缺省为当前时间
     * @returns {number} 相差天数
     */
    diffDays(aDate, bDate) {
        const a = this.getTimeFixed(aDate, 'start');
        const b = this.getTimeFixed(bDate, 'start');
        const s = Math.abs(a - b);
        return Math.floor(s / 24 / 60 / 60 / 1000);
    }
    /**
     * 获取指定月份最后一天
     * @param {number} year 年份
     * @param {number} month 月份
     * @return {Date}
     */
    getLastDayOfMonth(year, month) {
        const date = new Date(year, month, 0);
        date.setHours(23, 59, 59, 999);
        return date;
    }
    /**
     * 获取当前季度
     * @param {string | Date | null} date 日期对象或者符号
     */
    getCurrentQuarter(date = null) {
        const d = this.auto(date);
        const m = d.getMonth();
        return Math.floor(m / 3) + 1;
    }
    /**
     *  获取某个时间前后的天数的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeDaysDate(num, date = new Date()) {
        const d = this.auto(date);
        d.setDate(d.getDate() + num);
        return d;
    }
    /**
     *  获取某个时间前后的月份的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeMonthsDate(num, date = new Date()) {
        const d = this.auto(date);
        d.setMonth(d.getMonth() + num);
        return d;
    }
    /**
     *  获取某个时间前后的小时的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeHoursDate(num, date = new Date()) {
        const d = this.auto(date);
        d.setHours(d.getHours() + num);
        return d;
    }
    /**
     *  获取某个时间前后的分钟的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeMinutesDate(num, date = new Date()) {
        const d = this.auto(date);
        d.setMinutes(d.getMinutes() + num);
        return d;
    }
    /**
     *  获取某个时间前后的秒的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeSecondsDate(num, date = new Date()) {
        const d = this.auto(date);
        d.setSeconds(d.getSeconds() + num);
        return d;
    }
    /**
     * 获取时间的月份的第一天的开始
     * @param {string | Date} date 日期符号
     */
    getFirstDayOfMonth(date = new Date()) {
        const d = this.auto(date);
        d.setDate(1);
        return this.getDateFixed(d, 'start');
    }
    /**
     * 获取时间的月份的最后一天的结束
     * @param {string | Date} date 日期符号
     */
    getLastDayOfMonthTime(date = new Date()) {
        const d = this.auto(date);
        const lastDate = this.getLastDayOfMonth(d.getFullYear(), d.getMonth() + 1);
        return lastDate.getTime();
    }
    /**
     * 通过分隔符来获取时间模板
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
     * @param {boolean} hasYear 是否需要有年份
     */
    static GetFormatTpl(symbol = '/', hasYear = false) {
        if (typeof symbol === 'string') {
            return hasYear ? `yyyy${symbol}mm${symbol}dd` : `mm${symbol}dd`;
        }
        if (Array.isArray(symbol)) {
            const str = hasYear ? ['yyyy', 'mm', 'dd'] : ['mm', 'dd'];
            return str.map((k, i) => `${k}${symbol[i] || ''}`).join('');
        }
        if (typeof symbol === 'object') {
            const { y, m, d } = symbol;
            return hasYear ? `yyyy${y}mm${m}dd${d}` : `mm${m}dd${d}`;
        }
        return hasYear ? 'yyyy/mm/dd' : 'mm/dd';
    }
    /**
     * 快速把时间字符串转为时间对象
     * @param {string} dateString 时间字符串
     *
     * @return {Date}
     */
    static Parse(dateString) {
        return new Date(dateString
            .replace(/-/g, '/')
            .replace('T', ' ')
            .replace(/\..*$/, '')
            .replace(/Z/, ' UTC'));
    }
    /**
     * 克隆一个时间对象
     * @param {Date} date 日期
     *
     * @return {Date}
     */
    static Clone(date) {
        return new Date(date.getTime());
    }
    /**
     *  自动处理跨年份时间格式化
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
     * @param {Date} d 日期对象
     * @param {number} year 年份
     */
    static AutoYearFormat(symbol = '/', d = new Date(), year = (new Date()).getFullYear()) {
        if (year !== d.getFullYear()) {
            const tpl = QuickDate.GetFormatTpl(symbol, true);
            return QuickDate.Format(tpl, d);
        }
        const tpl = QuickDate.GetFormatTpl(symbol);
        return QuickDate.Format(tpl, d);
    }
    /**
     * 格式化输出时间
     * @param {string} tpl 字符串模板
     * @param {string | number | Date | null} date 被转换的时间
     *
     * @return {string} 2000/01/01 00:00:00
     */
    static Format(tpl = 'yyyy/mm/dd hh:ii:ss', date = null) {
        const d = new QuickDate().auto(date);
        const o = {};
        o.yyyy = d.getFullYear();
        o.yy = `${o.yyyy}`.substring(2);
        o.m = d.getMonth() + 1;
        o.mm = o.m < 10 ? `0${o.m}` : o.m;
        o.d = d.getDate();
        o.dd = o.d < 10 ? `0${o.d}` : o.d;
        if (tpl && tpl.indexOf('h') > -1) {
            o.h = d.getHours();
            o.hh = o.h < 10 ? (`0${o.h}`) : o.h;
            o.i = d.getMinutes();
            o.ii = o.i < 10 ? (`0${o.i}`) : o.i;
            o.s = d.getSeconds();
            o.ss = o.s < 10 ? (`0${o.s}`) : o.s;
            o.ms = d.getMilliseconds();
            if (o.ms < 10) {
                o.mss = `00${o.s}`;
            }
            else if (o.ms < 100) {
                o.mss = `0${o.ms}`;
            }
            else {
                o.mss = o.ms;
            }
        }
        if (tpl && tpl.indexOf('w') > -1) {
            o.w = d.getDay() || 7;
            o.ww = `0${o.w}`;
            o.wz = ('日一二三四五六')[o.w % 7];
        }
        const dateTemplate = tpl || 'yyyy/mm/dd';
        const regexp = /(yyyy|yy|mss|ms|mm|m|dd|d|hh|h|ii|i|ss|s|wz|ww|w)/ig;
        return dateTemplate.replace(regexp, (key) => o[key.toLowerCase()]);
    }
}
// 默认实例化
const quickDate = new QuickDate();

/**
 * 求和方法
 */
/**
 * 计算传入参数的总和。
 *
 * 该函数接受一个或多个数字或数字字符串作为参数，并返回它们的总和。
 * 它能够处理包括浮点数在内的各种数值形式，并确保计算结果的精度。
 * 如果没有传入任何参数，或者所有参数都不是有效的数字，则返回0。
 *
 * @param args 可以是数字或数字字符串的参数列表。
 * @returns 返回传入参数的总和。如果没有任何有效参数，则返回0。
 */
const sum = (...args) => {
    if (args.length === 0)
        return 0;
    const nums = args
        .map(arg => (typeof arg === 'string' ? arg.trim() : arg))
        .filter(arg => arg !== '' && !isNaN(Number(arg)))
        .map(Number);
    if (nums.length === 0)
        return 0;
    if (nums.length === 1)
        return nums[0];
    return nums.reduce((total, num) => {
        const [intPart, decPart] = num.toString().split('.');
        if (decPart) {
            const factor = 10 ** decPart.length;
            return Math.round(total * factor + num * factor) / factor;
        }
        return total + num;
    }, 0);
};
const numbersReduce = sum;

/**
 * 涉及金额的工具
 */
// 转为 分
const toPoint = (num) => Math.floor(Math.round((num * 1000)) / 10);
const toFen = toPoint;
/**
 * 转为 元
 * @param {Number} num
 * @param {Boolean} locale
 * @returns 返回元
 */
const toYuan = (num, locale = false) => {
    const n = num / 100;
    const symbol = n < 0 ? '-' : '';
    // 处理浮点精度不正确的内容
    try {
        const s = n.toString();
        if (s.indexOf('.') > -1 && s.indexOf('.') < s.length - 2) {
            const [int, float] = s.split('.');
            const toYuanString = Number(`${symbol}${Math.abs(Number(int))}.${float.substring(0, 2)}`);
            if (locale) {
                return toYuanString.toLocaleString();
            }
            return toYuanString;
        }
    }
    catch (err) {
        console.error(err);
    }
    if (locale) {
        return n.toLocaleString();
    }
    return n;
};
const toRMB = toYuan;
/**
 * 数字金额转为万
 */
const toWan = (num, fixed = 1, type = 'yuan') => {
    const symbol = num < 0 ? '-' : '';
    const n = type === 'fen' ? Math.abs(toYuan(num)) : Math.abs(num);
    if (n >= 10000) {
        const k = Math.round(n / 1000);
        if (fixed === 0) {
            return `${symbol}${(Math.round(k / 10) * 1).toLocaleString()}万`;
        }
        if (fixed > -1) {
            return `${symbol}${parseFloat((k / 10).toFixed(fixed))}万`;
        }
        return `${symbol}${(parseFloat((k / 10).toFixed(2)) * 1).toLocaleString()}万`;
    }
    return `${symbol}${(parseFloat(n.toFixed(2)) * 1).toLocaleString()}`;
};
const toRMBWan = toWan;
/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2Chinese(100000000) => "壹亿元整"
 */
const number2Chinese = (number, type = 'upper') => {
    // 配置
    const confs = {
        lower: {
            num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
            unit: ['', '十', '百', '千', '万'],
            level: ['', '万', '亿'],
        },
        upper: {
            num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
            unit: ['', '拾', '佰', '仟'],
            level: ['', '万', '亿'],
        },
        decimal: {
            unit: ['分', '角'],
        },
        maxNumber: 999999999999.99,
    };
    // 过滤不合法参数
    if (Number(number) > confs.maxNumber) {
        console.error(`The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`);
        return '';
    }
    const conf = confs[type];
    const numbers = String(Number(number).toFixed(2)).split('.');
    const integer = numbers[0].split('');
    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('');
    // 四位分级
    const levels = integer.reverse().reduce((pre, item, idx) => {
        const level = pre[0] && pre[0].length < 4 ? pre[0] : [];
        const value = item === '0' ? conf.num[Number(item)] : conf.num[Number(item)] + conf.unit[idx % 4];
        level.unshift(value);
        if (level.length === 1) {
            pre.unshift(level);
        }
        else {
            pre.splice(0, 1, level);
        }
        return pre;
    }, []);
    // 整数部分
    const $integer = levels.reduce((pre, item, idx) => {
        let $level = conf.level[levels.length - idx - 1];
        let $item = item.join('').replace(/(零)\1+/g, '$1'); // 连续多个零字的部分设置为单个零字
        // 如果这一级只有一个零字，则去掉这级
        if ($item === '零') {
            $item = '';
            $level = '';
            // 否则如果末尾为零字，则去掉这个零字
        }
        else if ($item[$item.length - 1] === '零') {
            $item = $item.slice(0, $item.length - 1);
        }
        return pre + $item + $level;
    }, '');
    // 小数部分
    const $decimal = decimal
        .map((item, idx) => {
        const { unit } = confs.decimal;
        const $unit = item !== '0' ? unit[unit.length - idx - 1] : '';
        return `${conf.num[Number(item)]}${$unit}`;
    })
        .join('');
    // 如果是整数，则补个整字
    return $integer ? `${$integer}元${$decimal || '整'}` : '';
};
const toUpper = number2Chinese;

var rmbTool = /*#__PURE__*/Object.freeze({
    __proto__: null,
    number2Chinese: number2Chinese,
    toFen: toFen,
    toPoint: toPoint,
    toRMB: toRMB,
    toRMBWan: toRMBWan,
    toUpper: toUpper,
    toWan: toWan,
    toYuan: toYuan
});

export { QuickDate, rmbTool as RMBTool, hasOwn, idCardValid, isEmpty, isObject, isSet, mapping, mobileValid, normalMoneyValid, numberToFixedValid, numbersReduce, quickDate, sum };
