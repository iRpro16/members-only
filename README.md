# Messages App

This project is part of The Odin Project curriculum. It involves creating a profile and logging in to post messages for users to see. Regular members can't see who posted what, but if you enter a secret password, you can gain access to the user behind the message.

## Features
* Log-in user authentication using passportjs.
* Create a profile.
* Typing in a secret password to get exclusive membership or to become an admin.

## Installaion
To run this project locally, follow these steps:
1. Clone the repository
```
git clone [https://github.com/iRpro16/members-only.git]
```

2. Navigate to the project directory:
```
cd members-only
```

3. Install dependencies:
```
npm install
```

4. Start the development server:
```
npm start
```

## Usage
1. Open the application in your browser on PORT=8000.
2. Create an account and login to become a member.
3. Post a message and view all messages when logged in.

## Learning outcomes
* Account creation: Using EJS to create a form and using the body parameters to insert into a table by querying.
* Log-in feature: Using passportjs to authenticate a user with a username and password (local strategy).
* Membership-based privileges: Entering secret password to gain certain privileges not accessible by basic members.

## Challenges and solutions:
### Modularity
Challenge: Making code more modular with express and passport.
Solution: Putting the passport config in a "config.js" file and then exporting it as a function with the "passport" argument.

### Express session
Challenge: Understanding express-session.
Solution: Reading lots of documentation and watching videos.

## Future Improvements
* More advanced authentication (e.g. OAuth).
* Filter the messages (e.g. latest, username, etc).

## Conclusion
This project was a great learning experience, enhancing my skills in express, express-session and passportjs.

## Acknowledgments
Thanks to The Odin Project for providing comprehensive resources and project ideas.
