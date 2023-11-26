import { Type, Kind } from '..'

/**
 * `_$pair` is a type-level function that generates a tuple of pairs from a tuple,
 * where each element is paired with the next element.
 *
 * @template T - The tuple to generate pairs from.
 * @returns A list of tuples of length 2 that contain sequential elements of `T`.
 *
 * @example
 * type T0 = List._$pair<[1, 2, 3, 4]> // [[1, 2], [2, 3], [3, 4]]
 * type T1 = List._$pair<[]> // []
 * type T2 = List._$pair<[1]> // []
 * type T3 = List._$pair<[1, 2]> // [[1, 2]]
 */
export type _$pair<
  T extends unknown[],
  O extends unknown[][] = []
> = T extends [infer X1, infer X2, ...infer Rest]
  ? _$pair<[X2, ...Rest], [...O, [X1, X2]]>
  : number extends T['length']
    ? [T[number], T[number]][]
    : O

/**
 * `Pair` is a type-level function that generates a tuple of pairs from a tuple,
 * where each element is paired with the next element.
 *
 * @template T - The tuple to generate pairs from.
 * @returns A list of tuples of length 2 that contain sequential elements of `T`.
 *
 * @example
 * type T0 = $<List.Pair, [1, 2, 3, 4]> // [[1, 2], [2, 3], [3, 4]]
 * type T1 = $<List.Pair, []> // []
 * type T2 = $<List.Pair, [1]> // []
 * type T3 = $<List.Pair, [1, 2]> // [[1, 2]]
 */
export interface Pair extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$pair<typeof x>
}
