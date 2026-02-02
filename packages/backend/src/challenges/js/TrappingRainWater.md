## Task
Given a list of n non-negative integers that represent an elevation map (where the width of each bar is 1), compute the visual representation of the map. In this representation, use " " for empty space, "#" for walls, and "w" for water.

### Example 1:
Input: `{ height: [0,1,0,2,1,0,1,3,2,1,2,1] }`
Output:
```
       #    
   #www##w# 
 #w##w######
```

**Explanation**: The elevation map is represented by the input array [0,1,0,2,1,0,1,3,2,1,2,1]. The walls (indicated by the # symbols) form structures that can trap rainwater. In this example, 6 units of water (represented by w) can be captured between the walls.

### Example 2:
Input: `{ height: [4,2,0,3,2,5] }`
Output:
```
     #
#wwww#
#ww#w#
##w###
##w###
```

**Explanation**: For the elevation map [4,2,0,3,2,5], the walls create cavities that trap rainwater. The output visually demonstrates how water is trapped between and within the structures.