# Challenge Description

Little Ratiorg was so tired of being bullied by other bots and mighty CodeFighters that he decided to join the Ninja Bots Training camp. It is known that any bot that manages to solve all the challenges becomes an ultimate master of algorithms, and that is exactly what Ratiorg is aiming at.

His training is now officially over, and Ratiorg is ready to get back to CodeSignal and show who's the boss. To make his appearance more imposing, Ratiorg is planning to take a tank and drive it back home. However, the bot will have to travel through the forest covered in trees so strong that they can hold back even a tank, so not every tank can make it through this forest.

Since Ratiorg finished the trainings as the best student, he can pick any tank he likes. There are a lot of tanks of all possible sizes. All available tanks are square, can only move in one of the four directions (leftwards, rightwards, downwards or upwards), and can't move over the trees.

The Ninja Bots Training camp is located at the top left corner of the forest, and CodeFigts bots camp is located at its bottom right corner. Given the map of the forest, find the maximum size of the tank Ratiorg can take in order to get from the training camp to the CodeFigths bot camp.

## Example

For

```python
forest =  [
    [true, true, true,  true],
    [true, true, false, true],
    [true, true, true,  true],
    [true, true, true,  true]
]
```
the output should be `solution(forest) = 2`.

For

```python
forest = [
    [false, true, true],
    [true,  true, true]
]
```
the output should be `solution(forest) = 0`.

There is a tree right at the entrance of the Training Camp, so there's no way to get out of there by tank.