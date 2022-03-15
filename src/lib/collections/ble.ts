import { CollectionDoc, StoreBasicValueT } from "@fermuch/telematree";
import { myID } from "../tools";

export interface BleCollection {
  id: string;
  target: string;

  [key: string]: StoreBasicValueT;
}

let initialized = false;

/**
 * Get the Frota doc for this specific device.
 * Also sets the doc as watched, so that it will be updated on changes.
 * @returns {CollectionDoc<BleCollection> | null}
 */
export function getBleDoc(): CollectionDoc<BleCollection> | null {
  const col =
    env.project?.collectionsManager?.ensureExists?.<BleCollection>("ble");
  if (!col) return null;

  if (!initialized) {
    col.set(myID(), 'id', myID());
    initialized = true;
  }

  return col.get(myID());
}
