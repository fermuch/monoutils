import { emit } from "../tools";
import { BaseEvent } from "./event";

/**
 * Used in `env.data` to write/read current lock state.
 */
export const LOCK_STATE_KEY = "LOCK_STATE" as const;

/**
 * Event sent when using lock()/unlock()
 */
export class LockEvent extends BaseEvent {
  public readonly kind = "lock-request" as const;

  constructor(public readonly lock: boolean) {
    super();
  }

  getData() {
    return {
      lock: this.lock,
    };
  }
}

/**
 * Request the device to be locked.
 * An event is dispatched and a handler can be attached to it,
 * to separate the logic of the lock system in use (monoflow, teltonika, ...).
 *
 * @returns true if the message was sent, false otherwise.
 */
export function lock(): boolean {
  env.setData(LOCK_STATE_KEY, true);
  return emit(new LockEvent(true));
}

/**
 * Request the device to unlock.
 * An event is dispatched and a handler can be attached to it,
 * to separate the logic of the lock system in use (monoflow, teltonika, ...).
 *
 * @returns true if the message was sent, false otherwise.
 */
export function unlock(): boolean {
  env.setData(LOCK_STATE_KEY, false);
  return emit(new LockEvent(false));
}

/**
 * Get current lock state. This is shared across all instances.
 * @returns true if the device is locked, false otherwise.
 */
export function getLockState(): boolean {
  return Boolean(env.data?.[LOCK_STATE_KEY] || false);
}
