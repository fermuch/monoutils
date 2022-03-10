import { default as lGet } from "lodash/get";

type Config = Record<string, unknown>;

export function getConfig<T extends Record<string, unknown>>(): Partial<T> {
  const conf = getSettings?.() as Partial<T>;
  if (!conf) {
    return {} as Partial<T>;
  }

  return conf;
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

type StringKeys<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: StringKeys<T[K]>;
    }
  : string;

export function get<
  Conf extends Record<string, unknown>,
  K extends string = DeepKeys<Conf>
>(
  path: K,
  defaultValue: GetDictValue<K, Conf> | undefined = undefined
): GetDictValue<K, Conf> | undefined {
  const conf = getConfig<Conf>();
  if (!conf) {
    return defaultValue;
  }

  return lGet(conf, path, defaultValue) as GetDictValue<K, Conf> | undefined;
}
