describe("Pixler", () => {
    let pixler;

    beforeEach(() => {
        pixler = new Pixler();
    });

    it("defaults to a size of 33", () => {
        expect(pixler.size).toBe(33);
    });

    it("cannot has its size changed", () => {
        expect(function() { pixler.size = 32; }).toThrowError();
    });
});