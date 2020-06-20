export interface ICompareByKeyAndHash<T> {
  [key: string]: T;
}

export interface IChangeData<T> {
  oldData: T;
  newData: T;
}

export interface IObjectWithHash {
  <T>(arg: T): T;
  hash?: string;
}
