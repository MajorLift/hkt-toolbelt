import { Type, Kind } from '..'

/**
 * `List.Length` is a type-level function that returns the length of a list.
 * 
 * @template T - The list to get the length of.
 * 
 * @example
 * type T0 = List._$length<[1, 2, 3]> // 3
 * type T1 = List._$length<[]> // 0
 */
export type _$length<T extends unknown[]> = T['length']

/**
 * `List.Length` is a type-level function that returns the length of a list.
 * 
 * @template T - The list to get the length of.
 * 
 * @example
 * type T0 = $<List.Length, [1, 2, 3]> // 3
 * type T1 = $<List.Length, []> // 0
 */
export interface Length extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$length<typeof x>
}
