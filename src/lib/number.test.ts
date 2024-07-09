import { sum } from './number';

describe('sum', () => {
  it('should return 0 when no arguments are provided', () => {
    expect(sum()).toBe(0);
  });

  it('should return 0 when all arguments are invalid numbers', () => {
    expect(sum('abc', 'def', 'ghi')).toBe(0);
  });

  it('should return the sum of valid numbers', () => {
    expect(sum(1, 2, 3)).toBe(6);
    expect(sum(0.1, 0.2, 0.3)).toBeCloseTo(0.6);
    expect(sum('4', '5', '6')).toBe(15);
    expect(sum(10.5, '20.5', 30.5)).toBeCloseTo(61.5);
  });

  it('should handle negative numbers correctly', () => {
    expect(sum(-1, -2, -3)).toBe(-6);
    expect(sum('-4', '-5', '-6')).toBe(-15);
    expect(sum(-10.5, '-20.5', -30.5)).toBeCloseTo(-61.5);
  });
});
