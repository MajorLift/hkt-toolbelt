import { Kind, Type, DecimalDigitList, DigitList, Digit, Number } from '..'

export type _$fromString2<
  T extends string,
  INT extends Number.Number = T extends `${infer WHOLE}.${string}`
    ? Number._$fromString<WHOLE>
    : never,
  M extends DecimalDigitList.DecimalDigitList = T extends `${INT}.${infer FRAC}`
    ? [INT, ...DigitList._$fromString2<FRAC>]
    : [Digit.Zero]
> = M

export type _$fromString<T extends string> = DigitList._$trimRight<
  _$fromString2<T>
>

export interface FromString extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], string>
  ): Number._$isDecimal<typeof x> extends true ? _$fromString<typeof x> : never
}
