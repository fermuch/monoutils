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
  if (typeof emitEventGlobally === "function") {
    try {
      emitEventGlobally(ev);
      return true;
    } catch (e) {
      platform.log("Error sending event");
      platform.log(e);
      // try with messages instead of returning here
    }
  }

  try {
    return messages.emit("onEvent", ev);
  } catch (e) {
    platform.log("Error sending message");
    platform.log(String(e));
  }

  return false;
}
