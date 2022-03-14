/**
 * hasOwnProperty缩写
 */
export const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * 是否为对象
 */
export const isObject = (val) => typeof val === 'object' && val !== null && val.constructor.name === 'Object';

/**
 * 判断值是否已经设置类型数据
 * null|undefined为false
 */
export const isSet = (val) => val !== null && val !== undefined;

/**
 * 判断是否为空值
 * null|undefined|空字符串 绝对为空
 * 空对象、空数组根据拓展选项来控制
 *
 * @param {Any} val 验证值
 * @param {Object|Boolean} options 验证选项
 * @param {Boolean} options.allEmpty 全部验证
 * @param {Boolean} options.objectEmpty 对象验证
 * @param {Boolean} options.arrayEmpty 数组验证
 *
 * @return {Boolean} 是否为空
 */
export const isEmpty = (val, options = null) => {
  let allEmpty = false;
  let objectEmpty = false;
  let arrayEmpty = false;
  if (options === true) {
    allEmpty = true;
  } else {
    const emptyOptions = options || {};
    allEmpty = emptyOptions.allEmpty;
    objectEmpty = emptyOptions.objectEmpty;
    arrayEmpty = emptyOptions.arrayEmpty;
  }

  if (
    val === null
    || val === undefined
    || (val.constructor.name === 'String' && val === '')
  ) {
    return true;
  }
  if (
    (allEmpty || objectEmpty)
    && val.constructor.name === 'Object'
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
export const numberToFixedValid = (val, fixed = 2) => {
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
export const normalMoneyValid = (val) => numberToFixedValid(val, 2);

/**
 * 手机号验证
 */
export const mobileValid = (val) => {
  const str = (val || '').trim();
  if (str.length !== 11) {
    return false;
  }
  return /^1\d{10}/.test(str);
};
