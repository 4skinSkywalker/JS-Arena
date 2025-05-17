# Title: Electric Field Challenge

## Description:

Little Ratiorg was tired of being bullied by other bots and mighty CodeFighters, so he joined the Ninja Bots Training camp. Any bot that manages to solve all the challenges becomes an ultimate master of algorithms, and that is exactly what Ratiorg wants.

It's been several weeks, and Ratiorg already feels how much stronger he has become. However, Ratiorg is about to face his first really exciting challenge: the Electric Field. It works like this: the bot stays in the top left corner of a rectangular grid. In one move he can walk to one of the nearest cells (directly above, below, to the left or to the right of his current position). Ratiorg's goal is to get to the bottom right corner in the least possible number of moves. However, it's not as simple as it seems: there are electric wires running through the grid. If Ratiorg steps on a wire, his microchips will be burnt to a crisp, so Ratiorg, prudent bot that he is, wants to do his best to avoid them.

You want to give Ratiorg a hint by telling him the least possible number of moves required to get to the destination. Given the grid and the wires, return the minimum number of moves required to get to the bottom right corner from the top left corner. If it's not possible to get there, return -1 instead.

## Example:

For grid = [4, 8] and:

wires = [[1, 0, 1, 3], [3, 1, 3, 2], [4, 1, 4, 3], [4, 2, 4, 4],[1, 3, 3, 3], [2, 1, 7, 1], [2, 2, 7, 2], [5, 3, 8, 3]] 

the output should be solution(grid, wires) = 26.

Check out the image below for better understanding. The wires are colored red, and the path Ratiorg should take is colored green.

## Note

The image was mentioned in the example but not included in the text provided. Please refer to the original problem statement for the actual image.