import { QuickDate } from '../lib/quick-date';

describe('QuickDate', () => {
  describe('auto method', () => {
    it('should return a Date object when date is already a Date instance', () => {
      const date = new Date();
      const result = new QuickDate().auto(date);
      expect(result).toBeInstanceOf(Date);
      expect(result).toEqual(date);
    });

    it('should return a Date object for the given timestamp', () => {
      const timestamp = 1609459200000; // January 1, 2021
      const result = new QuickDate().auto(timestamp);
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toEqual(timestamp);
    });

    it('should throw an error when date is an invalid timestamp string', () => {
      expect(() => new QuickDate().auto('invalid timestamp')).toThrow(Error);
    });

    it('should return a Date object for the given valid date string', () => {
      const dateString = '2021-01-01';
      const result = new QuickDate().auto(dateString);
      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toEqual(2021);
      expect(result.getMonth()).toEqual(0);
      expect(result.getDate()).toEqual(1);
    });

    it('should throw an error when date is an invalid date string', () => {
      expect(() => new QuickDate().auto('invalid date')).toThrow(Error);
    });
  });
});
