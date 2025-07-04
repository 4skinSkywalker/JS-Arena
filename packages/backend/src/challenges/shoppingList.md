# Problem Description

As part of an Instacart beta testing group, Sara is trying out a brand new feature that automatically estimates the combined cost of the items in her handwritten shopping list. Her list contains both items and their prices. All Sara has to do is snap a photo of her list with the Instacart app, and she gets a quick estimate of what everything will cost.

Sara asked for your help, so it is up to you to devise an algorithm that calculates the cost after the image is converted into plain text. All you need to do is extract all numbers from the given string items and sum them up.

## Examples

- For items = "Doughnuts, 4; doughnuts holes, 0.08; glue, 3.4", the output should be solution(items) = 7.48;
- For items = "blue suit for 24$, cape for 12.99$ & glasses for 15.70", the output should be solution(items) = 52.69.

## Input/Output

- [execution time limit] 1 second

- [input] string items

  A shopping list given as a string. It is guaranteed that the only numbers in it are dollar prices for different items.
  Note that although each price is given in dollars, you do not know their exact form. Each of them can either be an integer, or a decimal number with one or two decimal places and it may or may not be followed by a dollar sign.
  However, you may assume that if there is a period ('.') between two digits, then it's a decimal mark.

  Guaranteed constraints: 0 ≤ items.length ≤ 6 · 104.

- [output] float

  The total cost of all items.