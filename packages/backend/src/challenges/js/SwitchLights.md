# Challenge Description

N candles are placed in a row, some of them are initially lit. For each candle from the 1st to the Nth the following algorithm is applied: if the observed candle is lit then states of this candle and all candles before it are changed to the opposite. The task is to find out which candles will remain lit after applying the algorithm to all candles in the order they are placed in the line.

## Example

- For a = [1, 1, 1, 1, 1], the output should be solution(a) = [0, 1, 0, 1, 0].
- For a = [0, 0], the output should be solution(a) = [0, 0]. The candles are not initially lit, so their states are not altered by the algorithm.