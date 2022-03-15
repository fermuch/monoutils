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

let initialized = false;

/**
 * Get the Frota doc for this specific device.
 * Also sets the doc as watched, so that it will be updated on changes.
 * @returns {CollectionDoc<FrotaCollection> | null}
 */
export function getFrotaDoc(): CollectionDoc<FrotaCollection> | null {
  const col =
    env.project?.collectionsManager?.ensureExists?.<FrotaCollection>("frota");
  if (!col) return null;

  const doc = col.get(myID());

  if (!initialized) {
    doc.set('id', myID());
    doc.set('appVer', Number(data.APP_BUILD_VERSION || '0'));
    doc.set('pulsusId', String(data.PULSUS_ID || ''));
    initialized = true;
  }

  return doc;
}
