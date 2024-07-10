import {
  toFen,
  toYuan,
  toWan,
  number2Chinese,
} from '../lib/rmb-tool';

describe('toFen', () => {
  it('should convert the number to points', () => {
    expect(toFen(10)).toBe(1000);
    expect(toFen(15.5)).toBe(1550);
    expect(toFen(0.1)).toBe(10);
  });
});

describe('toYuan', () => {
  it('should convert the number to yuan', () => {
    expect(toYuan(1000)).toBe(10);
    expect(toYuan(1550)).toBe(15.5);
    expect(toYuan(10, true)).toBe('0.1');
  });

  it('should convert the number to yuan with locale', () => {
    expect(toYuan(1000, true)).toBe('10');
    expect(toYuan(1550, true)).toBe('15.5');
  });
});

describe('toWan', () => {
  it('should convert the number to wan', () => {
    expect(toWan(10000)).toBe('1万');
    expect(toWan(15000)).toBe('1.5万');
    expect(toWan(100000)).toBe('10万');
    expect(toWan(150000, 0)).toBe('15万');
    expect(toWan(150090, 2)).toBe('15.01万');
    expect(toWan(-10000)).toBe('-1万');
  });

  it('should convert the number to wan with fen', () => {
    expect(toWan(10000000, 1, 'fen')).toBe('10万');
    expect(toWan(15009000, 2, 'fen')).toBe('15.01万');
  });
});

describe('number2Chinese', () => {
  it('should convert the number to Chinese', () => {
    expect(number2Chinese(100000000)).toBe('壹亿元整');
    expect(number2Chinese(100000000, 'lower')).toBe('一亿元整');
    expect(number2Chinese(100000000.01)).toBe('壹亿元零壹分');
    expect(number2Chinese(100000000.01, 'lower')).toBe('一亿元零一分');
  });

  it('should convert the number to Chinese with upper case', () => {
    expect(number2Chinese(100000000, 'upper')).toBe('壹亿元整');
    expect(number2Chinese(100000000.01, 'upper')).toBe('壹亿元零壹分');
  });
});
