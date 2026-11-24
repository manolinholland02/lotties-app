// Unit tests: the base of the testing pyramid. Fast, many, no UI.
import { isValidEmail, validateLogin } from '../src/validation';

describe('isValidEmail', () => {
  it('accepts a normal email address', () => {
    expect(isValidEmail('student@school.nl')).toBe(true);
  });

  it('rejects an address without @', () => {
    expect(isValidEmail('student.school.nl')).toBe(false);
  });
});

describe('validateLogin', () => {
  it('asks for both fields when they are empty', () => {
    expect(validateLogin('', '')).toBe('Please enter your email and password.');
  });

  it('rejects an invalid email', () => {
    expect(validateLogin('not-an-email', 'secret123')).toBe('Please enter a valid email address.');
  });

  it('rejects a short password', () => {
    expect(validateLogin('student@school.nl', '123')).toMatch(/at least 6 characters/);
  });

  it('returns null when everything is valid', () => {
    expect(validateLogin('student@school.nl', 'secret123')).toBeNull();
  });
});
