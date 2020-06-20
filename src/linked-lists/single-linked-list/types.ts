export type SearchFunction<T> = (value: T) => boolean;

export interface IFindType<T> {
  index: number;
  value: T;
}

export type FindTypes<T> = Array<IFindType<T>>;
