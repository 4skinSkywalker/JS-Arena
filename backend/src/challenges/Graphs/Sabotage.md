**Challenge Description:**

Little Ratiorg is about to be locked up in one of multiple rooms in a rectangular hangar. The rooms are securely locked: it is possible to leave a room only in one direction specific to this room. However, the villains have messed the system up, so now there is no way to finish the challenge from certain rooms. The challenge will be over if Ratiorg successfully leaves the hangar (i.e. leaves the rectangle that represents it).

Your task is to calculate the number of rooms, starting from which Ratiorg won't be able to finish the challenge. Implement a function that will return this number.

Example:

For
```python
hangar = [['U', 'L'],
          ['R', 'L']]
```
the output should be
```python
solution(hangar) = 2.
```
Ratiorg won't be able to get out of the hangar if he starts from either of the bottom rooms.