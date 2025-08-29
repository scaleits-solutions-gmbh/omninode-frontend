/**
 * Environment utilities for validating and managing environment variables
 */

/**
 * Validates that a required environment variable exists and returns its value
 * @param varName - The name of the environment variable to validate
 * @returns The environment variable value
 * @throws Error if the environment variable is missing or empty
 */
export function validateRequiredEnvVar(varName: string): string {
  const value = process.env[varName];
  if (!value) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
  return value;
}

/**
 * Gets an environment variable with a default value
 * @param varName - The name of the environment variable
 * @param defaultValue - The default value to use if the variable is not set
 * @returns The environment variable value or the default value
 */
export function getEnvVar(varName: string, defaultValue: string): string {
  return process.env[varName] || defaultValue;
}

/**
 * Gets an environment variable as a boolean
 * @param varName - The name of the environment variable
 * @param defaultValue - The default boolean value to use if the variable is not set
 * @returns The environment variable value as a boolean
 */
export function getEnvVarAsBoolean(varName: string, defaultValue: boolean = false): boolean {
  const value = process.env[varName];
  if (!value) return defaultValue;
  
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Gets an environment variable as a number
 * @param varName - The name of the environment variable
 * @param defaultValue - The default number value to use if the variable is not set
 * @returns The environment variable value as a number
 */
export function getEnvVarAsNumber(varName: string, defaultValue: number): number {
  const value = process.env[varName];
  if (!value) return defaultValue;
  
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
} 