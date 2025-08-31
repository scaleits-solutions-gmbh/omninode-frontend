/**
 * Shared validation functions for form inputs
 */

export const createValidationFunctions = (tValidation: (key: string) => string) => {
  const isEmailValid = (value: string) => {
    if (!value) return tValidation('emailRequired');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return tValidation('emailInvalid');
    return undefined;
  };

  const isPasswordValid = (value: string) => {
    if (!value) return tValidation('passwordRequired');
    return undefined;
  };

  return { isEmailValid, isPasswordValid };
};