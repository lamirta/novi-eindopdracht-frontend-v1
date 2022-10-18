# Graduation Project

## Introduction
This repository contains the frontend code for the application 'Flash Word', which was created by me from scratch as a graduation project. As this application is part of a full stack software development education, it requires running the backend code to get it functional. The backend project can be found here: https://github.com/lamirta/novi-eindopdracht-backend-v3. This application uses a database, running with PostgreSQL. 

The frontend is created in React, using JavaScript. 

## Instructions
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes and safe them.\
You may also see any lint errors in the console.

_Note_: because this project runs on localhost:3000 it is important to start this project before starting/running another project. React will then automatically ask to run that project on a different port.

## REST-endpoint documentation
These are the endpoints that are available in the backend code. The backend code is running on http://localhost:8080 , so make sure to check if this. Copy+Paste the reuqest path to access the endpoint. 

### Authentication
#### POST `/authenticate`
Endpoint for user login. UserDetail authentication is used. The body is a JSON object with String username and String password. After correct verification, a JWT token is returned (token is valid for 24 hours).

```javascript
{
  username: "TestDocent",
  password: "password"
}
```

#### GET `/authenticated`
Endpoint to check if user is logged in. Returns a JSON object containing information about user, such as username, password (encrypted) and authorities/roles.

### User

### UserProfile

### Image

### WordList
#### GET `/wordlists`
Endpoint for retrieving all word lists from the database.

#### GET `/wordlists/{title}`
Endpoint for requesting a specific 'word list' from the database, based on the unique id, in this case the title.

#### POST `/wordlists/`
Endpoint for creating a new word list. This endpoint expects a body (in JSON format) with the necessary information to create a new word list object - that is, all required fields are filled in correctly.

```javascript
{
  title: "vormen",
  words: [
            "vierkant",
            "driehoek",
            "circle"
          ]
}
```

#### DELETE `/wordlists/{title}`
Endpoint for removing a specific word list from the database, based on its unique identifier, in this case the title.
*wordlists cannot be deleted if 'exams' have been created with them.

#### PUT `/wordlists/{title}`
Endpoint for modifying a specific 'word list' from the database, based on the unique id, in this case the title. This should be included as a parameter in the uri. Furthermore, a body is provided (in JSON format) with the necessary information to update the object - that is, all required fields are correctly filled in / modified.

```javascript
{
  title: "vormen",
  words: [
            "vierkant",
            "driehoek",
            "rechthoek", 
            "ovaal",
            "circle"
          ]
}
```

### Exam





## Design
Before writing the code, I've created usecases, wireframes, UML's, and screen designs in Figma. 

`Figma Designs`: https://www.figma.com/community/file/1135210535350283979



