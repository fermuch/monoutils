
// setup global environment
beforeEach(() => {
  const _mockStorage = new Map<string, string | number | boolean>();

  // const global: ScriptGlobal;

  (global as any).platform = {
    log(...args: any[]) {
      console.log(...args);
    },
    // phone-only
    set(key: string, val: string | number | boolean) {
      _mockStorage.set(key, val);
    },
    delete(key: string) {
      _mockStorage.delete(key);
    },
    getString(key: string) {
      return _mockStorage.get(key) as string;
    },
    getBoolean(key: string) {
      return _mockStorage.get(key) as boolean;
    },
    getNumber(key: string) {
      return _mockStorage.get(key) as number;
    }
  };

  // const telematree: telematree;

  (global as any).data = {
    DEVICE_ID: 'TEST',
  };

  // const env: DynamicData['env'];
  (global as any).env = {}; // TODO!

  // const messages: TypedEmitter<EventArgs>;
  // const uuid: v4;
  // const when: FNArgs;

  (global as any).script = undefined;
  (global as any).settings = () => ({});
  (global as any).getSettings = () => ({});
})