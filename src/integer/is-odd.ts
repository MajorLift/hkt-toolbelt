import { Type, Kind, DigitList, Number, NaturalNumber } from '..'

export type _$isOdd<
  T extends Number.Number,
  LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<T>
  >,
  RESULT = DigitList._$isOdd<LIST>
> = RESULT

export interface IsOdd extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$isOdd<typeof x> : never
}