# Tests
Our tests for functions in PlanIt

**TimeConversion.test.tsx**: Test of the date difference function used as a utility for GroupCard   
&nbsp;&nbsp;&nbsp;&nbsp;**Input**: Two of the exact same Date objects  
&nbsp;&nbsp;&nbsp;&nbsp;**Output**: The day difference between the two dates  
&nbsp;&nbsp;&nbsp;&nbsp;**Outcome**: Test Success: For this specific test, the result should be 0  
&nbsp;&nbsp;&nbsp;&nbsp;**Failure Indicators**: If the number returned by the function is anything other than 0.  
<br> 
**INSERT FILENAME HERE**: Tests the ability of Firebase utility functions to add users  
&nbsp;&nbsp;&nbsp;&nbsp;**Input**: username  
&nbsp;&nbsp;&nbsp;&nbsp;**Output**: Unique userID returned by Firestore  
&nbsp;&nbsp;&nbsp;&nbsp;**Outcome Test Success**: Query Firebase for returned userID  
&nbsp;&nbsp;&nbsp;&nbsp;**Failure Indicators**: userID doesn’t exist  
<br> 
**CalendarFetch.test.tsx**: Tests a Google Calendar API call to retrieve a list of calendars  
&nbsp;&nbsp;&nbsp;&nbsp;**Input**: accessToken of the authenticated user  
&nbsp;&nbsp;&nbsp;&nbsp;**Output**: JSON response from Google Calendar API  
&nbsp;&nbsp;&nbsp;&nbsp;**Outcome Test Success**:  Status Code == 200 and kind of data is “calendar#calendarList”  
&nbsp;&nbsp;&nbsp;&nbsp;**Failure Indicators**: Status code is not 200 or the kind of data is not “calendar#calendarList”  
<br> 
**FirebaseUtils.test.tsx**: Tests the ability of Firebase utility functions to get groups that the user is in  
&nbsp;&nbsp;&nbsp;&nbsp;**Input**: userID: string  
&nbsp;&nbsp;&nbsp;&nbsp;**Output**: array of groups that the user is currently in  
&nbsp;&nbsp;&nbsp;&nbsp;**Outcome Test Success**: Query firebase and return array of group ids  
&nbsp;&nbsp;&nbsp;&nbsp;**Failure Indicators**:  userID doesn’t exist or not in a group  
<br> 
**FirebaseGroupUtils.test.tsx**: Tests the ability of Firebase utility functions to add a user into a group  
&nbsp;&nbsp;&nbsp;&nbsp;**Input**: userID: string, groupID: string  
&nbsp;&nbsp;&nbsp;&nbsp;**Output**: boolean: T or F indicating if the user is added into the group  
&nbsp;&nbsp;&nbsp;&nbsp;**Outcome Test Success**: The group associated with that groupID adds that user as a member  
&nbsp;&nbsp;&nbsp;&nbsp;**Failure Indicators**: user is not added into the group and False is returned  