# Permissions

This is a flexible and easily extendable permissions pattern. Dummy data is provided (data.js) for an example route of projects that are assigned to users using userId as a "foreign key".

The requests are expecting to have a JSON item representing the user. The presence of a userId lets the authUser middleware know that there's a user "logged in" and will terminate any requests if they aren't found. This makes for an easily repeatable first step.
