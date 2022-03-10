import * as MonoUtils from '../index';

describe("tools", () => {
  it('returns an string for myID()', () => {
    expect(MonoUtils.myID()).toBe("TEST");
  });
  
  it("returns empty string when not logged in", () => {
    const result = MonoUtils.currentLogin()
    expect(result).toBe("");
  });

  xit("returns key when user logged in", () => {
    const result = MonoUtils.currentLogin()
    expect(result).toBe("1234");
  });
})

describe("storage", () => {
  it('calls platform.set(key, val) with set(key, val)', () => {
    const spy = jest.spyOn(global.platform, 'set');
    MonoUtils.storage.set("key", "val");
    expect(spy).toHaveBeenCalledWith("key", "val");
  })

  it('calls platform.delete(key) with del(key)', () => {
    const spy = jest.spyOn(global.platform, 'delete');
    MonoUtils.storage.del("key");
    expect(spy).toHaveBeenCalledWith("key");
  })

  it('calls platform.getString(key) with getString(key)', () => {
    const spy = jest.spyOn(global.platform, 'getString');
    MonoUtils.storage.getString("key");
    expect(spy).toHaveBeenCalledWith("key");
  })

  it('calls platform.getBoolean(key) with getBoolean(key)', () => {
    const spy = jest.spyOn(global.platform, 'getBoolean');
    MonoUtils.storage.getBoolean("key");
    expect(spy).toHaveBeenCalledWith("key");
  })

  it('calls platform.getNumber(key) with getNumber(key)', () => {
    const spy = jest.spyOn(global.platform, 'getNumber');
    MonoUtils.storage.getNumber("key");
    expect(spy).toHaveBeenCalledWith("key");
  })

  it('correctly returns string', () => {
    MonoUtils.storage.set("key", "val");
    expect(MonoUtils.storage.getString("key")).toBe("val");

    MonoUtils.storage.set("key", 123);
    expect(MonoUtils.storage.getString("key")).toBe("123");
  })

  it('correctly returns boolean', () => {
    MonoUtils.storage.set("key", true);
    expect(MonoUtils.storage.getBoolean("key")).toBe(true);

    MonoUtils.storage.set("key", "asd");
    expect(MonoUtils.storage.getBoolean("key")).toBe(true);

    MonoUtils.storage.set("key", "");
    expect(MonoUtils.storage.getBoolean("key")).toBe(false);
  })

  it('correctly returns number', () => {
    MonoUtils.storage.set("key", 123);
    expect(MonoUtils.storage.getNumber("key")).toBe(123);

    MonoUtils.storage.set("key", "456");
    expect(MonoUtils.storage.getNumber("key")).toBe(456);

    MonoUtils.storage.set("key", "asdfg");
    expect(MonoUtils.storage.getNumber("key")).toBe(NaN);
  })
})

// TODO!
xdescribe("collections", () => {
  it("returns frota collection", () => {
    const col = MonoUtils.collections.getFrotaDoc();
    expect(col).toBeTruthy();
  })
})

describe("config", () => {
  it("returns config", () => {
    const settings = MonoUtils.config.getConfig();
    expect(settings).toBeTruthy();
  })

  it("returns config.get(path, defaultValue)", () => {
    const val = MonoUtils.config.get("isTest", false);
    expect(val).toBe(true);
  })

  it("returns config.set(path, value) for deep path", () => {
    const val = MonoUtils.config.get(["foo", "bar", "zaz"], "test");
    expect(val).toBe("zaz");
  })
})