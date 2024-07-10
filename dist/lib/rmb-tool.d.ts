/**
 * 涉及金额的工具
 */
export declare const toPoint: (num: number) => number;
export declare const toFen: (num: number) => number;
/**
 * 转为 元
 *
 * 将数值转换为人民币格式的字符串或数字。
 * @param num 要转换的数值，单位为分。
 * @param locale 是否使用本地化格式，默认为false。
 * @returns 返回转换后的人民币字符串或数字。如果locale为true，则返回本地化格式的字符串；否则返回标准格式的字符串或数字。
 */
export declare const toYuan: (num: number, locale?: boolean) => number | string;
export declare const toRMB: (num: number, locale?: boolean) => number | string;
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
export declare const toWan: (num: number, fixed?: number, type?: "yuan" | "fen") => string;
export declare const toRMBWan: (num: number, fixed?: number, type?: "yuan" | "fen") => string;
/**
 * 自动处理数字转换为万或显示全部数字
 * 小于1万的显示全部数字，支持fixed参数；如果大于1万的调用toWan方法
 *
 * @param num 要转换的数字
 * @param fixed 保留小数点后的位数，默认为1位
 * @param type 单位类型，可选值为'fen'（分）或'yuan'（元，默认值为元）
 * @returns 转换后的字符串
 */
export declare const autoToWan: (num: number, fixed?: number, type?: "yuan" | "fen") => string;
/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2Chinese(100000000) => "壹亿元整"
 */
export declare const number2Chinese: (number: number | string, type?: "lower" | "upper") => string;
export declare const toUpper: (number: number | string, type?: "lower" | "upper") => string;
