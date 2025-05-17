**Challenge Description**

When visualizing market data over a long period of time, it is often helpful to build an Open-high-low-close (OHLC) chart. However, to build an OHLC chart you first need to prepare some data. 

For each financial instrument consider each day when it was traded, and find the following prices the instrument had that day:

- open price: the price of the first trade of the day;
- high price: the highest trade of the day;
- low price: the lowest trade of the day;
- close price: the price of the last trade of the day.

Given a stream of trade data ordered by time, write a program to compute the OHLC by day and instrument. If two trades happen to have equal timestamps, then their order is determined by the order of their timestamps in the timestamp array.

**Input**

- Array of integers, timestamp[i] stands for the Unix time when the ith trade was made. (1 ≤ timestamp.length ≤ 50, 666 ≤ timestamp[i] < 2 · 109)

- Array of strings, instrument[i] is the ticker symbol for the financial instrument taking part in the ith trade. (instrument.length = timestamp.length, 1 ≤ instrument[i].length ≤ 4)

- Array of strings, side[i] equals either "buy" or "sell" depending on whether instrument[i] was bought or sold during the ith trade. (side.length = timestamp.length)

- Array of float, price[i] is the price of the instrument[i] during the ith trade. It is guaranteed that price[i] has no more than two digits after the decimal point. (price.length = timestamp.length, 0.5 ≤ price[i] ≤ 100.5)

- Array of integers, size[i] equals the number of shares of the instrument[i] traded during the ith trade. (size.length = timestamp.length, 1 ≤ size[i] ≤ 5 · 105)

**Output**

Returns an array of strings with the following format:

- output[i][0]: local server date in the YYYY-MM-DD format
- output[i][1]: a ticker symbol for some instrument
- output[i][2]: a string corresponding to the open price
- output[i][3]: a string corresponding to the high price
- output[i][4]: a string corresponding to the low price
- output[i][5]: a string corresponding to the close price

Each string corresponding to the price should contain exactly two digits after the decimal point and at least one digit before.

For each unique pair of a date and an instrument present in the inputs, such that there was a trade of that instrument on that day, there should be exactly one row in the output.

Output rows should be ordered by dates. Rows corresponding to the same date should be ordered in lexicographical order for ticker symbols.