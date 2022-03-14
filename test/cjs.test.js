const utils = require('../dist/index.cjs');

const {
  idCardValid,
  quickDate,
  mapping,
} = utils;

test('身份证校验验证', () => {
  // 转换为时间对象是否正常
  expect(idCardValid('411122199405191215')).toBe(true);
});

test('quickDate验证', () => {
  // 转换为时间对象是否正常
  expect(quickDate.auto('2000-01-01').getDate()).toBe(1);
  expect(quickDate.format('yyyy/mm/dd', '2000-01-01')).toBe('2000/01/01');
});

test('mapping验证', () => {
  const info = {
    hello: 'world',
  };
  // mapping映射是否正常
  expect(mapping(info, 'hello')).toBe('world');
});
