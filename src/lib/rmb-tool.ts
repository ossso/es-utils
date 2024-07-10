/**
 * 涉及金额的工具
 */

// 转为 分
export const toPoint = (num: number): number => Math.floor(Math.round((num * 1000)) / 10);
export const toFen = toPoint;

/**
 * 转为 元
 *
 * 将数值转换为人民币格式的字符串或数字。
 * @param num 要转换的数值，单位为分。
 * @param locale 是否使用本地化格式，默认为false。
 * @returns 返回转换后的人民币字符串或数字。如果locale为true，则返回本地化格式的字符串；否则返回标准格式的字符串或数字。
 */
export const toYuan = (num: number, locale: boolean = false): number | string => {
  // 将数值转换为元的单位
  const n = num / 100;
  // 确定数值的正负符号
  const symbol = n < 0 ? '-' : '';
  // 处理浮点数精度问题，尝试将数值转换为人民币格式
  // 处理浮点精度不正确的内容
  try {
    const s = n.toString();
    // 判断是否有小数点，并且小数点后至少有两位
    if (s.indexOf('.') > -1 && s.indexOf('.') < s.length - 2) {
      const [int, float] = s.split('.');
      // 构造人民币标准格式的字符串
      const toYuanString = Number(`${symbol}${Math.abs(Number(int))}.${float.substring(0, 2)}`);
      // 根据locale参数决定返回本地化格式还是标准格式
      if (locale) {
        return toYuanString.toLocaleString();
      }
      return toYuanString;
    }
  } catch (err) {
    // 捕获并记录转换过程中的错误
    console.error(err);
  }
  // 如果数值格式不符合要求，或者locale为true，则返回本地化格式的数值
  if (locale) {
    return n.toLocaleString();
  }
  return n;
};
export const toRMB = toYuan;

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
export const toWan = (num: number, fixed: number = 1, type: 'yuan' | 'fen' = 'yuan'): string => {
  // 根据数字正负决定符号
  const symbol = num < 0 ? '-' : '';
  // 根据类型转换并取绝对值，如果是分，则先转换为元
  const n = type === 'fen' ? Math.abs(toYuan(num) as number) : Math.abs(num);

  // 格式化数字，保留指定的小数位数
  const formatNumber = (
    value: number,
    decimalPlaces: number,
  ): string => value.toFixed(decimalPlaces).replace(/(\.0+|0+)$/, '');

  // 如果数字大于等于1万
  if (n >= 10000) {
    // 计算万位数
    const k = n / 10000;
    // 如果不需要保留小数
    if (fixed === 0) {
      return `${symbol}${Math.round(k).toLocaleString()}万`;
    }
    // 返回万位数，保留指定位数的小数
    return `${symbol}${formatNumber(k, fixed)}万`;
  }

  // 如果数字小于1万，直接转换并返回，保留指定小数位数
  return `${symbol}${formatNumber(n, fixed)}`;
};
export const toRMBWan = toWan;

/**
 * 自动处理数字转换为万或显示全部数字
 * 小于1万的显示全部数字，支持fixed参数；如果大于1万的调用toWan方法
 *
 * @param num 要转换的数字
 * @param fixed 保留小数点后的位数，默认为1位
 * @param type 单位类型，可选值为'fen'（分）或'yuan'（元，默认值为元）
 * @returns 转换后的字符串
 */
export const autoToWan = (num: number, fixed: number = 1, type: 'yuan' | 'fen' = 'yuan'): string => {
  // 根据类型转换并取绝对值，如果是分，则先转换为元
  const n = type === 'fen' ? Math.abs(toYuan(num) as number) : Math.abs(num);

  // 格式化数字，保留指定的小数位数
  const formatNumber = (
    value: number,
    decimalPlaces: number,
  ): string => value.toFixed(decimalPlaces).replace(/(\.0+|0+)$/, '');

  // 如果数字小于1万，直接转换并返回，保留指定小数位数
  if (n < 10000) {
    return formatNumber(n, fixed);
  }

  // 如果数字大于等于1万，调用toWan方法
  return toWan(num, fixed, type);
};

/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2Chinese(100000000) => "壹亿元整"
 */
export const number2Chinese = (number: number | string, type: 'lower' | 'upper' = 'upper'): string => {
  // 配置
  const confs = {
    lower: {
      num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
      unit: ['', '十', '百', '千', '万'],
      level: ['', '万', '亿'],
    },
    upper: {
      num: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
      unit: ['', '拾', '佰', '仟'],
      level: ['', '万', '亿'],
    },
    decimal: {
      unit: ['分', '角'],
    },
    maxNumber: 999999999999.99,
  };

  // 过滤不合法参数
  if (Number(number) > confs.maxNumber) {
    console.error(`The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`);
    return '';
  }

  const conf = confs[type];
  const numbers = String(Number(number).toFixed(2)).split('.');
  const integer = numbers[0].split('');
  const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('');

  // 四位分级
  const levels = integer.reverse().reduce((pre: string[][], item, idx) => {
    const level = pre[0] && pre[0].length < 4 ? pre[0] : [];
    const value = item === '0' ? conf.num[Number(item)] : conf.num[Number(item)] + conf.unit[idx % 4];
    level.unshift(value);

    if (level.length === 1) {
      pre.unshift(level);
    } else {
      pre.splice(0, 1, level);
    }

    return pre;
  }, []);

  // 整数部分
  const $integer = levels.reduce((pre, item, idx) => {
    let $level = conf.level[levels.length - idx - 1];
    let $item = item.join('').replace(/(零)\1+/g, '$1'); // 连续多个零字的部分设置为单个零字

    // 如果这一级只有一个零字，则去掉这级
    if ($item === '零') {
      $item = '';
      $level = '';

      // 否则如果末尾为零字，则去掉这个零字
    } else if ($item[$item.length - 1] === '零') {
      $item = $item.slice(0, $item.length - 1);
    }

    return pre + $item + $level;
  }, '');

  // 小数部分
  const $decimal = decimal
    .map((item, idx) => {
      const { unit } = confs.decimal;
      const $unit = item !== '0' ? unit[unit.length - idx - 1] : '';

      return `${conf.num[Number(item)]}${$unit}`;
    })
    .join('');

  // 如果是整数，则补个整字
  return $integer ? `${$integer}元${$decimal || '整'}` : '';
};
export const toUpper = number2Chinese;
