import { CollectionDoc, StoreBasicValueT } from "@fermuch/telematree";
import { myID } from "../tools";

export interface FrotaCollection {
  id: string;
  scriptVer: string;
  batteryLevel: number;
  appVer: string;
  ioVer: string;
  lastEventAt: number;
  bleConnected: boolean;
  currentLogin: string;
  loginDate: number;
  mttr: number;
  mtbf: number;
  pulsusId?: string;

  [key: string]: StoreBasicValueT;
}

/**
 * Get the Frota doc for this specific device.
 * Also sets the doc as watched, so that it will be updated on changes.
 * @returns {CollectionDoc<FrotaCollection> | null}
 */
export function getFrotaDoc(): CollectionDoc<FrotaCollection> | null {
  const col =
    env.project?.collectionsManager?.ensureExists?.<FrotaCollection>("frota");
  if (!col) return null;

  col.watch(myID());
  const doc = col.get(myID());

  return doc;
}

/**
 * Util to update a value if it has changed.
 *
 * @param key key of frota collection
 * @param val value for the key or undefined
 * @returns void
 */
export function maybeUpdateFrota<
 K extends keyof FrotaCollection
>(
 key: K,
 val: FrotaCollection[K] | undefined
) {
 if (typeof val === 'undefined') {
   return;
 }

 if (typeof key === 'number') {
   return;
 }

 const frota = getFrotaDoc();
 const currentVal = (frota.data as typeof frota.data)?.[key];
 if (currentVal !== val) {
   frota.set(key, val);
 }
}