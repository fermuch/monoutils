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
