import { CollectionDoc } from "@fermuch/telematree";
import { myID } from "../tools";

export interface HourmeterCollection {
  [hourmeterName: string]: number;
}

/**
 * Get the Hourmeter doc for this specific device.
 * Also sets the doc as watched, so that it will be updated on changes.
 * @returns {CollectionDoc<HourmeterCollection> | null}
 */
export function getHourmeterDoc(): CollectionDoc<HourmeterCollection> | null {
  const col =
    env.project?.collectionsManager?.ensureExists?.<HourmeterCollection>(
      "hourmeters"
    );
  if (!col) return null;

  col.watch(myID());
  const doc = col.get(myID());
  return doc;
}

/**
 * Util to update an hourmeter value if it has changed.
 * 
 * @param key key of hourmeter collection
 * @param val value for the key or undefined
 */
export function maybeUpdateHourmeter<
 K extends keyof HourmeterCollection
>(
 key: K,
 val: HourmeterCollection[K] | undefined
) {
 if (typeof val === 'undefined') {
   return;
 }

 if (typeof key === 'number') {
   return;
 }

 const hourmeter = getHourmeterDoc();
 const currentVal = (hourmeter.data as typeof hourmeter.data)?.[key];
 if (currentVal !== val) {
   hourmeter.set(key, val);
 }
}