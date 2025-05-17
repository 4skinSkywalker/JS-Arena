## Problem Description

You usually celebrate your birthday at your favorite café, which is quite popular and usually very crowded. On a certain birthday celebration, you found the café almost empty and you enjoyed having the café all to yourself. Now, you are curious about when would that happen again. Given your current birthday date, your task is to determine the number of years until it will fall on the same day of the week.

For your convenience, here is the list of months lengths (from January to December, respectively):

```
Months lengths: 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31.
```

Please, note that in leap years February has 29 days. If your birthday is on the 29th of February, you celebrate it once in four years. Otherwise you birthday is celebrated each year.

### Example

For `birthdayDate = "02-01-2016"`, the output should be
`solution(birthdayDate) = 5`.

Here, February 1 in 2016 is a Monday. The next year in which this same date will be Monday too is 2021. 2021 - 2016 = 5, which is the answer.