## Description
You are a pretty busy billionaire who often flies a private jet to remote places. On New Year's Eve, you have to fly halfway around the world. 

Your course lies west of your current location and crosses several time zones. You take off at a certain time `takeOffTime`, and at `minutes[i]` minutes after takeoff, you cross the `ith` border between time zones. After crossing each border, you set your wristwatch one hour earlier. 

Given the opportunity, you want to celebrate the New Year each time your wrist watch shows 00:00. The mission is to find out how many times will you be able to celebrate this New Year's Day with a bottle of champagne?

## Example

For `takeOffTime = "23:35"` and `minutes = [60, 90, 140]`,
the output should be `solution(takeOffTime, minutes) = 3`.

Here is the list of events by the time zones:

**initial time zone:**
- at 23:35 your flight starts;
- at 00:00 you celebrate New Year for the first time;
- at 00:35 (60 minutes after the take off) you cross the first border;

**time zone -1:**
- at 23:35 you cross the border (00:35 by your initial time zone);
- at 00:00 you celebrate New Year for the second time (01:00 by your initial time zone);
- at 00:05 (90 minutes after the take off) you cross the second border;

**time zone -2:**
- at 23:05 you cross the border;
- at 23:55 (140 minutes after the take off) you cross another border;

**time zone -3:**
- at 22:55 you cross the border;
- at 00:00 you celebrate New Year for the third time.

Thus, the output should be 3. That's a lot of champagne!