// Pure functions: no React, no UI. These are the easiest things to unit test.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/**
 * Checks the login form.
 * Returns an error message to show the user, or null when everything is fine.
 */
export function validateLogin(email: string, password: string): string | null {
  if (email.trim() === '' || password === '') {
    return 'Please enter your email and password.';
  }
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  return null;
}
