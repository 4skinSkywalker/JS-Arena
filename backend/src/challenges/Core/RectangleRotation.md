# Code Challenge Description

A rectangle with sides equal to even integers `a` and `b` is drawn on the Cartesian plane. Its center (the intersection point of its diagonals) coincides with the point (0, 0), but the sides of the rectangle are not parallel to the axes; instead, they are forming 45 degree angles with the axes.

Your task is to find out how many points with integer coordinates are located inside of this given rectangle (including on its sides).

## Example

For `a = 6` and `b = 4`, the output should be `solution(a, b) = 23`.

The following picture illustrates the example, and the 23 points are marked green. (Note: The picture is not included in this description).

Here is how the calculation is performed:

```python
def solution(a, b):
    x = math.ceil(a / 2**0.5)
    y = math.ceil(b / 2**0.5)
    
    t = (x * y) + ( (x - 1) * (y - 1) )
    
    return t if t % 2 != 0 else t - 1 
```