## Challenge:

Your task is to draw a special fractal after n iterations. The fractal consists of unit connectors '|' and '_'.

For n = 1 the fractal looks as follows:
```
 _
_|
```
Now assume that you have already made N iterations and drawn the f(N) fractal. To draw the f(N + 1) fractal do the following:

Note that every fractal has exactly two edge points which can be connected to the edge points of other fractals using the unit connectors. At first, take the f(N) fractal and place it in the top left corner. As the next step, put f(N) rotated by 0°, 90°, 180° or 270° in the remaining 3 quarters - top right, bottom left and bottom right - so that it is possible to connect all four of them by adding exactly 3 unit connectors between the adjacent fractal edge points.
Note that there is always exactly one possible combination of rotations which allows to connect all 4 f(N) fractals together.

### Example

- For n = 1, the output should be
```py
solution(n) = [[' ', '_', ' '],       
               [' ', '_', '|']]
```
In other words, it should represent      
```
 _
_|
``` 

- For n = 2, the output should be
```py
solution(n) = [[' ', '_', ' ', ' ', ' ', '_', ' '],      
               [' ', '_', '|', ' ', '|', '_', ' '],                                  
               ['|', ' ', ' ', '_', ' ', ' ', '|'],                                 
               ['|', '_', '|', ' ', '|', '_', '|']]
```
Or, to put it differently:  
```
 _   _
 _| |_ 
|  _  |
|_| |_|
``` 

- For n = 3, the output should be
```py
solution(n) = [[" ", "_", " ", " ", " ", "_", "_", "_", " ", " ", " ", "_", "_", "_", " "], 
               [" ", "_", "|", " ", "|", "_", " ", " ", "|", "_", "|", " ", " ", "_", "|"], 
               ["|", " ", " ", "_", " ", " ", "|", " ", " ", "_", " ", " ", "|", "_", " "], 
               ["|", "_", "|", " ", "|", "_", "|", " ", "|", " ", "|", "_", "_", "_", "|"], 
               [" ", "_", " ", " ", " ", "_", " ", " ", "|", " ", " ", "_", "_", "_", " "], 
               ["|", " ", "|", "_", "|", " ", "|", " ", "|", "_", "|", " ", " ", "_", "|"], 
               ["|", "_", " ", " ", " ", "_", "|", " ", " ", "_", " ", " ", "|", "_", " "], 
               [" ", "_", "|", " ", "|", "_", "_", "_", "|", " ", "|", "_", "_", "_", "|"]]
```

The fractal looks as follows:
```
          _   ___   ___ 
          _| |_  |_|  _|
         |  _  |  _  |_ 
         |_| |_| | |___|
          _   _  |  ___ 
         | |_| | |_|  _|
         |_   _|  _  |_ 
          _| |___| |___|
```