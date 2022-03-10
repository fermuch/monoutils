// const global: ScriptGlobal;

(global as any).platform = {
  log(...args: any[]) {
    console.log(...args);
  }
};

// const telematree: telematree;

(global as any).data = {
  DEVICE_ID: 'TEST',
};
// const env: DynamicData['env'];
// const messages: TypedEmitter<EventArgs>;
// const uuid: v4;
// const when: FNArgs;

(global as any).script = undefined;
(global as any).settings = () => ({});
(global as any).getSettings = () => ({});