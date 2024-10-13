<a href="https://github.com/poteat/hkt-toolbelt#readme">
  <img src=https://raw.githubusercontent.com/poteat/hkt-toolbelt/main/docs/logo.jpeg>
</a>

<br>
<br>

<p align="center">
  <a href="https://www.npmjs.com/package/hkt-toolbelt">
    <img src=https://img.shields.io/npm/v/hkt-toolbelt?color=green>
  </a>
  <img src=https://img.shields.io/github/workflow/status/poteat/hkt-toolbelt/build>
  <img src=https://img.shields.io/github/repo-size/poteat/hkt-toolbelt>
  <br>
  <img src=https://img.shields.io/npm/dw/hkt-toolbelt>
  <img src=https://img.shields.io/github/license/poteat/hkt-toolbelt>
  <a href="https://code.lol">
    <img src=https://img.shields.io/badge/blog-code.lol-blue>
  </a>
</p>

<p align="center">
  <i>A higher-kinded-type companion to ts-toolbelt</i>
</p>

---

# [Guide]: HK-Type Encoding

Higher-kinded types are encoded as a type that extends the `Kind` type. The `Kind` type is a generic that takes in a type parameter $F$, which represents the underlying type transformation being performed.

All higher-kinded types possess a property called `Kind._`, which is a symbol that represents the unapplied type parameter.

```ts
namespace Kind {
  export type _ = unique symbol;
}

declare abstract class Kind<F extends Function.Function = Function.Function> {
  abstract readonly [Kind._]: unknown;
  f: F;
}
```

## 1. HK-Types

A HK-type is defined via an interface that extends the `Kind` type.

```ts
interface Length extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): typeof x["length"];
}
```

We encode the higher-kinded type parameter via `this`. We can further use the `Type._$cast` generic to encode input constraints.

## 2. Apply using $<>

Finally, we can apply a higher-kinded type to a type argument via the `$` generic.

```ts
export type $<F extends Kind.Kind, X> = 
Function._$returnType<
  (F & { readonly [Kind._]: Type._$cast<X, Kind._$inputOf<F>> })['f']
>
```

Here, we use the `Kind._$inputOf` and `Type._$cast` types to extract and constrain the input type of the higher-kinded type $F$. We then use the `Function._$returnType` generic to extract the return type of the higher-kinded type, _after_ we have used `&` to merge the higher-kinded type with the input type.

### 2.1. Apply Example

```ts
import { $ } from "hkt-toolbelt";

type Result = $<Length, [1, 2, 3]>; // 3
```
