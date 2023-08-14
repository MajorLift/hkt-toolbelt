import { Number, Kind, Type, Conditional, Boolean } from '..'

export type _$isDecimal<
  T extends Number.Number,
  IS_DECIMAL = T extends `${infer WHOLE extends
    Number.Number}.${infer FRAC extends Number.Number}`
    ? Number._$isNatural<FRAC> extends false
      ? false
      : Boolean._$or<
          Number._$isInteger<WHOLE>,
          Conditional._$equals<WHOLE, ''>
        > extends true
      ? true
      : never
    : false
> = number extends T ? false : IS_DECIMAL extends true ? false : true

export interface IsDecimal extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends false ? _$isDecimal<typeof x> : never
}
