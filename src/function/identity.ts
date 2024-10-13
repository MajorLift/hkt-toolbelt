import { Kind } from '..'

/**
 * `Identity` is a type-level utility that returns its input type unchanged.
 *
 * It acts as the "identity" function at the type level.
 *
 * @template T - The input type to return unchanged
 *
 * @returns The input value x, unchanged
 *
 * @example
 * ```ts
 * import { $, Function } from 'hkt-toolbelt'
 *
 * // Returns 'foo'
 * type R = $<Function.Identity, 'foo'>
 * ```
 *
 * The `Identity` utility is often useful for disabling side effects of
 * other types within a pipeline.
 */
export interface Identity extends Kind.Kind {
  f(x: this[Kind._]): typeof x
}

/**
 * Given a value, return the value.
 *
 * @param {unknown} x - The value to return.
 *
 * @example
 * ```ts
 * import { Function } from "hkt-toolbelt";
 *
 * const result = Function.identity('foo')
 * //   ^? foo
 * ```
 */
export const identity = ((x: unknown) => x) as Kind._$reify<Identity>
