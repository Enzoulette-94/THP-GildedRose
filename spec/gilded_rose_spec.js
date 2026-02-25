const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  // Règle 1 : la qualité d'un article normal diminue de 1 par jour
  it("should decrease quality by 1 for normal items", function () {
    const shop = new Shop([
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Normal Sword", 3, 15),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(19);
    expect(items[1].quality).toBe(6);
    expect(items[2].quality).toBe(14);
  });

  // Règle 2 : une fois la date de péremption passée, la qualité se dégrade 2x plus vite
  it("should decrease quality by 2 for normal items past sell date", function () {
    const shop = new Shop([
      new Item("Normal Sword", 0, 10),
      new Item("Elixir of the Mongoose", -1, 8),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(8);
    expect(items[1].quality).toBe(6);
  });

  // Règle 3 : la qualité ne peut jamais être négative
  it("should never have negative quality", function () {
    const shop = new Shop([
      new Item("Normal Sword", 5, 0),
      new Item("Elixir of the Mongoose", 0, 0),
      new Item("Old Item", -3, 1),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
    expect(items[2].quality).toBe(0);
  });

  // Règle 4 : Aged Brie augmente sa qualité avec le temps
  it("should increase quality for Aged Brie", function () {
    const shop = new Shop([
      new Item("Aged Brie", 5, 10),
      new Item("Aged Brie", 2, 40),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(11);
    expect(items[1].quality).toBe(41);
  });

  // Règle 5 : la qualité ne peut jamais dépasser 50
  it("should never exceed quality of 50", function () {
    const shop = new Shop([
      new Item("Aged Brie", 5, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    expect(items[2].quality).toBe(50);
  });

  // Règle 6 : Sulfuras ne change jamais (qualité et sellIn)
  it("should not change quality or sellIn for Sulfuras", function () {
    const shop = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
    expect(items[1].quality).toBe(80);
    expect(items[1].sellIn).toBe(-1);
    expect(items[2].quality).toBe(80);
    expect(items[2].sellIn).toBe(10);
  });

  // Règle 7 : Backstage passes augmente de 2 quand il reste 10 jours ou moins
  it("should increase quality by 2 for Backstage passes with 10 days or less", function () {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 30),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 15),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(22);
    expect(items[1].quality).toBe(32);
    expect(items[2].quality).toBe(17);
  });

  // Règle 8 : Backstage passes augmente de 3 quand il reste 5 jours ou moins
  it("should increase quality by 3 for Backstage passes with 5 days or less", function () {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 30),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(23);
    expect(items[1].quality).toBe(33);
    expect(items[2].quality).toBe(13);
  });

  // Règle 9 : la qualité des Backstage passes tombe à 0 après le concert
  it("should set Backstage passes quality to 0 after the concert", function () {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[1].quality).toBe(0);
  });

  // Règle 10 : les éléments Conjured se dégradent deux fois plus vite
  it("should decrease quality by 2 for Conjured items", function () {
    const shop = new Shop([
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Dark Blade", 5, 10),
      new Item("Conjured Magic Stick", 1, 4),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(4);
    expect(items[1].quality).toBe(8);
    expect(items[2].quality).toBe(2);
  });

  // Règle bonus : les éléments Conjured se dégradent 4x plus vite après la date de péremption
  it("should decrease quality by 4 for Conjured items past sell date", function () {
    const shop = new Shop([
      new Item("Conjured Mana Cake", 0, 10),
      new Item("Conjured Dark Blade", -1, 8),
    ]);
    const items = shop.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[1].quality).toBe(4);
  });

});
