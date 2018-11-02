import { itsRevertible, RevertibleIterable } from './revertible-iterable';

/**
 * Checks whether the given iterable is empty.
 *
 * @param iterable Iterable to check for elements.
 *
 * @return `true` if the given iterable contains at least one element, or `false` otherwise.
 */
export function itsEmpty(iterable: Iterable<any>): boolean {
  return iterable[Symbol.iterator]().next().done;
}

/**
 * Returns the first element of the given iterable.
 *
 * @param iterable Iterable to extract element from.
 *
 * @return Either the first element, or `undefined` if the given `iterable` is empty.
 */
export function itsFirst<T>(iterable: Iterable<T>): T | undefined {
  return iterable[Symbol.iterator]().next().value;
}

/**
 * Returns the last element of the given iterable.
 *
 * If the given `iterable` is an array, then just returns its last element. If it is revertible, then extracts the first
 * element of reverted iterable. Otherwise iterates over elements to find the last one.
 *
 * @param iterable Iterable to extract element from.
 *
 * @return Either the last element, or `undefined` if the given `iterable` is empty.
 */
export function itsLast<T>(iterable: Iterable<T> | RevertibleIterable<T> | T[]): T | undefined {
  if (Array.isArray(iterable)) {
    return iterable[iterable.length - 1];
  }
  if (itsRevertible(iterable)) {
    return itsFirst(iterable.reverse());
  }

  let last: T | undefined;

  for (const element of iterable) {
    last = element;
  }

  return last;
}

/**
 * Constructs an iterable of array elements in reverse order.
 *
 * @param array Source array.
 *
 * @returns Reversed array elements iterable.
 */
export function reverseArray<T>(array: T[]): Iterable<T> {
  return {
    *[Symbol.iterator]() {

      const len = array.length;

      for (let i = len - 1; i >= 0; --i) {
        yield array[i];
      }
    }
  };
}