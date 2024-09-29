import { $, Kind, Type, Number } from '..'

/**
 * `_$transformAt` is a type-level function that takes in a function `F`, an
 * index `I`, and a list `T`, and returns a new list with the element at index
 * `I` transformed by `F`.
 *
 * @template {Kind} F - The function to transform the element with.
 * @template {Number.Number} I - The index of the element to transform.
 * @template {unknown[]} T - The list to transform the element in.
 *
 * @example
 * ```ts
 * type T0 = _$transformAt<String.ToUpper, 1, ['foo', 'bar']> // ['foo', 'BAR']
 * ```
 */
export type _$transformAt<
  F extends Kind.Kind,
  I extends Number.Number,
  T extends unknown[]
> = {
  [K in keyof T]: K extends `${I}`
    ? $<F, Type._$cast<T[K], Kind._$inputOf<F>>>
    : T[K]
}

interface TransformAt_T2<F extends Kind.Kind, I extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$transformAt<F, I, typeof x>
}

interface TransformAt_T1<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): TransformAt_T2<F, typeof x>
}

/**
 * `TransformAt` is a type-level function that takes in a function `F`, an index
 * `I`, and a list `T`, and returns a new list with the element at index `I`
 * transformed by `F`.
 *
 * @template {Kind} F - The function to transform the element with.
 * @template {Number.Number} I - The index of the element to transform.
 * @template {unknown[]} T - The list to transform the element in.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.TransformAt, String.ToUpper>, 1, ['foo', 'bar']> // ['foo', 'BAR']
 * ```
 */
export interface TransformAt extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): TransformAt_T1<typeof x>
}
