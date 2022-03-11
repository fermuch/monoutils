import * as MonoUtils from '../index';
import { BaseEvent } from '../well_known/event';

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

  it("calls messages.emit", () => {
    global.emitEventGlobally = jest.fn();

    class TestEvent {
      kind = 'test-event';
      getData() {
        return {}
      }
    }
    const ev = new TestEvent();

    MonoUtils.emit(ev);
    expect(global.emitEventGlobally).toHaveBeenCalled();
    expect(global.emitEventGlobally).toHaveBeenCalledWith(ev);
  })
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
    const config = new MonoUtils.config.Config();
    const settings = config.store;
    expect(settings).toBeTruthy();
  })

  it("returns config.get(path, defaultValue)", () => {
    const config = new MonoUtils.config.Config();
    const val = config.get("isTest", false);
    expect(val).toBe(true);
  })

  it("returns config.set(path, value) for deep path", () => {
    const config = new MonoUtils.config.Config();
    const val = config.get(["foo", "bar", "zaz"], "test");
    expect(val).toBe("zaz");
  })
})

describe("well known", () => {
  it("emits an event on lock()", () => {
    global.emitEventGlobally = jest.fn();
    MonoUtils.wk.lock.lock();
    expect(global.emitEventGlobally).toHaveBeenCalled();
  });

  it("emits an event on unlock()", () => {
    global.emitEventGlobally = jest.fn();
    MonoUtils.wk.lock.unlock();
    expect(global.emitEventGlobally).toHaveBeenCalled();
  });

  it("replaces LOCK_STATE_KEY when locked/unlocked", () => {
    MonoUtils.wk.lock.unlock();
    // eslint-disable-next-line no-undef
    expect(env.data[MonoUtils.wk.lock.LOCK_STATE_KEY]).toBe(false);
    expect(MonoUtils.wk.lock.getLockState()).toBe(false);

    MonoUtils.wk.lock.lock();
    // eslint-disable-next-line no-undef
    expect(env.data[MonoUtils.wk.lock.LOCK_STATE_KEY]).toBe(true);
    expect(MonoUtils.wk.lock.getLockState()).toBe(true);
  })

  it("generates a BaseEvent when using generateEvent()", () => {
    const event = MonoUtils.wk.event.generateEvent();
    expect(event).toBeInstanceOf(BaseEvent);
  });

  it("transforms any payload into a BaseEvent with regenerateEvent()", () => {
    const payload = {
      kind: "test-event",
      getData() {
        return {
          foo: "bar"
        }
      },
      createdAt: 42,
    };
    const event = MonoUtils.wk.event.regenerateEvent(payload);
    expect(event).toBeInstanceOf(BaseEvent);
    expect(event.kind).toBe("test-event");
    expect(event.getData()).toEqual({
      foo: "bar"
    });
    expect(event.createdAt).toBe(42);
  });

  it("subscribes to an specific event when using subscribe()", () => {
    const spy = jest.fn();
    MonoUtils.wk.event.subscribe("test-event", spy);

    const ev = MonoUtils.wk.event.generateEvent('test-event', {});
    const ret = MonoUtils.emit(ev);
    expect(ret).toBe(true);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(ev);
  });
});