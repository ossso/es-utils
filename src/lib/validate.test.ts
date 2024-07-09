import {
  hasOwn,
  isObject,
  isSet,
  isEmpty,
  numberToFixedValid,
  normalMoneyValid,
  mobileValid,
} from '../lib/validate';

describe('hasOwn', () => {
  it('should return true if the object has the specified key', () => {
    const obj = { foo: 'bar' };
    const key = 'foo';
    const result = hasOwn(obj, key);
    expect(result).toBe(true);
  });

  it('should return false if the object does not have the specified key', () => {
    const obj = { foo: 'bar' };
    const key = 'baz';
    const result = hasOwn(obj, key);
    expect(result).toBe(false);
  });
});

describe('isObject', () => {
  it('should return true if the value is an object', () => {
    const val = { foo: 'bar' };
    const result = isObject(val);
    expect(result).toBe(true);
  });

  it('should return false if the value is not an object', () => {
    const val = 'foo';
    const result = isObject(val);
    expect(result).toBe(false);
  });
});

describe('isSet', () => {
  it('should return true if the value is not null or undefined', () => {
    const val = 'foo';
    const result = isSet(val);
    expect(result).toBe(true);
  });

  it('should return false if the value is null', () => {
    const val = null;
    const result = isSet(val);
    expect(result).toBe(false);
  });

  it('should return false if the value is undefined', () => {
    const val = undefined;
    const result = isSet(val);
    expect(result).toBe(false);
  });
});

describe('isEmpty', () => {
  it('should return true if the value is null', () => {
    const val = null;
    const result = isEmpty(val);
    expect(result).toBe(true);
  });

  it('should return true if the value is undefined', () => {
    const val = undefined;
    const result = isEmpty(val);
    expect(result).toBe(true);
  });

  it('should return true if the value is an empty string', () => {
    const val = '';
    const result = isEmpty(val);
    expect(result).toBe(true);
  });

  it('should return true if the value is an empty object', () => {
    const val = {};
    const result = isEmpty(val);
    expect(result).toBe(true);
  });

  it('should return true if the value is an empty array', () => {
    const val: any[] = [];
    const result = isEmpty(val, {});
    expect(result).toBe(true);
  });

  it('should return false if the value is not empty', () => {
    const val = 'foo';
    const result = isEmpty(val);
    expect(result).toBe(false);
  });

  it('should return true if the value is an empty object and objectEmpty option is true', () => {
    const val = {};
    const options = { objectEmpty: true };
    const result = isEmpty(val, options);
    expect(result).toBe(true);
  });

  it('should return false if the value is an empty object and objectEmpty option is false', () => {
    const val = {};
    const options = { objectEmpty: false };
    const result = isEmpty(val, options);
    expect(result).toBe(false);
  });

  it('should return true if the value is an empty array and arrayEmpty option is true', () => {
    const val: any[] = [];
    const options = { arrayEmpty: true };
    const result = isEmpty(val, options);
    expect(result).toBe(true);
  });

  it('should return false if the value is an empty array and arrayEmpty option is false', () => {
    const val: any[] = [];
    const options = { arrayEmpty: false };
    const result = isEmpty(val, options);
    expect(result).toBe(false);
  });

  it('should return true if the value is an empty object and allEmpty option is true', () => {
    const val = {};
    const options = { allEmpty: true };
    const result = isEmpty(val, options);
    expect(result).toBe(true);
  });

  it('should return false if the value is an empty object and allEmpty option is false', () => {
    const val = {};
    const options = { allEmpty: false };
    const result = isEmpty(val, options);
    expect(result).toBe(false);
  });

  it('should return true if the value is an empty array and allEmpty option is true', () => {
    const val: any[] = [];
    const options = { allEmpty: true };
    const result = isEmpty(val, options);
    expect(result).toBe(true);
  });

  it('should return false if the value is an empty array and allEmpty option is false', () => {
    const val: any[] = [];
    const options = { allEmpty: false };
    const result = isEmpty(val, options);
    expect(result).toBe(false);
  });
});

describe('numberToFixedValid', () => {
  it('should return true if the number has the specified number of decimal places', () => {
    const val = 1.23;
    const fixed = 2;
    const result = numberToFixedValid(val, fixed);
    expect(result).toBe(true);
  });

  it('should return false if the number does not have the specified number of decimal places', () => {
    const val = 1.234;
    const fixed = 2;
    const result = numberToFixedValid(val, fixed);
    expect(result).toBe(false);
  });

  it('should return false if the value is not a number', () => {
    const val = 'foo';
    const fixed = 2;
    const result = numberToFixedValid(val, fixed);
    expect(result).toBe(false);
  });
});

describe('normalMoneyValid', () => {
  it('should return true if the number has 2 decimal places', () => {
    const val = 1.23;
    const result = normalMoneyValid(val);
    expect(result).toBe(true);
  });

  it('should return false if the number does not have 2 decimal places', () => {
    const val = 1.234;
    const result = normalMoneyValid(val);
    expect(result).toBe(false);
  });

  it('should return false if the value is not a number', () => {
    const val = 'foo';
    const result = normalMoneyValid(val);
    expect(result).toBe(false);
  });
});

describe('mobileValid', () => {
  it('should return true if the value is a valid mobile number', () => {
    const val = '12345678901';
    const result = mobileValid(val.toString());
    expect(result).toBe(true);
  });

  it('should return false if the value is not a valid mobile number', () => {
    const val = '1234567890';
    const result = mobileValid(val.toString());
    expect(result).toBe(false);
  });

  it('should return false if the value is not a string', () => {
    const val = 12345678901;
    const result = mobileValid(val.toString());
    expect(result).toBe(false);
  });
});