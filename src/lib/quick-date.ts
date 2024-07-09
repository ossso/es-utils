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
  auto(date: number | string | Date | null = null): Date {
    /**
     * 如果date本身就是时间对象直接返回
     */
    if (date instanceof Date) {
      return QuickDate.Clone(date);
    }
    /**
     * 如果date是false、undefined、null等非法值，返回一个当前时间对象
     */
    if (
      date === undefined
      || date === null
      || date === ''
    ) {
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
  parse(dateString: string): Date {
    return QuickDate.Parse(dateString);
  }

  /**
   * 闰年判断
   */
  leapYear(date: number | string | Date | null = null, isDate: boolean = true): boolean {
    const d = this.auto(date);
    const year = isDate ? d.getFullYear() : (date as number);
    return year % 400 !== 0 && year % 4 === 0;
  }

  /**
   * 格式化输出时间
   * @param {string} tpl 字符串模板
   * @param {string | number | Date | null} date 被转换的时间
   *
   * @return {string} 2000/01/01 00:00:00
   */
  format(tpl: string = 'yyyy/mm/dd hh:ii:ss', date: string | number | Date | null = null): string {
    const d = this.auto(date);
    const o: Record<string, string | number> = {};
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
      } else if (o.ms < 100) {
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
    return dateTemplate.replace(regexp, (key) => o[key.toLowerCase()] as string);
  }

  /**
   * 自动处理跨年份时间格式化
   * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
   * @param {string | number | Date | null} date 时间字符串或时间对象
   */
  autoYearFormat(symbol: string | string[] | { y: string, m: string, d: string } = '/', date: string | number | Date | null = null): string {
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
  getDateFixed(date: string | Date | number, tag: 'start' | 'end' = 'start'): Date {
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
  getTimeFixed(date: string | Date | number, tag: 'start' | 'end' = 'start'): number {
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
  ago(
    aDate: string | number | Date,
    bDate: string | number | Date | null = null,
    maxDays: number = 365,
    callback: ((aDate: string | number | Date, bDate: string | number | Date | null, maxDays: number, s: number, symbol: string) => string) | null = null
  ): string {
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
  diffDays(aDate: string | Date, bDate: string | Date): number {
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
  getLastDayOfMonth(year: number, month: number): Date {
    const date = new Date(year, month, 0);
    date.setHours(23, 59, 59, 999);
    return date;
  }

  /**
   * 获取当前季度
   * @param {string | Date | null} date 日期对象或者符号
   */
  getCurrentQuarter(date: string | Date | null = null): number {
    const d = this.auto(date);
    const m = d.getMonth();
    return Math.floor(m / 3) + 1;
  }

  /**
   *  获取某个时间前后的天数的时间对象
   * @param {number} num 数值 正负都可以
   * @param {string | Date} date 日期符号
   */
  getSomeDaysDate(num: number, date: string | Date = new Date()): Date {
    const d = this.auto(date);
    d.setDate(d.getDate() + num);
    return d;
  }

  /**
   *  获取某个时间前后的月份的时间对象
   * @param {number} num 数值 正负都可以
   * @param {string | Date} date 日期符号
   */
  getSomeMonthsDate(num: number, date: string | Date = new Date()): Date {
    const d = this.auto(date);
    d.setMonth(d.getMonth() + num);
    return d;
  }

  /**
   *  获取某个时间前后的小时的时间对象
   * @param {number} num 数值 正负都可以
   * @param {string | Date} date 日期符号
   */
  getSomeHoursDate(num: number, date: string | Date = new Date()): Date {
    const d = this.auto(date);
    d.setHours(d.getHours() + num);
    return d;
  }

  /**
   *  获取某个时间前后的分钟的时间对象
   * @param {number} num 数值 正负都可以
   * @param {string | Date} date 日期符号
   */
  getSomeMinutesDate(num: number, date: string | Date = new Date()): Date {
    const d = this.auto(date);
    d.setMinutes(d.getMinutes() + num);
    return d;
  }

  /**
   *  获取某个时间前后的秒的时间对象
   * @param {number} num 数值 正负都可以
   * @param {string | Date} date 日期符号
   */
  getSomeSecondsDate(num: number, date: string | Date = new Date()): Date {
    const d = this.auto(date);
    d.setSeconds(d.getSeconds() + num);
    return d;
  }

  /**
   * 获取时间的月份的第一天的开始
   * @param {string | Date} date 日期符号
   */
  getFirstDayOfMonth(date: string | Date = new Date()): Date {
    const d = this.auto(date);
    d.setDate(1);
    return this.getDateFixed(d, 'start');
  }

  /**
   * 获取时间的月份的最后一天的结束
   * @param {string | Date} date 日期符号
   */
  getLastDayOfMonthTime(date: string | Date = new Date()): number {
    const d = this.auto(date);
    const lastDate = this.getLastDayOfMonth(d.getFullYear(), d.getMonth() + 1);
    return lastDate.getTime();
  }

  /**
   * 通过分隔符来获取时间模板
   * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
   * @param {boolean} hasYear 是否需要有年份
   */
  static GetFormatTpl(symbol: string | string[] | { y: string, m: string, d: string } = '/', hasYear: boolean = false): string {
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
  static Parse(dateString: string): Date {
    return new Date(
      dateString
        .replace(/-/g, '/')
        .replace('T', ' ')
        .replace(/\..*$/, '')
        .replace(/Z/, ' UTC')
    );
  }

  /**
   * 克隆一个时间对象
   * @param {Date} date 日期
   *
   * @return {Date}
   */
  static Clone(date: Date): Date {
    return new Date(date.getTime());
  }

  /**
   *  自动处理跨年份时间格式化
   * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
   * @param {Date} d 日期对象
   * @param {number} year 年份
   */
  static AutoYearFormat(symbol: string | string[] | { y: string, m: string, d: string } = '/', d: Date = new Date(), year: number = (new Date()).getFullYear()): string {
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
  static Format(tpl: string = 'yyyy/mm/dd hh:ii:ss', date: string | number | Date | null = null): string {
    const d = new QuickDate().auto(date);
    const o: Record<string, string | number> = {};
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
      } else if (o.ms < 100) {
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
    return dateTemplate.replace(regexp, (key) => o[key.toLowerCase()] as string);
  }
}

// 默认实例化
const quickDate = new QuickDate();

// 导出
export { 
  QuickDate,
  quickDate,
};

export default quickDate;
