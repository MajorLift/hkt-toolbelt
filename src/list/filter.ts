import { $, Type, Kind, Function } from '..'

/**
 * `_$filter` is a type-level function that takes in two inputs:
 * a partially-applied type-level predicate that expects one more argument and returns a boolean type,
 * and a target list of types upon which to perform the filtering operation.
 * It returns a filtered list of types.
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @template F - A type-level function that returns a boolean type indicating whether a type should be included in the result.
 * @template X - A list of types. The target of the filtering operation.
 * @returns A list of types that satisfy the predicate `F`.
 *
 * @example
 * For example, we can use `_$filter` to filter out negative elements from a tuple of numeric types:
 *
 * type FilteredNumbers = List._$filter<Conditional.IsPositive, [1, -2, 3, -4]>;  // [1, 3]
 */
export type _$filter<
  F extends Kind.Kind,
  X extends unknown[],
  O extends unknown[] = []
> = X extends [infer Head, ...infer Tail]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? _$filter<F, Tail, [...O, Head]>
    : _$filter<F, Tail, O>
  : O

interface Filter_T<F extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>): _$filter<F, typeof x>
}

/**
 * `Filter` is a type-level function that takes in two inputs:
 * a partially-applied type-level predicate that expects one more argument and returns a boolean type,
 * and a target list of types upon which to perform the filtering operation.
 * It returns a filtered list of types.
 *
 * The type-level function input must be a unary, curried `Kind` type as defined in this library.
 * @see {@link https://github.com/poteat/hkt-toolbelt/blob/main/docs/guides/custom-kinds.md} for details on how to create a custom kind.
 *
 * @template F - A type-level function that returns a boolean type indicating whether a type should be included in the result.
 * @template X - A list of types. The target of the filtering operation.
 * @returns A list of types that satisfy the predicate `F`.
 *
 * @example
 * For example, we can define a filter for positive numbers and then apply it to a list:
 *
 * type FilteredNumbers = $<$<List.Filter, Conditional.IsPositive>, [1, -2, 3, -4]>;  // [1, 3]
 *
 * @example
 * We can also use the `$N` applicator to invoke `Filter` with a list containing the required arguments
 * This improves readability by allowing us to avoid nesting `$` calls.
 *
 * type FilterZeros = $N<List.Filter, [
 *   $<Conditional.NotEquals, 0>,
 *   [1, 0, 2, 0, 3]
 * ]>;  // [1, 2, 3]
 *
 * @example
 * By partially applying only the first argument to `Filter`,
 * we can define a type-level function that can apply the same operation to multiple list inputs.
 *
 * type FilterZeros = $<List.Filter, $<Conditional.NotEquals, 0>>;
 * type AllZero = $<FilterZeros, [0, 0, 0, 0, 0]>;  // []
 * type OneZero = $<FilterZeros, [0, 1, 2, 3, 4, 5]>;  // [1, 2, 3, 4, 5]
 *
 * @example
 * Another use case for a partially-applied `Filter` function is to implement
 * sophisticated higher-order functionality by passing it into other type-level functions.
 *
 * type HelloWorld = $$<[
 *   $<List.Filter, $<Conditional.Extends, string>>
 *   $<String.Join, ", ">
 * ], [42.42, null, "hello", undefined, "world"]>  // "hello, world"
 */
export interface Filter extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Filter_T<typeof x>
}

/**
 * Given a predicate and a list, filter the list to only include elements that
 * satisfy the predicate.
 *
 * @param {Kind.Kind<(x: never) => boolean>} f - The predicate to filter the list by.
 * @param {unknown[]} values - The list to filter.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.filter(NaturalNumber.isGreaterThan(3))([1, 2, 3, 4, 5])
 * //    ^? [4, 5]
 * ```
 */
export const filter = ((f: Function.Function) => (values: unknown[]) =>
  values.filter((value) => f(value as never))) as Kind._$reify<Filter>
