import * as hashingFunction from 'object-hash';
import { IChangeData, ICompareByKeyAndHash, IObjectWithHash } from './type';

/**
 * When given two arrays of objects, one original, one new, this class will tell you what was added to the original,
 * and what is added in the new.
 * Has a generic that contains the interface of the object we are comparing.
 */

export class CompareByKeyAndHash<T> {
  protected static compareObject<T>(
    firstObject: ICompareByKeyAndHash<IObjectWithHash>,
    secondObject: ICompareByKeyAndHash<IObjectWithHash>
  ) {
    const keysFromFirst = Object.keys(firstObject);
    const newData: T[] = [];

    keysFromFirst.forEach(property => {
      if (secondObject[property] === undefined) {
        const objWithoutHash = { ...firstObject[property] };
        delete objWithoutHash.hash;
        newData.push(objWithoutHash as T);
      }
    });

    return newData;
  }

  protected originalObject: ICompareByKeyAndHash<IObjectWithHash>;
  protected newObject: ICompareByKeyAndHash<IObjectWithHash>;

  constructor(originalFile: T[], newFile: T[], keyName: keyof T) {
    this.originalObject = this.mapObject(originalFile, keyName);
    this.newObject = this.mapObject(newFile, keyName);
  }

  public getDataNoLongerInObject = () => {
    return CompareByKeyAndHash.compareObject<T>(
      this.originalObject,
      this.newObject
    );
  };

  public getNewData = () => {
    return CompareByKeyAndHash.compareObject<T>(
      this.newObject,
      this.originalObject
    );
  };

  public getChangedData = (): Array<IChangeData<T>> => {
    const keysFromNew = Object.keys(this.newObject);
    const changedDataInFile: Array<IChangeData<T>> = [];

    keysFromNew.forEach(property => {
      if (
        this.originalObject[property] !== undefined &&
        this.newObject[property] !== undefined &&
        this.originalObject[property].hash !== this.newObject[property].hash
      ) {
        const oldObjWithoutHash = { ...this.originalObject[property] };
        delete oldObjWithoutHash.hash;
        const newObjWithoutHash = { ...this.newObject[property] };
        delete newObjWithoutHash.hash;

        changedDataInFile.push({
          newData: newObjWithoutHash as T,
          oldData: oldObjWithoutHash as T,
        });
      }
    });

    return changedDataInFile;
  };

  protected mapObject(
    data: T[],
    keyName: keyof T
  ): ICompareByKeyAndHash<IObjectWithHash> {
    const transformedFile: ICompareByKeyAndHash<IObjectWithHash> = {};
    const keyAsString = `${keyName}` as keyof T;

    data.forEach(lineItem => {
      if (lineItem[keyAsString] === undefined) {
        throw { message: 'You cannot have an undefined key name' };
      }

      if (transformedFile[`${lineItem[keyAsString]}`] !== undefined) {
        throw { message: `Key is not unique ` };
      }

      const calculatedHash = hashingFunction(lineItem);
      transformedFile[`${lineItem[keyAsString]}`] = ({
        ...lineItem,
        hash: calculatedHash,
      } as unknown) as IObjectWithHash;
    });

    return transformedFile;
  }
}
