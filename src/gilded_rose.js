class Item {
  static maxQualityValue = 50;
  static minQualityValue = 0;
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = updateSellInPure(this.items);
    this.items = updateQualityPure(this.items);
    return this.items;
  }
}
const updateSellInPure = (items) =>
  items.map(item => isItemSulfuras(item)
    ? item
    : ({ ...item, ...{ sellIn: --item.sellIn } }));

const updateQualityPure = (items) =>
  items.map(item => {
    if (isItemQualityOutOfBounds(item)) {
      return item;
    }
    if (isItemAgedBrie(item)) {
      return updateAgedBrie(item);
    }
    if (isItemBackstage(item)) {
      return updateBackStage(item);
    }
    if (isItemSulfuras(item)) {
      return item;
    }
    if (isItemConjured(item)) {
      return updateItemConjured(item);
    }
    return updateDefaultItem(item);
  })

const isItemQualityOutOfBounds = (item) => !(item.quality >= Item.minQualityValue && item.quality <= Item.maxQualityValue);
const isItemAgedBrie = (item) => item.name === 'Aged Brie';
const updateAgedBrie = (item) => updateQualityProperty(item, ++item.quality);
const isItemBackstage = (item) => item.name === 'Backstage passes to a TAFKAL80ETC concert';
const updateBackStage = (item) => {
  if (item.sellIn > 10) {
    return updateQualityProperty(item, ++item.quality);
  }
  if (item.sellIn > 5) {
    return updateQualityProperty(item, item.quality + 2);
  }
  if (item.sellIn > 0) {
    return updateQualityProperty(item, item.quality + 3);
  }
  return updateQualityProperty(item, 0);
}
const isItemSulfuras = (item) => item.name === 'Sulfuras, Hand of Ragnaros';
const isItemConjured = (item) => item.name.includes('Conjured');
const updateItemConjured = (item) => updateQualityProperty(item, item.quality - 2);
const updateDefaultItem = (item) => item.sellIn > 0
  ? updateQualityProperty(item, item.quality - 1)
  : updateQualityProperty(item, item.quality - 2);

const updateQualityProperty = (item, quality) => {
  let newQuality = quality;
  if (quality > Item.maxQualityValue) {
    newQuality = Item.maxQualityValue;
  }
  if (quality < Item.minQualityValue) {
    newQuality = Item.minQualityValue;
  }
  return ({ ...item, ...{ quality: newQuality } })
};

module.exports = {
  Item,
  Shop,
  updateQualityProperty
}
