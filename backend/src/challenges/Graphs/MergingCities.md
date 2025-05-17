# Challenge Description

Once upon a time, in a kingdom far, far away, there lived a King Byteasar VIII. The king went down in history as a great warrior, since he managed to defeat a longtime enemy that had been capturing the kingdom's cities for more than a century. When the war was over, most of the cities were almost completely destroyed, so Byteasar decided to create new cities by merging them.

The king decided to merge each pair of cities `cityi`, `cityi+1` for `i = 0, 2, 4, ...` if they were connected by one of the two-way roads running through the kingdom.

Initially, all information about the roads was stored in the `roadRegister`. Your task is to return the `roadRegister` after the merging is performed, assuming that after merging the cities re-indexation is done in such way that any city formed from cities `a` and `b` (where `a < b`) receives index `a`, and all the cities with numbers `i` (where `i > b`) get numbers `i - 1`.

### Example

For

```python
roadRegister = [
  [false, true,  true,  false, false, false, true ],
  [true,  false, true,  false, true,  false, false],
  [true,  true,  false, true,  false, false, true ],
  [false, false, true,  false, false, true,  true ],
  [false, true,  false, false, false, false, false],
  [false, false, false, true,  false, false, false],
  [true,  false, true,  true,  false, false, false]
]
```

the output should be

```python
solution(roadRegister) = [
  [false, true,  true,  false, true ],
  [true,  false, false, true,  true ],
  [true,  false, false, false, false],
  [false, true,  false, false, false],
  [true,  true,  false, false, false]
]
```

Here's how the cities were merged: