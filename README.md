# Sport-App

This app is a sports application with three types of users: admin, coach, and athlete(manager is excluded). 
It allows coaches and admins to create different types of sessions and athletes to join them. 
The backend of the app was implemented using ExpressJS and the frontend was implemented using Vite. 
The app uses MongoDB as its database.

## Features

- An admin can create and manage sessions, as well as manage coaches and athletes.
- Coaches can create and manage sessions (competitions, training plans, nutrition plans, events).
- Athlete users can view existing sessions and join them if they meet the requirements, such as minimum age or skill level. 
They can also message coaches whose sessions they join, view their progress, view their session history, upcoming events, messaging, profile, and settings.
- Users can register and log in to access the app's features (using JSON Web Tokens (JWT)).

## Technologies Used

- Vite
- ExpressJS
- MongoDB
- Mongoose
- JWT
- Typescript


## API Endpoints

### Admin

- /api/admin: Admin endpoints

### Coach

- /api/coach: Coach endpoints

### Athlete

- POST /api/auth/registerAthlete
- POST /api/auth/login - Authenticate a athlete and receive a token
- GET /api/auth/currentAthlete - Get the current athlete

### Sessions

- POST /api/sessions/createSession - Create a new session
- GET /api/sessions/:id - Get a specific session by ID
- PUT /api/sessions/:id - Update a specific session by ID
- DELETE /api/sessions/:id - Delete a specific session by ID
- GET /api/sessions - Get all sessions

### Messages (I didn't construct this feature)

- POST /api/messages
- GET /api/messages
- GET /api/messages/:id

# Conclusion

While the app does not implement all the features of a fully functional sports app, 
it has provided me with valuable experience in creating RESTful APIs, 
implementing user authentication, and creating user-friendly UIs. 
This project has helped me develop my skills and knowledge in web development, and I will continue to build on this foundation in my future projects.























