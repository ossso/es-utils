import {
  idCardValid,
  quickDate,
  mapping,
} from '../index';

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
