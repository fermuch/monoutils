import TypedEmitter from "typed-emitter";
import {
  KnowPlatformTools as KnownPlatformTools,
  DataProperty,
  DynamicData,
  FN_PROPS,
  FNArgs,
  EventArgs,
} from "@fermuch/telematree/dist/tree/dynamic_data";
import { BaseEvent } from "@fermuch/telematree/dist/events/base_event";
import { ScriptWithInstance } from "@fermuch/telematree/dist/tree/dynamic_data/script_with_instance";
import telematree from "@fermuch/telematree/dist/library";

// ** UUID **
type V4Options = RandomOptions | RngOptions;
type v4String = (options?: V4Options) => string;
type v4Buffer = <T extends OutputBuffer>(
  options: V4Options | null | undefined,
  buffer: T,
  offset?: number
) => T;
type v4 = v4Buffer & v4String;

interface ScriptGlobal {
  platform: KnownPlatformTools;
  telematree: telematree;
  data: DataProperty;
  env: DynamicData["env"];
  messages: TypedEmitter<EventArgs>;
  uuid: v4;
  when: FNArgs;
}

// ** Globals **
declare global {
  const global: ScriptGlobal;

  const platform: KnownPlatformTools;
  const telematree: telematree;
  const data: DataProperty;
  const env: DynamicData["env"];
  const messages: TypedEmitter<EventArgs>;
  const emitEventGlobally: (event: BaseEvent) => void;
  const uuid: v4;
  const when: FNArgs;

  const script: ScriptWithInstance | undefined;
  const settings: undefined | (() => unknown);
  const getSettings: undefined | (() => unknown);
}

interface globalThis extends ScriptGlobal {}
