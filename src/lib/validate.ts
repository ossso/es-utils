/**
 * hasOwnProperty缩写
 */
export const hasOwn = (obj: Record<string, any>, key: string): boolean => 
  Object.prototype.hasOwnProperty.call(obj, key);

/**
 * 是否为对象
 */
export const isObject = (val: any): val is Record<string, any> => 
  typeof val === 'object' && val !== null && val.constructor.name === 'Object';

/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
export const isSet = (val: any): boolean => val !== null && val !== undefined;

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

export const isEmpty = (val: any, options: IsEmptyOptions | boolean | null = null): boolean => {
  let allEmpty = false;
  let objectEmpty = false;
  let arrayEmpty = false;

  if (options === true) {
    allEmpty = true;
  } else {
    const emptyOptions = options as IsEmptyOptions || {};
    allEmpty = emptyOptions.allEmpty || false;
    objectEmpty = emptyOptions.objectEmpty || false;
    arrayEmpty = emptyOptions.arrayEmpty || false;
  }

  if (
    val === null
    || val === undefined
    || (typeof val === 'string' && val === '')
  ) {
    return true;
  }
  if (
    (allEmpty || objectEmpty)
    && isObject(val)
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
export const numberToFixedValid = (val: number | string, fixed = 2): boolean => {
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
export const normalMoneyValid = (val: number | string): boolean => 
  numberToFixedValid(val, 2);

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
