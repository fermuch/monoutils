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
