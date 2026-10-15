## Challenge Description

Given a list of integers `l` and an integer `k`, the challenge is to remove all elements from list `l` that have a value equal to `k`.

### Examples:
- For `l = {"value":3, "next":{"value":1, "next":{"value":2, "next":{"value":3, "next":{"value":4, "next":{"value":5, "next":null}}}}}}` and `k = 3`, the output should be `solution(l, k) = {"value": 1, "next": {"value": 2, "next": {"value": 4, "next": {"value": 5, "next": null}}}}`;
- For `l = {"value":1, "next":{"value":1, "next":{"value":1, "next":{"value":1, "next":{"value":1, "next":{"value":1, "next":null}}}}}}` and `k = 1`, the output should be `solution(l, k) = null`.