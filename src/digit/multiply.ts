import { Digit, Kind, Type } from '..'

/**
 * `_$multiply_LUT` is a type-level lookup table that is used by `_$multiply` to
 * multiply two digits together. It maps a digit type `A` and a digit type `B`
 * to the result of multiplying `A` by `B`, modulo 10.
 *
 * For example, `_$multiply_LUT["2"]["3"]` is equal to `"6"`. Below, this is
 * counted 'down' the rows and 'across' the columns in the table.
 */
type _$multiply_LUT = [
  ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['0', '2', '4', '6', '8', '0', '2', '4', '6', '8'],
  ['0', '3', '6', '9', '2', '5', '8', '1', '4', '7'],
  ['0', '4', '8', '2', '6', '0', '4', '8', '2', '6'],
  ['0', '5', '0', '5', '0', '5', '0', '5', '0', '5'],
  ['0', '6', '2', '8', '4', '0', '6', '2', '8', '4'],
  ['0', '7', '4', '1', '8', '5', '2', '9', '6', '3'],
  ['0', '8', '6', '4', '2', '0', '8', '6', '4', '2'],
  ['0', '9', '8', '7', '6', '5', '4', '3', '2', '1']
]

/**
 * `_$multiply` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the result of multiplying `A` by `B`, modulo 10. The result
 * is a single digit type.
 *
 * @template {Digit} A - A digit type, the multiplier.
 * @template {Digit} B - A digit type, the multiplicand.
 *
 * @example
 * For example, we can use `_$multiply` to multiply two digit types. In this
 * example, `2` and `3` are passed as type arguments to the type-level function:
 *
 * ```ts
 * import { Digit } from "hkt-toolbelt"
 *
 * type Result = Digit._$multiply<"2", "3"> // "6"
 * ```
 */
export type _$multiply<
  A extends Digit.Digit,
  B extends Digit.Digit
> = _$multiply_LUT[A][B]

interface Multiply_T<A extends Digit.Digit> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): _$multiply<A, typeof x>
}

/**
 * `Multiply` is a type-level function that takes in two digit types, `A` and
 * `B`, and returns the result of multiplying `A` by `B`, modulo 10. The result
 * is a single digit type.
 *
 * @template {Digit} A - A digit type, the multiplier.
 * @template {Digit} B - A digit type, the multiplicand.
 *
 * @example
 * For example, we can use `Multiply` to multiply two digit types. In this
 * example, `2` and `3` are passed as type arguments to the type-level function:
 *
 * We apply `Multiply` to `2` and `3` respectively using the `$` type-level
 * applicator:
 *
 * ```ts
 * import { $, Digit } from "hkt-toolbelt"
 *
 * type Result = $<$<Digit.Multiply, "2">, "3"> // "6"
 * ```
 */
export interface Multiply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): Multiply_T<typeof x>
}
