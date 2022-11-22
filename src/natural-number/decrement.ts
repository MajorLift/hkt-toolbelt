import { Type, Kind, DigitList, NaturalNumber, Number } from "..";

export type _$decrement<
  A extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  DECREMENT extends DigitList.DigitList = DigitList._$decrement<A_LIST>,
  RESULT extends Number.Number = DigitList._$toString<DECREMENT>
> = RESULT;

export declare abstract class Decrement extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => Number._$isNatural<typeof x> extends true
    ? _$decrement<typeof x>
    : never;
}
