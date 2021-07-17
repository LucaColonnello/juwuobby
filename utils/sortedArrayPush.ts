import sortedLastIndexBy from 'lodash.sortedlastindexby';

export default function sortedArrayPush<Item>(
  list: Array<Item> = [],
  item: Item,
  iterator: (item: Item) => string
) {
  const index = sortedLastIndexBy(list, item, iterator);
  list.splice(index, 0, item);
}
