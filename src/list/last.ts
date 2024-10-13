import { Type, Kind } from '..'

/**
 * `_$last` is a type-level function that returns the last element of a tuple.
 *
 * @template T - The tuple to get the last element of.
 * @returns An element of `T`.
 *
 * @example
 * type T0 = List._$last<[1, 2, 3]> // 3
 * type T1 = List._$last<[]> // never
 * type T2 = List._$last<number[]> // number
 * type T3 = List._$last<[string, ...number[]]> // number
 * type T4 = List._$last<[string, ...number[], 'foo']> // 'foo'
 * type T5 = List._$last<[string]> // string
 */
export type _$last<T extends readonly unknown[]> = T extends [infer X]
  ? X
  : T extends [unknown, ...infer Tail]
    ? _$last<Tail>
    : T extends [...unknown[], infer X]
      ? X
      : T[number]

/**
 * `Last` is a type-level function that returns the last element of a tuple.
 *
 * @template T - The tuple to get the last element of.
 * @returns An element of `T`.
 *
 * @example
 * type T0 = $<List.Last, [1, 2, 3]> // 3
 * type T1 = $<List.Last, []> // never
 * type T2 = $<List.Last, number[]> // number
 * type T3 = $<List.Last, [string, ...number[]]> // number
 * type T4 = $<List.Last, [string, ...number[], 'foo']> // 'foo'
 * type T5 = $<List.Last, [string]> // string
 */
export interface Last extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], readonly unknown[]>): _$last<typeof x>
}

/**
 * Returns the last element of a list.
 *
 * @param {unknown[]} x - The list to get the last element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.last([1, 2, 3])
 * //    ^? 3
 * ```
 */
export const last = ((x: unknown[]) => x[x.length - 1]) as Kind._$reify<Last>
