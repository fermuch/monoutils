import { currentLogin, myID } from "../tools";

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

  constructor() {
    this.createdAt = Date.now() / 1000; // in seconds
    this.deviceId = myID() || '';
    this.loginId = currentLogin() || '';
  }

  // what kind of data is this event?
  // used mainly to filter between different events.
  abstract kind: string;
  
  // getData() returns a copy of this event data
  abstract getData(): unknown;

  // returns a JSON-serializable object of the event.
  toJSON(): {kind: string, createdAt: number, data: unknown, deviceId: string, loginId: string} {
    return {
      kind: this.kind,
      createdAt: this.createdAt,
      deviceId: this.deviceId,
      loginId: this.loginId,
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
export function generateEvent(kind: string, data: unknown): BaseEvent {
  return new class extends BaseEvent {
    kind = kind;
    getData() {
      return data;
    }
  }();
}

/**
 * Useful utility to convert from telematree's BaseEvent to monoutils BaseEvent (with more metadata)
 * @param ev BaseEvent. The base event to be emitted.
 * @returns BaseEvent
 */
export function regenerateEvent(ev: any): BaseEvent {
  return new class extends BaseEvent {
    kind = ev?.kind || 'unknown-event';
    constructor() {
      super();
      this.createdAt = ev?.createdAt || Date.now() / 1000; // in seconds
    }
    getData() {
      return ev?.getData?.() || {};
    }
  }();
}