"use strict";

describe("Pixler", () => {
  let pixler;

  beforeEach(() => {
    pixler = new Pixler();
  });

  it("defaults to a size of 33", () => {
    expect(pixler.size).toBe(33);
  });

  it("has a number of default hex colors", () => {
    expect(pixler.colors).toBeDefined();
  });

  describe("when setting pixels", () => {
    let subscriber;
    let x = 0;
    let y = 0;
    let color = 0;

    beforeEach(() => {
      subscriber = jasmine.createSpy("pixelAdded");
      pixler.subscribe(subscriber);
      pixler.setPixel(x, y, color);
    });

    it("publishes an event", () => {
      expect(subscriber).toHaveBeenCalledWith("PIXEL_SET", { x, y, color });
    });

    it("sets the color of the pixel", () => {
      expect(pixler.getPixel(x, y)).toBe(color);
    });
  });
});
