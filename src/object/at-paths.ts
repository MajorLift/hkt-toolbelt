import { Kind, Type, Object, List } from '..'

export type _$atPaths<
  Paths extends (PropertyKey[] | PropertyKey)[],
  T,
  Acc extends List.List = [],
  Curr extends keyof T | (keyof T)[] = List._$first<Paths>,
  Val = Curr extends PropertyKey[]
    ? Object._$atPath<Curr, T>
    : Object._$at<Curr, T>,
  Rest extends (PropertyKey[] | PropertyKey)[] = List._$shift<Paths>,
  Result = Paths extends []
    ? Acc
    : Val extends never
    ? never
    : _$atPaths<Rest, T, List._$push<Val, Acc>>
> = Result

interface AtPaths_T<Path extends (PropertyKey[] | PropertyKey)[]>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$atPaths<Path, typeof x>
}

export interface AtPaths extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], (PropertyKey[] | PropertyKey)[]>
  ): AtPaths_T<typeof x>
}
