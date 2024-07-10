/**
 * hasOwnProperty缩写
 */
export declare const hasOwn: (obj: Record<string, unknown>, key: string) => boolean;
/**
 * 是否为对象
 */
export declare const isObject: (val: unknown) => val is Record<string, unknown>;
/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
export declare const isSet: (val: unknown) => boolean;
/**
 * 判断是否为空值
 * null|undefined|空字符串 绝对为空
 * 空对象、空数组根据拓展选项来控制
 *
 * @param {any} val 验证值
 * @param {Object|boolean} options 验证选项
 * @param {boolean} options.allEmpty 全部验证
 * @param {boolean} options.objectEmpty 对象验证
 * @param {boolean} options.arrayEmpty 数组验证
 *
 * @return {boolean} 是否为空
 */
interface IsEmptyOptions {
    allEmpty?: boolean;
    objectEmpty?: boolean;
    arrayEmpty?: boolean;
}
/**
 * 判断一个值是否为空。
 *
 * @param val 要检查的值。
 * @param options 选项对象，或布尔值指示是否检查所有类型的空值。如果为布尔值，则true表示检查所有类型的空值，false表示只检查基本类型的空值。如果为对象，则可以指定更详细的空值检查选项。
 * @returns 如果值为空，则返回true；否则返回false。
 */
export declare const isEmpty: (val: unknown, options?: IsEmptyOptions | boolean | null) => boolean;
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
export declare const numberToFixedValid: (val: number | string, fixed?: number) => boolean;
/**
 * 常见的金钱数字验证
 */
export declare const normalMoneyValid: (val: number | string) => boolean;
/**
 * 手机号验证
 */
export declare const mobileValid: (val: number | string) => boolean;
export {};
