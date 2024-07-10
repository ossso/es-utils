import Mapping, { mapping } from '../lib/mapping';

describe('Mapping', () => {
  describe('mapping', () => {
    it('should return the mapped value when the key is valid', () => {
      const obj = { foo: { bar: 'baz' } };
      const key = 'foo.bar';
      const result = mapping(obj, key);
      expect(result).toBe('baz');
    });

    it('should return undefined when the key is invalid', () => {
      const obj = { foo: { bar: 'baz' } };
      const key = 'foo.invalid';
      const result = mapping(obj, key);
      expect(result).toBeUndefined();
    });

    it('should throw an error when the obj is null or not an object', () => {
      const obj = {};
      const key = 'foo.bar';
      const result = mapping(obj, key);
      expect(result).toBeUndefined();
    });

    it('should throw an error when the key is not a string', () => {
      const obj = { foo: { bar: 'baz' } };
      const key = '123';
      const result = mapping(obj, key);
      expect(result).toBeUndefined();
    });

    it('should return undefined when the key includes ".." or starts/ends with "."', () => {
      const obj = { foo: { bar: 'baz' } };
      const key = 'foo..bar';
      const result = mapping(obj, key);
      expect(result).toBeUndefined();
    });
  });

  describe('get', () => {
    it('should return the value when the key is valid', () => {
      const obj = { foo: 'bar' };
      const key = 'foo';
      const result = Mapping.get(obj, key);
      expect(result).toBe('bar');
    });

    it('should return undefined when the obj is null or not an object', () => {
      const obj = { foo: null };
      const key = 'foo';
      const result = Mapping.get(obj, key);
      expect(result).toBeNull();
    });

    it('should return undefined when the key is empty', () => {
      const obj = { foo: 'bar' };
      const key = '';
      const result = Mapping.get(obj, key);
      expect(result).toBeUndefined();
    });

    it('should return the value at the specified index when the key contains an array index', () => {
      const obj = { foo: ['bar', 'baz'] };
      const key = 'foo[1]';
      const result = Mapping.get(obj, key);
      expect(result).toBe('baz');
    });

    it('should return undefined when the key contains an array index that is out of range', () => {
      const obj = { foo: ['bar', 'baz'] };
      const key = 'foo[2]';
      const result = Mapping.get(obj, key);
      expect(result).toBeUndefined();
    });

    it('should return undefined when the key contains an array index but the object is not an array', () => {
      const obj = { foo: 'bar' };
      const key = 'foo[0]';
      const result = Mapping.get(obj, key);
      expect(result).toBeUndefined();
    });
  });

  describe('each', () => {
    it('should return an object with mapped values', () => {
      const keys = { foo: 'bar', baz: 'qux' };
      const data = { bar: 'value1', qux: 'value2' };
      const result = Mapping.each(keys, data);
      expect(result).toEqual({ foo: 'value1', baz: 'value2' });
    });

    it('should throw an error when the keys is not a valid object', () => {
      const keys = null;
      const data = { bar: 'value1', qux: 'value2' };
      const result = Mapping.each(keys, data);
      expect(result).toBeUndefined();
    });

    it('should throw an error when the data is null or not an object', () => {
      const keys = { foo: 'bar', baz: 'qux' };
      const data = null;
      const result = Mapping.each(keys, data);
      expect(result).toBeUndefined();
    });
  });
});

describe('Mapping', () => {
  // Existing tests...

  describe('each', () => {
    // Existing tests...

    it('should return an empty object when both keys and data are empty', () => {
      const keys = {};
      const data = {};
      const result = Mapping.each(keys, data);
      expect(result).toEqual({});
    });

    it('should return an empty object when keys is empty and data has values', () => {
      const keys = {};
      const data = { foo: 'bar', baz: 'qux' };
      const result = Mapping.each(keys, data);
      expect(result).toEqual({});
    });

    it('should return an empty object when keys has values and data is empty', () => {
      const keys = { foo: 'bar', baz: 'qux' };
      const data = {};
      const result = Mapping.each(keys, data);
      expect(result).toEqual({});
    });

    it('should return an object with undefined values for keys that do not exist in data', () => {
      const keys = { foo: 'bar', baz: 'qux' };
      const data = { bar: 'value1' };
      const result = Mapping.each(keys, data);
      expect(result).toEqual({ foo: 'value1', baz: undefined });
    });

    it('should return an object with mapped values when keys and data have matching keys', () => {
      const keys = { foo: 'bar', baz: 'qux' };
      const data = { bar: 'value1', qux: 'value2' };
      const result = Mapping.each(keys, data);
      expect(result).toEqual({ foo: 'value1', baz: 'value2' });
    });
  });
});
