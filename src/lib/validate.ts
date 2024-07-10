/**
 * hasOwnProperty缩写
 */
export const hasOwn = (
  obj: Record<string, unknown>,
  key: string,
): boolean => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * 是否为对象
 */
export const isObject = (val: unknown): val is Record<string, unknown> => (
  typeof val === 'object'
  && val !== null
  && val.constructor.name === 'Object'
);

/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
export const isSet = (val: unknown): boolean => val !== null && val !== undefined;

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
export const isEmpty = (
  val: unknown,
  options: IsEmptyOptions | boolean | null = null,
): boolean => {
  // 初始化各种空检查的标志
  let allEmpty = false;
  let objectEmpty = false;
  let arrayEmpty = false;

  // 处理options参数，如果是布尔值，则统一空检查标准；否则根据IsEmptyOptions对象设置空检查选项
  if (options === true) {
    allEmpty = true;
  } else {
    const emptyOptions = options as IsEmptyOptions || {};
    allEmpty = emptyOptions.allEmpty || false;
    objectEmpty = emptyOptions.objectEmpty || false;
    arrayEmpty = emptyOptions.arrayEmpty || false;
  }

  // 检查基本类型的空值：null、undefined、空字符串
  if (
    val === null
    || val === undefined
    || (typeof val === 'string' && val === '')
  ) {
    return true;
  }
  // 检查对象类型的空值，如果启用了objectEmpty选项且val是一个空对象
  if ((allEmpty || objectEmpty)
    && isObject(val)
    && Object.getOwnPropertyNames(val).length === 0
  ) {
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
export const numberToFixedValid = (val: number | string, fixed = 2): boolean => {
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
export const normalMoneyValid = (val: number | string): boolean => numberToFixedValid(val, 2);

/**
 * 手机号验证
 */
export const mobileValid = (val: number | string): boolean => {
  const str = (val || '').toString().trim();
  if (str.length !== 11) {
    return false;
  }
  return /^1\d{10}$/.test(str);
};
