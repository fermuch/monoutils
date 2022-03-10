import { default as lGet } from "lodash/get";

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
  public readonly store: Partial<Conf>;

  constructor() {
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

    return lGet(this.store, path, defaultValue) as
      | GetDictValue<K, Conf>
      | undefined;
  }
}
