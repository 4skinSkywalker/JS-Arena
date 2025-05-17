# Task

You are writing a spreadsheet application for an ancient operating system. The system runs on a computer so old that it can only display ASCII graphics. Currently you are stuck with implementing the cells joining algorithm.

You are given a table in ASCII graphics, where the following characters are used for borders: `+`, `-`, `|`. The rows can have different heights and the columns can have different widths. Each cell has an area greater than 1 (excluding the borders) and can contain any ASCII characters excluding `+`, `-` and `|`.

The algorithm you want to implement should merge the cells within a given rectangular part of the table into a single cell by removing the borders between them (i.e. replace them with space characters (`' '`) and replace redundant `+`s with correct border symbols). The cells to join are represented by the coordinates of the cells at the extreme bottom-left and top-right of the area.

## Example
For
```
table = ["+----+--+-----+----+",
         "|abcd|56|!@#$%|qwer|",
         "|1234|78|^&=()|tyui|",
         "+----+--+-----+----+",
         "|zxcv|90|77777|stop|",
         "+----+--+-----+----+",
         "|asdf|~~|ghjkl|100$|",
         "+----+--+-----+----+"]
```
and
```
coords = [[2, 0], [1, 1]]
```
the output should be
```
solution(table, coords) = ["+----+--+-----+----+",
                           "|abcd|56|!@#$%|qwer|",
                           "|1234|78|^&=()|tyui|",
                           "+----+--+-----+----+",
                           "|zxcv 90|77777|stop|",
                           "|       +-----+----+",
                           "|asdf ~~|ghjkl|100$|",
                           "+-------+-----+----+"]
```