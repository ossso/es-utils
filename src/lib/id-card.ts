/**
 * 身份证验证
 */

interface CityCodeMap {
  [code: string]: string;
}

const CITY_CODE: CityCodeMap = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北 ',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外',
};

/**
 * 验证身份证号码是否有效。
 *
 * @param val 身份证号码字符串。
 * @returns 如果身份证号码有效返回true，否则返回false。
 */
export const idCardValid = (val: string) => {
  // 将输入的字符串转换为大写并去除首尾空格，以统一处理。
  const str = (val || '').toUpperCase().trim();

  // 如果处理后的字符串为空，则身份证号码无效。
  if (!str) {
    return false;
  }

  // 检查身份证号码长度是否为18位。
  if (str.length !== 18) {
    return false;
  }

  // 使用正则表达式检查身份证号码的格式是否正确。
  if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(str)) {
    return false;
  }

  // 检查身份证号码的前两位是否在城市代码表中。
  if (!CITY_CODE[str.substring(0, 2)]) {
    return false;
  }

  // 对于18位身份证，验证最后一位校验位是否正确。
  // 18位身份证需要验证最后一位校验位
  // ∑(ai×Wi)(mod 11)
  // 加权因子
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验位
  const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  let sum = 0;
  let ai = 0;
  let wi = 0;
  // 计算身份证号码前17位的加权和。
  for (let i = 0; i < 17; i += 1) {
    ai = +str[i];
    wi = factor[i];
    sum += ai * wi;
  }

  // 检查校验位是否正确，即加权和模11的结果是否与最后一位相符。
  return parity[sum % 11] === str[17];
};

export default idCardValid;
