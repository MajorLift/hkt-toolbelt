import { $, Test, Object } from '..'

/**
 * Tests for `Object.AtPaths`, which returns the values at a given list of paths in an
 * object. The paths are specified as a string or, if nested, a tuple of keys.
 */
type AtPaths_Spec = [
  /**
   * Can get the value at a path.
   */
  Test.Expect<
    $<
      $<Object.AtPaths, ['age', ['name', 'first']]>,
      {
        name: {
          first: 'foo'
          last: string
        }
        age: number
      }
    >,
    [number, 'foo']
  >,

  /**
   * Can get the value at a path in a union.
   */
  Test.Expect<
    $<
      $<Object.AtPath, ['age', ['name', 'first']]>,
      | {
          name: {
            first: 'foo'
            last: string
          }
          age: number
        }
      | {
          name: {
            first: 'bar'
            last: string
          }
          age: number
        }
    >,
    [number, 'foo'] | [number, 'bar']
  >,

  /**
   * Will emit never if the path does not exist.
   */
  Test.Expect<
    $<
      $<Object.AtPath, [['name', 'first']]>,
      { name: { last: string }; age: number }
    >,
    never
  >
]
