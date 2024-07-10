import idCardValid from '../lib/id-card';

describe('idCardValid', () => {
  it('should return false when the input is an empty string', () => {
    expect(idCardValid('')).toBe(false);
  });

  it('should return false when the input is not 18 characters long', () => {
    expect(idCardValid('12345678901234567')).toBe(false);
  });

  it('should return false when the input does not match the correct format', () => {
    expect(idCardValid('123456789012345678')).toBe(false);
    expect(idCardValid('1234567890123456X')).toBe(false);
    expect(idCardValid('1234567890123456')).toBe(false);
  });

  it('should return false when the input does not have a valid city code', () => {
    expect(idCardValid('999456789012345678')).toBe(false);
  });

  it('should return false when the input has an invalid check digit', () => {
    expect(idCardValid('11010119900307601X')).toBe(false);
  });

  it('should return true when the input is a valid ID card number', () => {
    expect(idCardValid('11010120240710151X')).toBe(true);
    expect(idCardValid('11010120240710151x')).toBe(true);
  });
});
