```markdown
# Description

Given an array of integers, sort its elements by the difference of their largest and smallest digits. In the case of a tie, that with the larger index in the array should come first.

## Example

For a = [152, 23, 7, 887, 243], the output should be
solution(a) = [7, 887, 23, 243, 152].

Here are the differences of all the numbers:

- 152: difference = 5 - 1 = 4;
- 23: difference = 3 - 2 = 1;
- 7: difference = 7 - 7 = 0;
- 887: difference = 8 - 7 = 1;
- 243: difference = 4 - 2 = 2.

23 and 887 have the same difference, but 887 goes after 23 in a, so in the sorted array it comes first.
```