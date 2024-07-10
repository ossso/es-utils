/**
 * 时间工具
 */
declare class QuickDate {
    /**
     * 自动处理为时间对象
     * @param {number | string | Date | null} date 时间字符串或时间戳或时间对象
     *
     * @return {Date}
     */
    auto(date?: number | string | Date | null): Date;
    /**
     * Alias By QuickDate.Parse
     * 时间字符串转为时间
     * @param {string} dateString 时间字符串
     *
     * @return {Date}
     */
    parse(dateString: string): Date;
    /**
     * 闰年判断
     */
    leapYear(date?: number | string | Date | null, isDate?: boolean): boolean;
    /**
     * 格式化输出时间
     * @param {string} tpl 字符串模板
     * @param {string | number | Date | null} date 被转换的时间
     *
     * @return {string} 2000/01/01 00:00:00
     */
    format(tpl?: string, date?: string | number | Date | null): string;
    /**
     * 自动处理跨年份时间格式化
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
     * @param {string | number | Date | null} date 时间字符串或时间对象
     *
     * @return {string} 格式化后的时间字符串
     */
    autoYearFormat(symbol?: string | string[] | {
        y: string;
        m: string;
        d: string;
    }, date?: string | number | Date | null): string;
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
    ago(aDate: string | number | Date, bDate?: string | number | Date | null, maxDays?: number, callback?: ((aDate: string | number | Date, bDate: string | number | Date | null, maxDays: number, s: number, symbol: string) => string) | null): string;
    /**
     * 两个日期之间的相差天数
     * @param {string | Date} aDate A日期
     * @param {string | Date | null} bDate B日期 缺省为当前时间
     * @returns {number} 相差天数
     */
    diffDays(aDate: string | Date, bDate: string | Date): number;
    /**
     * 获取指定日期的开始时间戳或者结束时间对象
     * @param {string | Date | number} date 日期符号
     * @param {string} tag start开始 end结束
     * @returns {Date} 时间对象
     */
    getDateFixed(date: string | Date | number, tag?: 'start' | 'end'): Date;
    /**
     * 获取指定日期的开始时间戳或者结束时间戳
     * @param {string | Date | number} date 日期符号
     * @param {string} tag start开始 end结束
     * @returns {number} 毫秒级时间戳
     */
    getTimeFixed(date: string | Date | number, tag?: 'start' | 'end'): number;
    /**
     * 获取当前季度
     * @param {string | Date | null} date 日期对象或者符号
     */
    getCurrentQuarter(date?: string | Date | null): number;
    /**
     *  获取某个时间前后的天数的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeDaysDate(num: number, date?: string | Date): Date;
    /**
     *  获取某个时间前后的月份的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeMonthsDate(num: number, date?: string | Date): Date;
    /**
     *  获取某个时间前后的小时的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeHoursDate(num: number, date?: string | Date): Date;
    /**
     *  获取某个时间前后的分钟的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeMinutesDate(num: number, date?: string | Date): Date;
    /**
     *  获取某个时间前后的秒的时间对象
     * @param {number} num 数值 正负都可以
     * @param {string | Date} date 日期符号
     */
    getSomeSecondsDate(num: number, date?: string | Date): Date;
    /**
     * 获取时间的月份的第一天
     * @param {number} year 年份
     * @param {number} month 月份
     * @return {Date}
     */
    getFirstDayOfMonth(year: number, month: number): Date;
    /**
     * 获取指定月份最后一天
     * @param {number} year 年份
     * @param {number} month 月份
     * @return {Date}
     */
    getLastDayOfMonth(year: number, month: number): Date;
    /**
     * 通过分隔符来获取时间模板
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分隔符号
     * @param {boolean} hasYear 是否需要有年份
     * @returns {string} 时间模板
     */
    static GetFormatTpl(symbol?: string | string[] | {
        y: string;
        m: string;
        d: string;
    }, hasYear?: boolean): string;
    /**
     * 快速把时间字符串转为时间对象
     * @param {string} dateString 时间字符串
     *
     * @return {Date}
     */
    static Parse(dateString: string): Date;
    /**
     * 克隆一个时间对象
     * @param {Date} date 日期
     *
     * @return {Date}
     */
    static Clone(date: Date): Date;
    /**
     *  自动处理跨年份时间格式化
     * @param {string | string[] | { y: string, m: string, d: string }} symbol 分割符号
     * @param {Date} d 日期对象
     * @param {number} year 年份
     */
    static AutoYearFormat(symbol?: string | string[] | {
        y: string;
        m: string;
        d: string;
    }, d?: Date, year?: number): string;
    /**
     * 格式化输出时间
     * @param {string} tpl 字符串模板，用于定义时间的输出格式
     * @param {string | number | Date | null} date 需要格式化的日期，可以是字符串、数字、Date对象或null，默认为null
     * @returns {string} 格式化后的时间字符串
     */
    static Format(tpl?: string, date?: string | number | Date | null): string;
}
declare const quickDate: QuickDate;
export { QuickDate, quickDate, };
export default quickDate;
