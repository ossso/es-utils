/**
 * 涉及金额的工具
 */

// 转为 分
export const toPoint = (num) => Math.floor(Math.round((num * 1000)) / 10);
export const toFen = toPoint;

/**
 * 转为 元
 * @param {Number} num
 * @param {Boolean} locale
 * @returns 返回元
 */
export const toYuan = (num, locale = false) => {
  const n = num / 100;
  const symbol = n < 0 ? '-' : '';
  // 处理浮点精度不正确的内容
  try {
    const s = n.toString();
    if (s.indexOf('.') > -1 && s.indexOf('.') < s.length - 2) {
      const [
        int,
        float,
      ] = s.split('.');
      const toYuanString = `${symbol}${Math.abs(int)}.${float.substring(0, 2)}` * 1;
      if (locale) {
        return toYuanString.toLocaleString();
      }
      return toYuanString;
    }
  } catch (err) {
    console.error(err);
  }

  if (locale) {
    return n.toLocaleString();
  }
  return n;
};
export const toRMB = toYuan;

/**
 * 数字金额转为万
 */
export const toWan = (num, fixed = 1, type = 'yuan') => {
  const symbol = num < 0 ? '-' : '';
  const n = type === 'fen' ? Math.abs(toYuan(num)) : Math.abs(num);
  if (n >= 10000) {
    const k = Math.round(n / 1000);
    if (fixed === 0) {
      return `${symbol}${(Math.round(k / 10) * 1).toLocaleString()}万`;
    }
    if (fixed > -1) {
      return `${symbol}${parseFloat(k / 10).toFixed(fixed)}万`;
    }
    return `${symbol}${(parseFloat(k / 10).toFixed(2) * 1).toLocaleString()}万`;
  }
  return `${symbol}${(parseFloat(n).toFixed(2) * 1).toLocaleString()}`;
};
export const toRMBWan = toWan;

/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2Chinese(100000000) => "壹亿元整"
 */
export const number2Chinese = (number, type = 'upper') => {
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
    return false;
  }

  const conf = confs[type];
  const numbers = String(Number(number).toFixed(2)).split('.');
  const integer = numbers[0].split('');
  const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('');

  // 四位分级
  const levels = integer.reverse().reduce((pre, item, idx) => {
    const level = pre[0] && pre[0].length < 4 ? pre[0] : [];
    const value = item === '0' ? conf.num[item] : conf.num[item] + conf.unit[idx % 4];
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

      return `${conf.num[item]}${$unit}`;
    })
    .join('');

  // 如果是整数，则补个整字
  return $integer ? `${$integer}元${$decimal || '整'}` : '';
};
export const toUpper = number2Chinese;
