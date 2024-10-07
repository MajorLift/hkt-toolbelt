import { $, Kind, NaturalNumber, Type } from '..'

/**
 * `_$minBy` is a type-level function that takes in a kind `F` that returns a number,
 * and a list `T`, and returns the element in `T` that has the lowest score
 * when applying `F` to each element.
 *
 * @template {Kind} F - The kind that returns a number.
 * @template {unknown[]} T - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * type T0 = _$minBy<Function.Identity, [1, 2, 3]> // 1
 * ```
 */
export type _$minBy<
  F extends Kind.Kind,
  T extends unknown[],
  MinValue = never,
  MinScore extends number = never
> = T extends [infer Head extends Kind._$inputOf<F>, ...infer Tail]
  ? $<F, Head> extends infer NewScore extends number
    ? [MinScore] extends [never]
      ? _$minBy<F, Tail, Head, NewScore>
      : NaturalNumber._$compare<NewScore, MinScore> extends -1
        ? _$minBy<F, Tail, Head, NewScore>
        : _$minBy<F, Tail, MinValue, MinScore>
    : never
  : MinValue

interface MinBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$minBy<F, typeof x>
}

/**
 * `MinBy` is a type-level function that takes in a kind `F` that returns a number,
 * and a list `T`, and returns the element in `T` that has the lowest score
 * when applying `F` to each element.
 *
 * @template {Kind} F - The kind that returns a number.
 * @template {unknown[]} T - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.MinBy, Function.Identity>, [1, 2, 3]> // 1
 * ```
 */
export interface MinBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MinBy_T<typeof x>
}