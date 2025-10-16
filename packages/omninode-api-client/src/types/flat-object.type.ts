/**
 * Utility type that flattens nested objects within a type,
 * excluding the 'context' property and all its nested properties.
 * 
 * This type merges all nested object properties to the top level while
 * keeping primitive properties as-is.
 * 
 * @example
 * type Input = {
 *   context: { userId: string; organizationId: string };
 *   statusCode: 200;
 *   body: { name: string; email: string };
 *   headers: { authorization: string };
 * };
 * 
 * type Result = FlatObject<Input>;
 * // Result: { statusCode: 200; name: string; email: string; authorization: string }
 */
export type FlatObject<T> = UnionToIntersection<
  {
    [K in keyof T]: K extends 'context'
      ? never
      : T[K] extends Record<string, any>
        ? T[K] extends Array<any>
          ? { [P in K]: T[K] }
          : T[K]
        : { [P in K]: T[K] };
  }[keyof T]
>;

/**
 * Helper type to convert a union of types to an intersection.
 * Used internally by FlatObject.
 */
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;