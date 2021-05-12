class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  static maxQualityValue = 50;
  static minQualityValue = 0;
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                // console.log("Am I useless ?");
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
  updateQualityV2() {
    this.items = updateSellInPure(this.items);
    this.items = updateQualityPure(this.items)
    return this.items;
  }
}
const updateSellInPure = (items) =>
  items.map(item => isItemSulfuras(item)
    ? item
    : ({ ...item, ...{ sellIn: --item.sellIn } }))

const updateQualityPure = (items) =>
  items.map(item => {
    if (isItemQualityOutOfBounds(item)) {
      return item
    }
    if (isItemAgedBrie(item)) {
      return updateAgedBrie(item)
    }
    if (isItemBackstage(item)) {
      return updateBackStage(item)
    }
    if (isItemSulfuras(item)) {
      return item;
    }
    if (isItemConjured(item)) {
      return updateItemConjured(item);
    }
    return updateDefaultItem(item)
  })

const isItemQualityOutOfBounds = (item) => !(item.quality >= Shop.minQualityValue && item.quality <= Shop.maxQualityValue);
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
  if (quality > Shop.maxQualityValue) {
    newQuality = Shop.maxQualityValue
  }
  if (quality < Shop.minQualityValue) {
    newQuality = Shop.minQualityValue;
  }
  return ({ ...item, ...{ quality: newQuality } })
};

module.exports = {
  Item,
  Shop
}
