import { BaseEvent } from "@fermuch/telematree";

export * as storage from "./storage";

export function myID(): string {
  return "id" in platform ? String(platform.id) : String(data.DEVICE_ID) || "";
}

export function currentLogin(): string {
  return (
    env.project?.currentLogin?.maybeCurrent?.key ||
    env.project?.currentLogin?.maybeCurrent?.$modelId ||
    env.currentLogin?.key ||
    env.currentLogin?.$modelId ||
    ""
  );
}

export function emit(ev: BaseEvent) {
  try {
    return messages.emit('onEvent', ev);
  } catch (e) {
    platform.log('Error sending message');
    platform.log(String(e));
    return false;
  }
}