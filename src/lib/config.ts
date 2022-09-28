// import { default as lGet } from "lodash/get";

// eslint-disable-next-line @typescript-eslint/ban-types
function lGet<TObject extends object, TKey extends keyof TObject, TDefault>(
  obj: TObject,
  path: TKey | TKey[],
  defaultValue: TDefault = undefined
): Exclude<TObject[TKey], undefined> | TDefault {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

type Concat<K extends string, P extends string> = `${K}${"" extends P
  ? ""
  : "."}${P}`;

type GetDictValue<T extends string, O> = T extends `${infer A}.${infer B}`
  ? A extends keyof O
    ? GetDictValue<B, O[A]>
    : never
  : T extends keyof O
  ? O[T]
  : never;

type DeepKeys<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]-?: `${K & string}` | Concat<K & string, DeepKeys<T[K]>>;
    }[keyof T]
  : "";

// type StringKeys<T> = T extends Record<string, unknown>
//   ? {
//       [K in keyof T]: StringKeys<T[K]>;
//     }
//   : string;

/**
 * Config manager for the script.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export class Config<Conf extends object> {
  public store: Partial<Conf>;

  constructor() {
    this.reload.call(this);
  }

  reload() {
    if (typeof getSettings === "function") {
      this.store = (getSettings?.() as Partial<Conf>) || {};
    } else {
      this.store = {};
    }
  }

  get<K extends DeepKeys<Conf>>(
    path: K,
    defaultValue: GetDictValue<K, Conf> | undefined = undefined
  ): GetDictValue<K, Conf> | undefined {
    if (!this.store) {
      return defaultValue;
    }

    return lGet(this.store, path as never, defaultValue) as
      | GetDictValue<K, Conf>
      | undefined;
  }
}
