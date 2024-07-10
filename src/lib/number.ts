/**
 * 求和方法
 */

// 声明类型为string和number
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
export const sum = (...args: Num[]): number => {
  if (args.length === 0) return 0;

  const nums = args
    .map((arg) => (typeof arg === 'string' ? arg.trim() : arg))
    .filter((arg) => arg !== '' && !Number.isNaN(+arg))
    .map(Number);

  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  return nums.reduce((total, num) => {
    const [, decPart] = num.toString().split('.');
    if (decPart) {
      const factor = 10 ** decPart.length;
      return Math.round(total * factor + num * factor) / factor;
    }
    return total + num;
  }, 0);
};

export const numbersReduce = sum;
