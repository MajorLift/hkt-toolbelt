import { Type, Kind } from '..'

/**
 * `List._$unshift` is a type-level function that prepends an item to a list.
 * 
 * @template X - The item to prepend.
 * @template T - The list to prepend to.
 * 
 * @example
 * type T0 = List._$unshift<1, [2, 3, 4]> // [1, 2, 3, 4]
 */
export type _$unshift<X, T extends unknown[]> = [X, ...T]

/**
 * `List.Unshift_T` is an intermediate interface for currying.
 * 
 * @template X - The item to prepend.
 */
interface Unshift_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unshift<X, typeof x>
}

/**
 * `List.Unshift` is a type-level function that prepends an item to a list.
 * 
 * @template X - The item to prepend.
 * @template T - The list to prepend to.
 * 
 * @example
 * type T0 = $<$<List.Unshift, 1>, [2, 3, 4]> // [1, 2, 3, 4]
 */
export interface Unshift extends Kind.Kind {
  f(x: this[Kind._]): Unshift_T<typeof x>
}
