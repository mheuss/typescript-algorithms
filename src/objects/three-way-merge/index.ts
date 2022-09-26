import {
  cloneDeep,
  isArray,
  isEqual,
  isObject,
  keys,
  omit,
  reduce,
} from "lodash";

interface IObjectMerge<T> {
  changedObject: T;
  freshObject: T;
  initialObject: T;
}

/**
 * When given three objects - one that has no changes but is possibly stale, one that the user has changed and that is
 * descended from the possibly stale object, and a fresh object containing possibly updated information from a third
 * party, this function will extract only the changed properties from the stale object and the user changed object,
 * and then merge just those changes on top of the fresh object.
 *
 * @param {IObjectMerge} collection Object that contains the initialObject, the freshObject and the Changed object.
 * @returns  Object with most recent values from all three objects.
 */
export default function threeWayObjectMerge<T extends object>(
  collection: IObjectMerge<T>
): T {
  const { changedObject, freshObject, initialObject } = collection;

  const finalObject: T = cloneDeep(freshObject);

  const diffOfObjects = diffDeep(initialObject, changedObject);

  for (const property in diffOfObjects) {
    if (property !== undefined) {
      // @ts-expect-error - The object's properties are generic.
      finalObject[property] = diffOfObjects[property] as T[keyof T];
    }
  }

  return finalObject;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * When given two objects, one descended from the other, return a new object that only contains the changed properties between the two.
 * @param sourceObject Contains the source object, without changes. We don't want the unchanged values.
 * @param derivedObject Containing a changed object, wherein we only want the changed properties.
 * @returns Containing the changed values between the source and derived object only.
 */
export function diffDeep(
  sourceObject: any,
  derivedObject: any
): any | undefined {
  return reduce(
    // The object being reduced.
    sourceObject,
    // The reducing function
    (resultingObject, currentValue, currentKey) => {
      // Recursively call `diffDeep` on objects, but not arrays
      if (
        isObject(currentValue) &&
        isObject(derivedObject[currentKey]) &&
        !isArray(currentValue)
      ) {
        resultingObject[currentKey as any] = diffDeep(
          currentValue,
          derivedObject[currentKey]
        );

        return resultingObject;
      }
      // For all other types of values, compare to the matching key in the derived object
      // If the values aren't equal, use the value from the derived object
      if (!isEqual(currentValue, derivedObject[currentKey])) {
        resultingObject[currentKey as any] = derivedObject[currentKey];
      }

      // Otherwise, the values are the same. Make no changes and return
      return resultingObject;
    },
    // The accumulator object; The omit here is just to ensure that any keys that are present in the derived object
    // but not in the first are preserved
    omit(derivedObject, keys(sourceObject))
  );
}

/* eslint-enable @typescript-eslint/no-explicit-any */
