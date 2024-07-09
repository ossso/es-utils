const utils = require('../dist/index.cjs');

const {
  idCardValid,
  quickDate,
  mapping,
  RMBTool,
} = utils;

test('身份证校验验证', () => {
  expect(idCardValid('411122199405191215')).toBe(true);
});

test('quickDate验证', () => {
  expect(quickDate.auto('2000-01-01').getDate()).toBe(1);
  expect(quickDate.format('yyyy/mm/dd', '2000-01-01')).toBe('2000/01/01');
});

test('mapping验证', () => {
  const info = {
    hello: 'world',
  };
  expect(mapping(info, 'hello')).toBe('world');
});

test('RMBTool验证', () => {
  expect(RMBTool.toYuan(1000)).toBe(10);
  expect(RMBTool.toYuan(1010)).toBe(10.1);
  expect(RMBTool.toFen(10.01)).toBe(1001);
  expect(RMBTool.toFen(12.05)).toBe(1205);
});
