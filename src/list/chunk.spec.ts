import { $, List, Test } from '..'

type Chunk_Spec = [
  /**
   * Can chunk a list into sublists of a specified size.
   */
  Test.Expect<$<$<List.Chunk, 2>, [1, 2, 3, 4, 5]>, [[1, 2], [3, 4], [5]]>,

  /**
   * Can chunk a list into length-3 sublists.
   */
  Test.Expect<$<$<List.Chunk, 3>, [1, 2, 3, 4, 5, 6]>, [[1, 2, 3], [4, 5, 6]]>,

  /**
   * Trailing elements have a shorter sublist length.
   */
  Test.Expect<$<$<List.Chunk, 2>, [1, 2, 3, 4, 5]>, [[1, 2], [3, 4], [5]]>,

  /**
   * Can handle an empty list.
   */
  Test.Expect<$<$<List.Chunk, 2>, []>, []>,

  /**
   * Chunking by 0 results in the original list.
   */
  Test.Expect<$<$<List.Chunk, 0>, [1, 2, 3, 4, 5]>, [[1, 2, 3, 4, 5]]>
]
