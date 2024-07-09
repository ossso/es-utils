/**
 * hasOwnProperty缩写
 */
export declare const hasOwn: (obj: Record<string, any>, key: string) => boolean;
/**
 * 是否为对象
 */
export declare const isObject: (val: any) => val is Record<string, any>;
/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
export declare const isSet: (val: any) => boolean;
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
export declare const isEmpty: (val: any, options?: IsEmptyOptions | boolean | null) => boolean;
/**
 * 浮点数字小数点位数验证
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
