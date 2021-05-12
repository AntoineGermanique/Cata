var { Shop, Item, updateQualityProperty } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });
  it("should decrease quality by one", function () {
    const gildedRose = new Shop([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  it("should decrease quality by 2", function () {
    const gildedRose = new Shop([new Item("Conjured", 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
  it("should increase quality by one", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("should set to new quality", function () {
    const item = new Item("foo", 1, 13);
    const newItem = updateQualityProperty(item, 14)
    expect(newItem.quality).toEqual(14);
  });

  it("should top to maximum", function () {
    const item = new Item("foo", 1, 50);
    const newItem = updateQualityProperty(item, 52)
    expect(newItem.quality).toEqual(50);
  });
});
