'use strict';

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
const isObject = (val) => (typeof val === 'object'
    && val !== null
    && val.constructor.name === 'Object');
/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
const isSet = (val) => val !== null && val !== undefined;
/**
 * 判断一个值是否为空。
 *
 * @param val 要检查的值。
 * @param options 选项对象，或布尔值指示是否检查所有类型的空值。如果为布尔值，则true表示检查所有类型的空值，false表示只检查基本类型的空值。如果为对象，则可以指定更详细的空值检查选项。
 * @returns 如果值为空，则返回true；否则返回false。
 */
const isEmpty = (val, options = null) => {
    // 初始化各种空检查的标志
    let allEmpty = false;
    let objectEmpty = false;
    let arrayEmpty = false;
    // 处理options参数，如果是布尔值，则统一空检查标准；否则根据IsEmptyOptions对象设置空检查选项
    if (options === true) {
        allEmpty = true;
    }
    else {
        const emptyOptions = options || {};
        allEmpty = emptyOptions.allEmpty || false;
        objectEmpty = emptyOptions.objectEmpty || false;
        arrayEmpty = emptyOptions.arrayEmpty || false;
    }
    // 检查基本类型的空值：null、undefined、空字符串
    if (val === null
        || val === undefined
        || (typeof val === 'string' && val === '')) {
        return true;
    }
    // 检查对象类型的空值，如果启用了objectEmpty选项且val是一个空对象
    if ((allEmpty || objectEmpty)
        && isObject(val)
        && Object.getOwnPropertyNames(val).length === 0) {
        return true;
    }
    // 检查数组类型的空值，如果启用了arrayEmpty选项且val是一个空数组
    if ((allEmpty || arrayEmpty) && Array.isArray(val) && val.length === 0) {
        return true;
    }
    // 如果以上所有检查都未通过，则认为值不为空
    return false;
};
/**
 * 浮点数字小数点位数验证
 */
/**
 * 检查给定的值是否可以被固定到指定位数的小数。
 *
 * 此函数主要用于验证一个数字或数字字符串是否可以被四舍五入到指定的小数位数，
 * 而不会引起不正确的表示。它首先检查值是否是一个有效的数字，然后检查小数点的位置
 * 和数量，确保数值的格式正确。如果值包含小数点，它还会验证小数部分的长度是否符合
 * 指定的固定位数。
 *
 * @param val 待检查的值，可以是数字或数字字符串。
 * @param fixed 小数点后的固定位数，默认为2。
 * @returns 如果值可以被固定到指定的小数位数，则返回true；否则返回false。
 */
const numberToFixedValid = (val, fixed = 2) => {
    // 检查值是否是NaN（不是一个数字）
    if (Number.isNaN(+val)) {
        return false;
    }
    // 将值转换为字符串
    const str = val.toString();
    // 获取第一个小数点的位置
    const dotIndex = str.indexOf('.');
    // 获取最后一个（也是唯一一个）小数点的位置
    const dotIndex2 = str.lastIndexOf('.');
    // 检查小数点是否位于字符串的起始位置，或者字符串中是否存在多个小数点
    if (dotIndex === 0 || dotIndex !== dotIndex2) {
        return false;
    }
    // 如果字符串中包含小数点，检查小数部分的长度是否小于等于指定的固定位数加2（包括小数点和可能的正负号）
    if (dotIndex > -1) {
        return str.length - dotIndex < (fixed + 2);
    }
    // 如果字符串中不包含小数点，或者小数部分的长度符合要求，则返回true
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
        // 检查 obj 是否为对象，如果不是，返回 undefined
        if (!obj || typeof obj !== 'object') {
            return undefined;
        }
        // 检查 key 是否为字符串，如果不是，返回 undefined
        if (typeof key !== 'string') {
            return undefined;
        }
        // 检查 key 是否包含非法字符，如果包含，返回 undefined
        if (key.includes('..') || key.startsWith('.') || key.endsWith('.')) {
            return undefined;
        }
        // 如果 key 包含 '.'，使用 reduce 方法递归获取嵌套属性值
        if (key.includes('.')) {
            return key.split('.').reduce((val, k) => (val !== undefined ? Mapping.get(val, k) : undefined), obj);
        }
        // 如果 key 不包含 '.'，直接获取属性值
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
     * @param {Record<string, unknown>} data 数据对象
     *
     * @return {Record<string, unknown>}
     */
    static each(keys, data) {
        // 检查 keys 是否为对象，如果不是，返回 undefined
        if (!keys || typeof keys !== 'object') {
            return undefined;
        }
        // 检查 data 是否为对象，如果不是，返回 undefined
        if (!data || typeof data !== 'object') {
            return undefined;
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

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
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
    // eslint-disable-next-line class-methods-use-this
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
    // eslint-disable-next-line class-methods-use-this
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
        return QuickDate.Format(tpl, d);
    }
    /**
     * 自动处理跨年份时间格式化
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
     * @param {string | number | Date | null} date 时间字符串或时间对象
     *
     * @return {string} 格式化后的时间字符串
     */
    autoYearFormat(symbol = '/', date = null) {
        const d = this.auto(date);
        const dYear = d.getFullYear();
        const nowYear = new Date().getFullYear();
        const tpl = QuickDate.GetFormatTpl(symbol, nowYear !== dYear);
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
     * @param {
     *  (
     *  aDate: string | number | Date,
     *  bDate: string | number | Date | null,
     *  maxDays: number,
     *  s: number,
     *  symbol: string) => string
     * } callback 当超过指定天数后，可选执行回调函数的方式返回一个指定的字符串内容
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
        // 兼容旧格式
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
    // eslint-disable-next-line class-methods-use-this
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
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分隔符号
     * @param {boolean} hasYear 是否需要有年份
     * @returns {string} 时间模板
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
            const { y = '', m = '', d = '' } = symbol;
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
        // 合并多个 replace 操作
        const formattedDateString = dateString
            .replace(/-/g, '/')
            .replace('T', ' ')
            .replace(/\..*$/, '')
            .replace(/Z/, ' UTC');
        const date = new Date(formattedDateString);
        // 检查生成的日期对象是否有效
        if (Number.isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        return date;
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
        const padZero = (num, length = 2) => String(num).padStart(length, '0');
        const o = {
            yyyy: d.getFullYear(),
            yy: String(d.getFullYear()).substring(2),
            m: d.getMonth() + 1,
            mm: padZero(d.getMonth() + 1),
            d: d.getDate(),
            dd: padZero(d.getDate()),
            h: d.getHours(),
            hh: padZero(d.getHours()),
            i: d.getMinutes(),
            ii: padZero(d.getMinutes()),
            s: d.getSeconds(),
            ss: padZero(d.getSeconds()),
            ms: d.getMilliseconds(),
            mss: padZero(d.getMilliseconds(), 3),
            w: d.getDay() || 7,
            ww: padZero(d.getDay() || 7),
            wz: '日一二三四五六'[d.getDay() % 7],
        };
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
        .map((arg) => (typeof arg === 'string' ? arg.trim() : arg))
        .filter((arg) => arg !== '' && !Number.isNaN(+arg))
        .map(Number);
    if (nums.length === 0)
        return 0;
    if (nums.length === 1)
        return nums[0];
    return nums.reduce((total, num) => {
        const [, decPart] = num.toString().split('.');
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
 *
 * 将数值转换为人民币格式的字符串或数字。
 * @param num 要转换的数值，单位为分。
 * @param locale 是否使用本地化格式，默认为false。
 * @returns 返回转换后的人民币字符串或数字。如果locale为true，则返回本地化格式的字符串；否则返回标准格式的字符串或数字。
 */
const toYuan = (num, locale = false) => {
    // 将数值转换为元的单位
    const n = num / 100;
    // 确定数值的正负符号
    const symbol = n < 0 ? '-' : '';
    // 处理浮点数精度问题，尝试将数值转换为人民币格式
    // 处理浮点精度不正确的内容
    try {
        const s = n.toString();
        // 判断是否有小数点，并且小数点后至少有两位
        if (s.indexOf('.') > -1 && s.indexOf('.') < s.length - 2) {
            const [int, float] = s.split('.');
            // 构造人民币标准格式的字符串
            const toYuanString = Number(`${symbol}${Math.abs(Number(int))}.${float.substring(0, 2)}`);
            // 根据locale参数决定返回本地化格式还是标准格式
            if (locale) {
                return toYuanString.toLocaleString();
            }
            return toYuanString;
        }
    }
    catch (err) {
        // 捕获并记录转换过程中的错误
        console.error(err);
    }
    // 如果数值格式不符合要求，或者locale为true，则返回本地化格式的数值
    if (locale) {
        return n.toLocaleString();
    }
    return n;
};
const toRMB = toYuan;
/**
 * 数字金额转为万
 * 大于1万的，小数点后一位四舍五入
 *
 * 将数字转换为万为单位的字符串表示，支持指定保留位数和单位（元或分）。
 * @param num 要转换的数字
 * @param fixed 保留小数点后的位数，默认为1位
 * @param type 单位类型，可选值为'fen'（分）或'yuan'（元，默认值为元）
 * @returns 转换后的字符串
 */
const toWan = (num, fixed = 1, type = 'yuan') => {
    // 根据数字正负决定符号
    const symbol = num < 0 ? '-' : '';
    // 根据类型转换并取绝对值，如果是分，则先转换为元
    const n = type === 'fen' ? Math.abs(toYuan(num)) : Math.abs(num);
    // 格式化数字，保留指定的小数位数
    const formatNumber = (value, decimalPlaces) => value.toFixed(decimalPlaces).replace(/(\.0+|0+)$/, '');
    // 如果数字大于等于1万
    if (n >= 10000) {
        // 计算万位数
        const k = n / 10000;
        // 如果不需要保留小数
        if (fixed === 0) {
            return `${symbol}${Math.round(k).toLocaleString()}万`;
        }
        // 返回万位数，保留指定位数的小数
        return `${symbol}${formatNumber(k, fixed)}万`;
    }
    // 如果数字小于1万，直接转换并返回，保留指定小数位数
    return `${symbol}${formatNumber(n, fixed)}`;
};
const toRMBWan = toWan;
/**
 * 自动处理数字转换为万或显示全部数字
 * 小于1万的显示全部数字，支持fixed参数；如果大于1万的调用toWan方法
 *
 * @param num 要转换的数字
 * @param fixed 保留小数点后的位数，默认为1位
 * @param type 单位类型，可选值为'fen'（分）或'yuan'（元，默认值为元）
 * @returns 转换后的字符串
 */
const autoToWan = (num, fixed = 1, type = 'yuan') => {
    // 根据类型转换并取绝对值，如果是分，则先转换为元
    const n = type === 'fen' ? Math.abs(toYuan(num)) : Math.abs(num);
    // 格式化数字，保留指定的小数位数
    const formatNumber = (value, decimalPlaces) => value.toFixed(decimalPlaces).replace(/(\.0+|0+)$/, '');
    // 如果数字小于1万，直接转换并返回，保留指定小数位数
    if (n < 10000) {
        return formatNumber(n, fixed);
    }
    // 如果数字大于等于1万，调用toWan方法
    return toWan(num, fixed, type);
};
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
    autoToWan: autoToWan,
    number2Chinese: number2Chinese,
    toFen: toFen,
    toPoint: toPoint,
    toRMB: toRMB,
    toRMBWan: toRMBWan,
    toUpper: toUpper,
    toWan: toWan,
    toYuan: toYuan
});

exports.QuickDate = QuickDate;
exports.RMBTool = rmbTool;
exports.hasOwn = hasOwn;
exports.idCardValid = idCardValid;
exports.isEmpty = isEmpty;
exports.isObject = isObject;
exports.isSet = isSet;
exports.mapping = mapping;
exports.mobileValid = mobileValid;
exports.normalMoneyValid = normalMoneyValid;
exports.numberToFixedValid = numberToFixedValid;
exports.numbersReduce = numbersReduce;
exports.quickDate = quickDate;
exports.sum = sum;
