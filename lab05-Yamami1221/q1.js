function buyItem(hero, shop) {
  if (hero.gold >= shop.price) {
    hero.gold -= shop.price;
    hero.items.push(shop.item);
    return hero;
  } else {
    return hero;
  }
}

//Test cases
const hero1 = {
  items: ["sword", "potion"],
  gold: 50,
};

const shop1 = {
  item: "armor",
  price: 20,
};

const hero2 = {
  items: ["sword", "potion"],
  gold: 50,
};

const shop2 = {
  item: "legendary armor",
  price: 200,
};

console.log(buyItem(hero1, shop1));
console.log(buyItem(hero2, shop2));

module.exports = buyItem;
