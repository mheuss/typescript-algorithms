import { ICompareByKey } from './type';

/**
 * When given two different arrays of objects, one original, one new, this class will tell you what was
 * added to the original,  and what is added in the new.
 * Has a generic that contains the interface of the object we are comparing.
 */
export class CompareByKey<T> {
  protected originalObject: ICompareByKey<T>;
  protected newObject: ICompareByKey<T>;

  constructor(originalObject: T[], newObject: T[], keyName: keyof T) {
    this.originalObject = this.mapObject(originalObject, keyName);
    this.newObject = this.mapObject(newObject, keyName);
  }

  /**
   * Returns Data of Type T removed from the original file.
   * @returns {Array<objects>} Files not in newFile, but was in original file.
   */
  public getDataNoLongerInFile = () => {
    const keysFromOriginal = Object.keys(this.originalObject);
    const dataNoLongerInFile: T[] = [];

    keysFromOriginal.forEach(property => {
      if (this.newObject[property] === undefined) {
        dataNoLongerInFile.push(this.originalObject[property]);
      }
    });

    return dataNoLongerInFile;
  };

  /**
   * Returns Data of Type T that is in the newFile, but not in the original file
   * @returns {Array<object>} Files not in original file, but is in the newFile.
   */
  public getNewData = () => {
    const keysFromNew = Object.keys(this.newObject);
    const newDataInFile: T[] = [];

    keysFromNew.forEach(property => {
      if (this.originalObject[property] === undefined) {
        newDataInFile.push(this.newObject[property]);
      }
    });

    return newDataInFile;
  };

  protected mapObject(data: T[], keyName: keyof T): ICompareByKey<T> {
    const transformedFile: ICompareByKey<T> = {};
    const keyAsString = `${keyName}` as keyof T;

    data.forEach(lineItem => {
      if (lineItem[keyAsString] === undefined) {
        throw { message: 'You cannot have an undefined key name' };
      }

      if (transformedFile[`${lineItem[keyAsString]}`] !== undefined) {
        throw { message: `Key is not unique ` };
      }
      transformedFile[`${lineItem[keyAsString]}`] = lineItem;
    });

    return transformedFile;
  }
}
