# TypeScript Convention

## camelCase

- Variable
- Function
- Class members & Method
- Interface member

## PascalCase

- Class
- Namespace
- Enum
- Enum members
- Interface

## Interface

- Do not prefix with `I`

## General Types

- Don't use: `Number`, `String`, `Boolean`, `Symbol` or `Object`

```ts
/* WRONG */
function reverse(s: String): String;
```

- Use: `number`, `string`, `boolean`, and `symbol`

```ts
/* OK */
function reverse(s: string): string;
```

## Generics

- Don't ever have a generic type which doesn't use its type parameters.

```ts
/* BAD */
interface Named {
  name: string;
}
class MyNamed implements Named {
  name: 'mine';
}
function findByName(x: Named): T {
  // TODO: Implement
  return undefined;
}
var x: MyNamed;
var y = findByName(x); // expected y: string, got y: {}
```

```ts
/* OK */
interface Named<T> {
  name: string;
  value: T; // <-- added
}
class MyNamed<T> implements Named<T> {
  name: 'mine';
  value: T; // <-- added
}
function findByName<T>(x: Named<T>): T {
  // TODO: Implement
  return undefined;
}
var x: MyNamed<string>;
var y = findByName(x); // got y: string;
```

## `null` and `undefined`

### `null`

- Use `null` where it's part of the API or conventional

### undefined

- Use `undefined` in general

### General rule for `null` and `undefined`

Don't use

- explicit unavailability

Use

- truthy check
- for objects being `null` or `undefined`
- `==` / `!=` (not `===` / `!==`) to check for `null`/ `undefined` (not falsy values like `''`, `0`, `false`)

## array

- Annotate arrays as `foo:Foo[]` instead of `foos:Array[Foo]`

## type vs. interface

### type

- `type` when you need a `union` or `intersection`

```ts
type Foo = number | { someProperty: number };
```

## interface

- `interface` when you want `extends` or `implements`

```ts
interface Foo {
  foo: string;
}
interface FooBar extends Foo {
  bar: string;
}
class X implements FooBar {
  foo: string;
  bar: string;
}
```

## Callback Types

### Return Types of Callbacks

Don't

- Use return type `any` for callbacks whose value will be _ignored_

```ts
/* WRONG */
function fn(x: () => any) {
  x();
}
```

Do

- Use the return type `void` for callbacks whose value will be _ignored_

```ts
/* OK */
function fn(x: () => void) {
  x();
}
```

### Optional Parameters in Callbacks

- Don't use optional parameters in callbacks unless you really mean it

```ts
/* WRONG */
interface Fetcher {
  getObject(done: (data: any, elapsedTime?: number) => void): void;
}
```

- Do write callback parameters as non-optional

```ts
/* OK */
interface Fetcher {
  getObject(done: (data: any, elapsedTime: number) => void): void;
}
```

### Overloads and Callbacks

- Don't write separate overloads that differ only on callback arity

```ts
/* WRONG */
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

- Do write a single overload using the maximum arity

```ts
/* OK */
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

## Function Overloads

### Ordering

- Don't put more general overloads before more specific overloads

```ts
/* WRONG */
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;
var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

- Do sort overloads by putting the more general signatures after more specific signatures

```ts
/* OK */
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;
var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

### Use Optional Parameters

- Don't write several overloads that differ only in trailing parameters

```ts
/* WRONG */
interface Example {
  diff(one: string): number;
  diff(one: string, two: string): number;
  diff(one: string, two: string, three: boolean): number;
}
```

- Do use optional parameters whenever possible

```ts
/* OK */
interface Example {
  diff(one: string, two?: string, three?: boolean): number;
}
```

### Use Union Types

- Don't write overloads that differ by type in only one argument position

```ts
/* WRONG */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number): Moment;
  utcOffset(b: string): Moment;
}
```

- Do use union types whenever possible

```ts
/* OK */
interface Moment {
  utcOffset(): number;
  utcOffset(b: number | string): Moment;
}
```
