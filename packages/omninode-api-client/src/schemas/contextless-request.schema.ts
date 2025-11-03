import { z } from "zod";

const deepOmitContext = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => deepOmitContext(item));
  }
  if (value != null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([key]) => key !== "executionContext" && key !== "unsafeExecutionContext")
      .map(([key, val]) => [key, deepOmitContext(val)] as const);
    return Object.fromEntries(entries);
  }
  return value;
};

export const contextlessRequestSchema = <S extends z.ZodTypeAny | undefined>(schema: S): NonNullable<S> => {
  if (!schema) {
    return schema as unknown as NonNullable<S>;
  }
  return z.preprocess((val) => deepOmitContext(val), schema) as unknown as NonNullable<S>;
};

export type DeepOmitContext<T> =
  T extends (infer U)[]
    ? DeepOmitContext<U>[]
    : T extends object
      ? { [K in keyof T as K extends 'executionContext' | 'unsafeExecutionContext' ? never : K]: DeepOmitContext<T[K]> }
      : T;

export type ContextlessRequest<TRequest> = DeepOmitContext<TRequest>;