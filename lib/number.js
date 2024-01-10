/**
 * 求和方法
 */
export const sum = (...args) => {
  if (!args.length) return 0;
  const nums = [...args].filter((i) => i && i !== true && parseFloat(i) === +i);
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return +nums[0];
  }
  return nums.reduce((tol, n) => {
    const s = n.toString();
    const dotIndex = s.indexOf('.');
    if (dotIndex > -1) {
      const pow = 10 ** (s.length - dotIndex);
      return Math.round((tol * pow) + (n * pow)) / pow;
    }
    return tol + (+n);
  });
};
export const numbersReduce = sum;
