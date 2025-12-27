## Problem Statement

To make sure that groceries can always be delivered, Instacart tries to equally distribute delivery requests throughout the day by including an additional delivery fee during busy periods.

Each day is divided into several intervals that do not overlap and cover the whole day from 00:00 to 23:59. For each `i` the delivery fee in the `intervals[i]` equals `fees[i]`.

Given the list of delivery requests `deliveries`, your task is to check whether the delivery fee is directly correlated to the order volume in each interval i.e. the `interval_fee / interval_deliveries` value is constant for each interval throughout the day.

### Example

For

- intervals = [0, 10, 22]
- fees = [1, 3, 1]
- deliveries = 
  [
    [8, 15],
    [12, 21],
    [15, 48],
    [20, 17],
    [23, 43]
  ]
  
the output should be `solution(intervals, fees, deliveries) = true`.

The day is divided into 3 intervals:

1. from 00:00 to 09:59, the first delivery was made, `fees[0] / 1 = 1`;
2. from 10:00 to 21:59, the 2nd, 3rd and 4th deliveries were made, `fees[1] / 3 = 1`;
3. from 22:00 to 23:59, the last delivery was made, `fees[2] / 1 = 1`.

`interval_fee / interval_deliveries = 1` for each interval, so the answer is true.

### Input/Output


- **[execution time limit] 1 second**

- **[input] array.integer intervals**

  Each interval starts at `xx:00` and ends at `yy:59`, where `xx` equals `intervals[i]` and `yy` equals `intervals[i + 1] - 1`, or `23` if `intervals[i + 1]` doesn't exist. `intervals[i]` represents the hour at which the `i-th` interval starts. It is guaranteed that `intervals[0] = 0`.

  Guaranteed constraints:

  - 1 ≤ `intervals.length` ≤ 24,
  - 0 ≤ `intervals[i]` ≤ 23,
  - `intervals[0]` = 0.

- **[input] array.integer fees**

  Array of non-negative integers of the same length as `intervals`. `fees[i]` is the delivery fee in the `i-th` interval.

  Guaranteed constraints:

  - `fees.length = intervals.length`,
  - 0 ≤ `fees[i]` ≤ 105.

- **[input] array.array.integer deliveries**

  Deliveries in the order they were made. Each delivery is represented as the `[h, m]` array, `h` is the hour and `m` is the minute it was done. It is guaranteed that there were no deliveries at the same time.

  Guaranteed constraints:

  - 1 ≤ `deliveries.length` ≤ 30,
  - 0 ≤ `deliveries[i][0]` ≤ 23,
  - 0 ≤ `deliveries[i][1]` ≤ 59.

- **[output] boolean**

  `true` if the delivery fee is directly correlated to the order volume in each interval, `false` otherwise.