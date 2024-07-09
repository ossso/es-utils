/**
 * 求和方法
 */
type Num = string | number;
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
export declare const sum: (...args: Num[]) => number;
export declare const numbersReduce: (...args: Num[]) => number;
export {};
