import {
  quickDate,
  mapping,
} from '../index';

test('quickDate验证', () => {
  // 转换为时间对象是否正常
  expect(quickDate.auto('2000-01-01').getDate()).toBe(1);
});

test('mapping验证', () => {
  const info = {
    hello: 'world',
  };
  // mapping映射是否正常
  expect(mapping(info, 'hello')).toBe('world');
});
