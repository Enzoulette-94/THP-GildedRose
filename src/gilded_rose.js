class Item {
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
    for (const item of this.items) {
      this.#updateItem(item);
    }
    return this.items;
  }

  #updateItem(item) {
    if (item.name === 'Sulfuras, Hand of Ragnaros') return;

    item.sellIn -= 1;
    const expired = item.sellIn < 0;

    if (item.name === 'Aged Brie') {
      this.#increaseQuality(item, expired ? 2 : 1);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      if (expired) {
        item.quality = 0;
      } else if (item.sellIn < 5) {
        this.#increaseQuality(item, 3);
      } else if (item.sellIn < 10) {
        this.#increaseQuality(item, 2);
      } else {
        this.#increaseQuality(item, 1);
      }
    } else if (item.name.startsWith('Conjured')) {
      this.#decreaseQuality(item, expired ? 4 : 2);
    } else {
      this.#decreaseQuality(item, expired ? 2 : 1);
    }
  }

  #increaseQuality(item, amount) {
    item.quality = Math.min(50, item.quality + amount);
  }

  #decreaseQuality(item, amount) {
    item.quality = Math.max(0, item.quality - amount);
  }
}

module.exports = { Item, Shop };
