import { Type, Number, Kind, DigitList, NaturalNumber } from '..'

/**
 * `_$add` is a type-level function that takes in two natural numbers `A` and `B`,
 * and returns the sum of the two natural numbers.
 *
 * @template {Number.Number} A - A natural number to be added to.
 * @template {Number.Number} B - A natural number to be added.
 * @returns {Number.Number} A natural number.
 *
 * @example
 * For example, we can use `_$add` to add the two natural numbers 123 and 456:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt"
 *
 * type Result = NaturalNumber._$add<123, 456> // 579
 * ```
 */
export type _$add<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  SUM_LIST extends DigitList.DigitList = DigitList._$add<A_LIST, B_LIST>,
  SUM = DigitList._$toNumber<SUM_LIST>
> = SUM

export interface Add_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$add<A, typeof x> : never
}

/**
 * `Add` is a type-level function that takes in two natural numbers `A` and `B`,
 * and returns the sum of the two natural numbers.
 *
 * @template {Number.Number} A - A natural number to be added to.
 * @template {Number.Number} B - A natural number to be added.
 * @returns {Number.Number} A natural number or `never`.
 *
 * If one or more of the inputs is not zero or a natural number, an error is emitted.
 *
 * @example
 * For example, we can use `Add` to add the two natural numbers 123 and 456:
 *
 * We apply `Add` to 123 and 456 respectively using
 * the `$` type-level applicator:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt"
 *
 * type Result = $<$<NaturalNumber.Add, 123>, 456> // 579
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Add, -42.42>; // never
 * ```
 */
export interface Add extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Add_T<typeof x> : never
}

/**
 * Given two natural numbers, return their sum.
 *
 * @param {number} a - The first natural number.
 * @param {number} b - The second natural number.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.add(2)(3)
 * //    ^? 5
 * ```
 */
export const add = ((a: number) => (b: number) => a + b) as Kind._$reify<Add>
