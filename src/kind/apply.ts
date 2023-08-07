import { $, Type, Kind } from "..";

interface Apply_T<X> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>
  ): $<
    typeof x,
    Type._$cast<
      X,
      Kind._$inputOf<Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>>
    >
  >;
}

/**
 * `Apply` is a type-level function that takes an input type, stores it in its closure,
 * and returns a higher-kinded type function that expects an argument and functions as a deferred callback.
 * When a type-level function is applied to the output type of `Apply`,
 * the type-level function is applied to the argument in its closure,
 * and the result is returned.
 *
 * @param X a type to which a `Kind` can be applied
 *
 * @see {@link $}
 * `Apply` is the partially-applicable formulation of the `$` applicator.
 * While `$` immediately applies a higher-kinded type function to an input,
 * `Apply` can also be passed into other type-level functions without being invoked.
 *
 * `Apply` can be useful when implementing inversion of control.
 *
 * @example
 * For example, let's say we want to implement a function that will extract
 *
 * ```ts
 * type INPUT = [
 *   { city: "Los Angeles", country: "USA" },
 *   { city: "Seoul", country: "Korea" },
 *   { city: "Paris", country: "France" }
 * ]
 *
 * type CityListCountryList = $N<List.Map, [
 *   $<Kind.Apply, INPUT>,
 *   [
 *       $<List.Map, $<Object.At, "city">>,
 *       $<List.Map, $<Object.At, "country">>
 *   ]
 * ]>  // [["Los Angeles", "Seoul", "Paris"], ["USA", "Korea", "France"]]
 *
 * type CityListCountryListUnapplied = $<Kind.Pipe, [
 *   Kind.Apply,
 *   List.Map,
 *   $<Kind.Apply,
 *     $N<List.Map, [
 *         List.Map,
 *         [$<Object.At, "city">, $<Object.At, "country">]
 *     ]>
 *   >,
 * ]>
 *
 * type $$<[CityListCountryListUnapplied, List.Zip, $<List.Map, $<String.Join, ", ">>], INPUT>
 * ```
 */
export interface Apply extends Kind.Kind {
  f(x: this[Kind._]): Apply_T<typeof x>;
}
