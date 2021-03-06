/**
 * @packageDocumentation
 * @module @proc7ts/a-iterable
 */
import { isArrayLike } from '@proc7ts/primitives';
import { reverseArray } from './array';
import { itsRevertible, RevertibleIterable } from './revertible-iterable';
import { itsIterator, makeIt } from './util';

/**
 * Constructs a reversed iterable.
 *
 * If the `source` iterable is an array-like structure, then uses `reverseArray()` function to revert the constructed
 * iterable.
 * If the `source` iterable is revertible, then uses its `reverse()` method to revert the constructed one.
 * Otherwise stores elements to array and reverts them with `reverseArray()` function.
 *
 * @param source  A source iterable.
 *
 * @returns An iterable of the `source` elements in reverse order.
 */
export function reverseIt<T>(source: Iterable<T> | RevertibleIterable<T> | ArrayLike<T>): Iterable<T> {
  if (isArrayLike(source)) {
    return reverseArray(source);
  }
  if (itsRevertible(source)) {

    const reversed = source.reverse();

    return makeIt(() => itsIterator(reversed));
  }
  return reverseArray(Array.from(source));
}

