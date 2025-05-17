# Description

In this task, you are given a king who comes up with a reform to rename all his kingdom's cities in such a way that the ith city would have the name of the city number (i + 1)th. The last city would get the name of the very first city. The cartographers need to update the register which stored information about all the roads between the cities before the reform. You have to determine the state of this updated register.

## Example

For

```plaintext
roadRegister = [[false, true,  true,  false],
                [true,  false, true,  false],
                [true,  true,  false, true ],
                [false, false, true,  false]]
```

The output should be

```plaintext
solution(roadRegister) = [[false, false, false, true ],
                          [false, false, true,  true ],
                          [false, true,  false, true ],
                          [true,  true,  true,  false]]
```

Here's how the catalog can be represented before and after the Great Renaming.