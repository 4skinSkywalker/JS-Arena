function solution({items}) {

  function swap(firstIndex, secondIndex) {
    let temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
  }

  let length = items.length;

  for (let i = 0; i < length; i++) {
    let j = 0;
    let stop = length - i;
    while (j < stop - 1) {
      if (items[j] > items[j + 1]) {
        swap(j, j + 1);
      }
      j += 1;
    }
  }
  return items;
}

module.exports = solution;