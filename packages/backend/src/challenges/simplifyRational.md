# Simplifying Rational Numbers

A rational number is the ratio of two integers, where the denominator is not zero. We are going to represent the rational number numerator / denominator as the ordered pair (numerator, denominator).

There are many different tuples representing the same rational number. For instance, one-half is (1, 2), (2, 4), (3, 6), etc. Your task is to write a function that returns a simplified format of any given rational number.

**Arguments**
- `numerator`: An integer representing the numerator of a rational number.
- `denominator`: An integer representing the denominator of a rational number.

**Returns**  
An array `[a, b]` of two integers where:
- `(a, b)` represents the same rational number as `(numerator, denominator)` but in simplified format;
- `a` and `b` have no non-trivial factors;
- `b` is positive.

**Examples**

```
solution(3, 6)  # returns [1, 2]
```

The number 3 / 6 can be reduced to 1 / 2.

```
solution(8, 5)  # returns [8, 5]
```

There is no way to simplify 8 / 5 any further, as the only factor that 8 and 5 have in common is 1.

```
solution(8, -5)  # returns [-8, 5]
```

One of the requirements is that the denominator should be positive, so 8 / (-5) didn't fit our format, but -8 / 5 does.