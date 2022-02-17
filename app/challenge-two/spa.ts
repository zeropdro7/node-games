export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum SpecialItemNames {
  SULFURAS = 'Sulfuras, Hand of Ragnaros!!!',
  AGED_BRIE = 'Aged Brie',
  BACK_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
  CONJURED_ITEM = 'Conjured Item!',
}

export class Validations {
  /**
   * Validate that quality is a natural number under 50.
   * @param {number} quality Natural number.
   * @returns Array of updated Items.
   */
  validateQuality = (quality: number) => {
    if (quality > 50 || quality < 0) {
      throw new Error(`Quality must be a natural number less than 50.`);
    }
  };
}

const validations = new Validations();

export class Sulfuras extends Item {
  constructor() {
    super(SpecialItemNames.SULFURAS, 999999999999999, 80);
  }
}

export class AgedBrie extends Item {
  constructor(quality: number) {
    super(SpecialItemNames.AGED_BRIE, 9999, quality);

    validations.validateQuality(quality);
  }
}

export class BackPasses extends Item {
  constructor(sellIn: number, quality: number) {
    super(SpecialItemNames.BACK_PASSES, sellIn, quality);

    validations.validateQuality(quality);
  }
}

export class ConjuredItem extends Item {
  constructor(sellIn: number, quality: number) {
    super(SpecialItemNames.CONJURED_ITEM, sellIn, quality);

    validations.validateQuality(quality);
  }
}

export class CommonItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);

    validations.validateQuality(quality);
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  /**
   * Update sellIn days and quality of an Item passing 1 day.
   * @returns Array of updated Items.
   */
  updateQuality = () => {
    this.items.forEach(element => {
      element.sellIn = element.sellIn - 1;

      switch (element.name) {
        case SpecialItemNames.SULFURAS:
          console.log('Sulfuras is a Legendary Item!!');
          break;

        case SpecialItemNames.AGED_BRIE:
          if (element.quality < 50) {
            element.quality = element.quality + 1;
          }
          break;

        case SpecialItemNames.BACK_PASSES:
          if (element.quality < 50) {
            if (element.sellIn > 10) {
              element.quality = element.quality + 1;
              return;
            }
            if (element.sellIn > 5) {
              element.quality = element.quality + 2;
              return;
            }
            if (element.sellIn >= 0) {
              element.quality = element.quality + 3;
              return;
            }
            if (element.sellIn < 0) {
              element.quality = 0;
              return;
            }
          }
          break;

        case SpecialItemNames.CONJURED_ITEM:
          if (element.quality < 50 && element.quality > 0) {
            if (element.sellIn > 0) {
              element.quality = element.quality - 2;
            } else {
              element.quality = element.quality - 4;
            }
          }

          break;

        default:
          if (element.quality < 50 && element.quality > 0) {
            if (element.sellIn > 0) {
              element.quality = element.quality - 1;
            } else {
              element.quality = element.quality - 2;
            }
          }
          break;
      }
    });

    return this.items;
  };
}

const sulfuras = new Sulfuras();
let agedBrie = new AgedBrie(10);
let backPasses = new BackPasses(11, 25);
let conjuredOrb = new ConjuredItem(90, 30);
let goblinKnife = new CommonItem('Goblin Knife', 60, 20);

let items = [sulfuras, agedBrie, backPasses, conjuredOrb, goblinKnife];

let gildedRose = new GildedRose(items);
console.log(gildedRose);

gildedRose.updateQuality();
console.log(gildedRose);
