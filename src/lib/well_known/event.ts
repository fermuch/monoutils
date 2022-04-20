import { currentLogin, myID } from "../tools";
import { CurrentGpsData, getCurrent } from "./gps";

/**
 * BaseEvent for all events,
 * based on telematree BaseEvent, but with a few extra properties
 * to make it easier to use in the app and in dashboards,
 * like deviceId, loginId, etc.
 */
export abstract class BaseEvent {
  createdAt: number;
  deviceId: string;
  loginId: string;
  gps: CurrentGpsData | null;

  constructor() {
    this.createdAt = Date.now() / 1000; // in seconds
    this.deviceId = myID() || "";
    this.loginId = currentLogin() || "";
    this.gps = getCurrent() || null;
  }

  // what kind of data is this event?
  // used mainly to filter between different events.
  abstract kind: string;

  // getData() returns a copy of this event data
  abstract getData(): unknown;

  // returns a JSON-serializable object of the event.
  toJSON(): {
    kind: string;
    createdAt: number;
    data: unknown;
    deviceId: string;
    gps: CurrentGpsData | null;
    loginId: string;
  } {
    return {
      kind: this.kind,
      createdAt: this.createdAt,
      deviceId: this.deviceId,
      loginId: this.loginId,
      gps: this.gps,
      data: this.getData(),
    };
  }
}

/**
 * Generate an event of the given kind. It is useful to create events
 * easier than to instance BaseEvent and extend it.
 *
 * @param kind string. The kind of event. This must be unique
 * @param data Any payload, as long as it does not contain any undefined. Nulls are fine.
 * @returns BaseEvent
 */
export function generateEvent(kind: string, data: unknown = {}): BaseEvent {
  return new (class extends BaseEvent {
    kind = kind;
    getData() {
      return data;
    }
  })();
}

/**
 * Useful utility to convert from telematree's BaseEvent to monoutils BaseEvent (with more metadata)
 * @param ev BaseEvent. The base event to be emitted.
 * @returns BaseEvent
 */
export function regenerateEvent(ev: any): BaseEvent {
  return new (class extends BaseEvent {
    kind = ev?.kind || "unknown-event";
    constructor() {
      super();
      this.createdAt = ev?.createdAt || Date.now() / 1000; // in seconds
    }
    getData() {
      return ev?.getData?.() || {};
    }
  })();
}

export function subscribe<E extends BaseEvent = BaseEvent>(
  kind: E["kind"],
  handler: (ev: E) => void
) {
  messages.on("onEvent", (ev: any) => {
    if (ev.kind === kind) {
      handler(regenerateEvent(ev) as E);
    }
  });
}
