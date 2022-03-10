import { default as lGet } from "lodash/get";

type Config = Record<string, unknown>;

export function getConfig<T extends Record<string, unknown>>(): Partial<T> {
  const conf = getSettings?.() as Partial<T>;
  if (!conf) {
    return {} as Partial<T>;
  }

  return conf;
}

export function get<Conf extends Config, T = null>(
  path: string[],
  defaultValue: T = null,
): T {
  const conf = getConfig<Conf>();
  if (!conf) {
    return defaultValue;
  }

  const realPath = Array.isArray(path) ? path : [path];
  return lGet(conf, realPath, defaultValue) as T;
}
