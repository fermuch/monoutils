import { emit } from "../tools";
import { BaseEvent } from "./event";

export class LockEvent extends BaseEvent {
  kind = "lock-request";

  constructor(public readonly lock: boolean) {
    super();
  }

  getData() {
    return {
      lock: this.lock,
    };
  }
}

// Request the device to be locked.
// An event is dispatched and a handler can be attached to it,
// to separate the logic of the lock system in use (monoflow, teltonika, ...).
export function lock(): boolean {
  return emit(new LockEvent(true));
}

// Request the device to unlock.
// An event is dispatched and a handler can be attached to it,
// to separate the logic of the lock system in use (monoflow, teltonika, ...).
export function unlock(): boolean {
  return emit(new LockEvent(false));
}
