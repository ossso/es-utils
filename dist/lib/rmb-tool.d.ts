/**
 * 涉及金额的工具
 */
export declare const toPoint: (num: number) => number;
export declare const toFen: (num: number) => number;
/**
 * 转为 元
 * @param {Number} num
 * @param {Boolean} locale
 * @returns 返回元
 */
export declare const toYuan: (num: number, locale?: boolean) => number | string;
export declare const toRMB: (num: number, locale?: boolean) => number | string;
/**
 * 数字金额转为万
 */
export declare const toWan: (num: number, fixed?: number, type?: "yuan" | "fen") => string;
export declare const toRMBWan: (num: number, fixed?: number, type?: "yuan" | "fen") => string;
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
