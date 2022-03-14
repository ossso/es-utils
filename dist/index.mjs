/**
 * 身份证验证
 */
const idCardValid = (val) => {
  const str = (val || '').toUpperCase().trim();
  if (!str) {
    return false;
  }
  if (str.length !== 18) {
    return false;
  }
  const city = {
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
  if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)) {
    return false;
  }
  if (!city[str.substr(0, 2)]) {
    return false;
  }
  // 18位身份证需要验证最后一位校验位
  // ∑(ai×Wi)(mod 11)
  // 加权因子
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验位
  const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  let ai = 0;
  let wi = 0;
  for (let i = 0; i < 17; i += 1) {
    ai = str[i];
    wi = factor[i];
    sum += ai * wi;
  }

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

/**
 * 判断是否为空值
 * null|undefined|空字符串 绝对为空
 * 空对象、空数组根据拓展选项来控制
 *
 * @param {Any} val 验证值
 * @param {Object|Boolean} options 验证选项
 * @param {Boolean} options.allEmpty 全部验证
 * @param {Boolean} options.objectEmpty 对象验证
 * @param {Boolean} options.arrayEmpty 数组验证
 *
 * @return {Boolean} 是否为空
 */
const isEmpty = (val, options = null) => {
  let allEmpty = false;
  let objectEmpty = false;
  let arrayEmpty = false;
  if (options === true) {
    allEmpty = true;
  } else {
    const emptyOptions = options || {};
    allEmpty = emptyOptions.allEmpty;
    objectEmpty = emptyOptions.objectEmpty;
    arrayEmpty = emptyOptions.arrayEmpty;
  }

  if (
    val === null
    || val === undefined
    || (val.constructor.name === 'String' && val === '')
  ) {
    return true;
  }
  if (
    (allEmpty || objectEmpty)
    && val.constructor.name === 'Object'
    && Object.getOwnPropertyNames(val).length === 0
  ) {
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
  const str = (val || '').trim();
  if (str.length !== 11) {
    return false;
  }
  return /^1\d{10}/.test(str);
};

// Object Key 对象属性查找封装
class Mapping {
  /**
   * 字符串映射对象
   *
   * @param {object} obj 查找的对象
   * @param {string} key 查找的属性
   *
   * @return {any}
   */
  static mapping(obj, key) {
    if (!obj) {
      return undefined;
    }
    if (key.includes('..')) {
      return undefined;
    }
    if (key.indexOf('.') === 0 || key.lastIndexOf('.') === key.length - 1) {
      return undefined;
    }
    if (key.indexOf('.') > 0) {
      const keys = key.split('.');
      let val;
      let o = obj;
      for (let i = 0; i < keys.length; i += 1) {
        const subKey = keys[i];
        val = Mapping.get(o, subKey);
        o = val;
        if (typeof val === 'undefined') {
          break;
        }
      }
      return val;
    }
    return Mapping.get(obj, key);
  }

  /**
   * 获取数据
   * 支持处理数组指针
   * @param {Object} obj 属性对象
   * @param {String} key 属性名称
   * @return {Any}
   */
  static get(obj, key) {
    if (!key) {
      return undefined;
    }
    // 匹配数组指针
    const match = key.match(/\[(\d*)\]/);
    if (match) {
      const pre = key.substring(0, match.index);
      const [
        index,
        num,
      ] = match;
      if (!num) {
        return undefined;
      }
      const list = pre.length > 0 ? obj[pre] : obj;
      const val = list[+num];
      if (!val) {
        return undefined;
      }
      if (key.length - index.length !== match.index) {
        return Mapping.get(val, key.substring(match.index + index.length));
      }
      return val;
    }
    return obj[key];
  }

  /**
   * 数据根据key的映射进行组装
   */
  static each(map, data) {
    const obj = {};
    Object.keys(map).forEach((i) => {
      obj[i] = Mapping.mapping(data, map[i]);
    });
    return obj;
  }
}

const { mapping } = Mapping;

/**
 * 时间工具
 */

class QuickDate {
  /**
   * 自动处理为时间对象
   * @param {Number|String|Date} date 时间字符串或时间戳或时间对象
   *
   * @return {Date}
   */
  auto(date = null) {
    /**
     * 如果date本身就是时间对象直接返回
     */
    if (date instanceof Date) {
      return this.constructor.Clone(date);
    }
    /**
     * 如果date是false、undefined、null等非法值，返回一个当前时间对象
     */
    if (!date && date !== 0) {
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
    if (typeof date === 'string' && !/\D/.test(date)) {
      return new Date(parseInt(date, 10));
    }
    /**
     * 通常到了这里，都是出现了JS引擎对-/等符号的兼容不支持
     * 丢到parse格式化方法里面去处理
     */
    if (typeof date === 'string') {
      return this.constructor.Parse(date);
    }
    throw Error(`无法将“${date}”转为可用时间对象`);
  }

  /**
   * Alias By QuickDate.Parse
   * 时间字符串转为时间
   * @param {String} dateString 时间字符串
   *
   * @return {Date}
   */
  parse(dateString) {
    return this.constructor.Parse(dateString);
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
   * @param {String} tpl 字符串模板
   * @param {String|Number|Date} date 被转换的时间
   *
   * @return {String} 2000/01/01 00:00:00
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
      } else
      if (o.ms < 100) {
        o.mss = `0${o.ms}`;
      } else {
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
   * @param {String|Array|Object} symbol 分割符号
   * @param {String|Number|Date} date 时间字符串或时间对象
   */
  autoYearFormat(symbol = '/', date = null) {
    const d = this.auto(date);
    const dYear = d.getFullYear();
    const nowYear = (new Date()).getFullYear();
    if (nowYear !== dYear) {
      const tpl = this.constructor.GetFormatTpl(symbol, true);
      return this.format(tpl, d);
    }
    const tpl = this.constructor.GetFormatTpl(symbol);
    return this.format(tpl, d);
  }

  /**
   * 多久前or后
   * @param {String|Number|Date} aDate 对比时间
   * @param {String|Number|Date} bDate 缺省为当前时间
   * @param {Number} maxDays 对比的最大天数，超过后返回aDate的时间字符串
   * @param {Function} callback 当超过指定天数后，可选执行回调函数的方式返回一个指定的字符串内容
   *
   * @return {String} xxx前/后
   */
  ago(aDate, bDate = null, maxDays = 365, callback = null) {
    const aTime = this.auto(aDate).getTime();
    const bTime = this.auto(bDate).getTime();
    const s = Math.abs(aTime - bTime);
    const symbol = aTime - bTime > 0 ? '后' : '前';
    if (s < 5 * 1000) {
      if (symbol === '前') {
        return '刚刚';
      }
      return '即将';
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
    return this.format(null, aDate);
  }

  /**
   * 两个日期之间的相差天数
   * @param {String|Date} aDate A日期
   * @param {String|Date} bDate B日期
   *
   * @return {Number} days
   */
  diffDays(aDate, bDate) {
    const aDateClone = this.auto(aDate);
    aDateClone.setHours(0, 0, 0, 0);
    const aTime = aDateClone.getTime();
    const bDateClone = this.auto(bDate);
    bDateClone.setHours(0, 0, 0, 0);
    const bTime = bDateClone.getTime();
    const day = 24 * 60 * 60 * 1000;
    return Math.ceil(Math.abs(aTime - bTime) / day);
  }

  /**
   * 增加或者减少天数
   * @param {Number} num 变更的天数
   * @param {String|Number|Date} date 变更日期
   *
   * @return {Date}
   */
  changeDate(num, date = null) {
    const d = this.auto(date);
    d.setDate(d.getDate() + num);
    return d;
  }

  /**
   * 增加或者减少合同版本月份数日期
   * @param {Number} num 变更的月数
   * @param {String|Number|Date} date 变更日期
   *
   * @return {Date}
   */
  changeContractMonth(num, date = null) {
    const d = this.auto(this.format('yyyy-mm-dd hh:ii:ss', date));
    if (num === 0) {
      return d;
    }
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth();
    const currentDate = d.getDate();
    const currentEndOfMonth = QuickDate.endOfMonth(
      currentYear,
      currentMonth + 1,
      currentDate,
    );
    const countMonth = currentMonth + parseInt(num, 10);
    const yearNumber = currentYear + Math.ceil(countMonth / 12) - 1;
    let monthNumber = countMonth;
    let dateNumber = currentDate;

    if (num < 0) {
      if (currentEndOfMonth) {
        monthNumber += 1;
        dateNumber = 1;
      } else {
        dateNumber += 1;
      }
      return new Date(currentYear, monthNumber, dateNumber, 0, 0, 0, 0);
    }

    const reDate = () => new Date(currentYear, monthNumber, dateNumber, 23, 59, 59, 999);
    if (currentDate === 1) {
      dateNumber = 0;
      return reDate();
    }
    if (currentEndOfMonth) {
      if (monthNumber % 12 === 1) {
        dateNumber = this.leapYear(yearNumber, false) ? 29 : 28;
        return reDate();
      }
      if (currentMonth === 1) {
        dateNumber = 30;
        return reDate();
      }
    }
    dateNumber -= 1;
    return reDate();
  }

  /**
   * 克隆时间
   * @param {Date} date 时间
   */
  static Clone(date) {
    return new Date(date.toString());
  }

  /**
   * 时间字符串转为时间
   * @param {String} dateString 时间字符串
   *
   * @return {Date}
   */
  static Parse(dateString) {
    /**
     * date可能是一个符合时间表达式的字符串，尝试用new Date的方式创建
     */
    let d = new Date(dateString);
    if (Number.isInteger(d.getTime())) {
      return d;
    }
    const ds = dateString
      // 针对 2000-01-01T00:00 无zone定位格式
      .replace(/T/g, ' ')
      // safari的JS引擎对-不支持，转为斜杠
      .replace(/-/g, '/')
      // 针对 2000.01.01 00:00
      .replace(/\./g, '/')
      // 中文描述字符通常无法转为时间对象
      .replace(/(日|秒)/g, '')
      .replace(/(时|分)/g, ':')
      .replace(/(年|月)/g, '/');
    d = new Date(ds);
    if (!d.toJSON()) {
      throw Error(`无法处理字符串“${dateString}” ${d.toString()}`);
    }
    return d;
  }

  /**
   * 生产时间格式化的字符串模板
   * @param {String|Array|Object} symbol 分割符号
   * @param {Boolean} hasYear 是否包含年份
   *
   * @return {String}
   */
  static GetFormatTpl(symbol, hasYear = false) {
    if (Array.isArray(symbol)) {
      if (symbol.length === 1) {
        return QuickDate.GetFormatTpl(symbol[0], hasYear);
      }
      if (symbol.length === 2) {
        if (hasYear) {
          return `yyyy mm${symbol[0]}dd${symbol[1]}`;
        }
        return `mm${symbol[0]}dd${symbol[1]}`;
      }
      if (symbol.length === 3) {
        if (hasYear) {
          return `yyyy${symbol[0]}mm${symbol[1]}dd${symbol[2]}`;
        }
        return `mm${symbol[1]}dd${symbol[2]}`;
      }
    } else if (typeof symbol === 'object') {
      if (hasYear) {
        return `yyyy${symbol.y}mm${symbol.m}dd${symbol.d}`;
      }
      return `mm${symbol.m}dd${symbol.d}`;
    }
    if (hasYear) {
      return ['yyyy', 'mm', 'dd'].join(symbol);
    }
    return ['mm', 'dd'].join(symbol);
  }

  /**
   * 判断月底
   *
   * @param {Number} year 年
   * @param {Number} month 月
   * @param {Number} date 日
   *
   * @return {Boolean}
   */
  static endOfMonth(year, month, date) {
    const endOfMonth = new Date(year, month, 0);
    return endOfMonth.getDate() === date;
  }
}

const quickDate = new QuickDate();

export { hasOwn, idCardValid, isEmpty, isObject, isSet, mapping, mobileValid, normalMoneyValid, numberToFixedValid, quickDate };
