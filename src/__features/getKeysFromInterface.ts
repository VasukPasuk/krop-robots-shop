export default function getKeys<T>(): Array<keyof T> {
  return Object.keys({} as T) as Array<keyof T>;
}
