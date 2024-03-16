import { Kind, Type, Number, NaturalNumber } from '..'

/**
 * `_$factorial` is a type-level function that calculates the factorial of a number.
 *
 * @template COUNTER - The number to calculate the factorial of.
 * @template VALUE - The current value of the factorial calculation. Defaults to 1.
 * @template DONE - A boolean that indicates whether the factorial calculation is done.
 *
 * @example
 * type T0 = _$factorial<5> // 120
 * type T1 = _$factorial<0> // 1
 */
export type _$factorial<
  COUNTER extends Number.Number,
  VALUE extends Number.Number = 1,
  DONE extends boolean = COUNTER extends 0 ? true : false
> = 0 extends 1
  ? never
  : DONE extends true
    ? VALUE
    : _$factorial<
        NaturalNumber._$decrement<COUNTER>,
        NaturalNumber._$multiply<VALUE, COUNTER>
      >

/**
 * `Factorial` is a type-level function that calculates the factorial of a number.
 *
 * @template x - The number to calculate the factorial of.
 *
 * @example
 * type T0 = $<Factorial, 5> // 120
 * type T1 = $<Factorial, 0> // 1
 */
export interface Factorial extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$factorial<typeof x>
}
