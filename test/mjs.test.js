import * as utils from '../dist/index';

const {
  idCardValid,
  mapping,
  sum,
  quickDate,
  RMBTool,
  mobileValid,
  normalMoneyValid,
  numberToFixedValid,
  isEmpty,
} = utils;

test('身份证校验验证', () => {
  expect(idCardValid('411122199405191215')).toBe(true);
});

test('mapping验证', () => {
  const info = {
    hello: 'world',
  };
  expect(mapping(info, 'hello')).toBe('world');
});

test('sum求和', () => {
  expect(sum('1', 2, '3', null, '')).toBe(6);
});

test('quickDate验证', () => {
  expect(quickDate.auto('2000-01-01').getDate()).toBe(1);
  expect(quickDate.format('yyyy/mm/dd', '2000-01-01')).toBe('2000/01/01');
});

test('RMBTool验证', () => {
  expect(RMBTool.toYuan(1000)).toBe(10);
  expect(RMBTool.toYuan(1010)).toBe(10.1);
  expect(RMBTool.toFen(10.01)).toBe(1001);
  expect(RMBTool.toFen(12.05)).toBe(1205);
});

test('validate验证', () => {
  expect(mobileValid('13123456789')).toBe(true);
  expect(normalMoneyValid('12.3')).toBe(true);
  expect(normalMoneyValid('12.34')).toBe(true);
  expect(normalMoneyValid('23.456')).toBe(false);
  expect(numberToFixedValid(10.01, 2)).toBe(true);
  expect(isEmpty('')).toBe(true);
});

