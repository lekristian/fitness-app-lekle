# Fitness app - assignment

### Requirements

- node.js ^16.0.0
- postgres ^16
- favourite IDE
- git

### How to start

- fork or download this repository
- install dependencies with `npm i`
- create fitness_app database (application access `postgresql://localhost:5432/fitness_app`, make sure you use correct port and db name )
- copy `.env-example` to `.env` and fill in your DB credentials (host, port, name, user, password)
- create db schema and populate db with `npm run seed`
- run express server with `npm start`

### How to create a new migration and populate data

- Generate a migration file: `npm run migrations <name>` (e.g. `npm run migrations create-programs`)
- Edit the generated file in `src/db/migrations/` to define `up`/`down` changes.
- Apply migrations to the local DB: `npm run migrate`
- Populate sample data (current demo seed): `npm run seed`

### How submit assignment

- create public bitbucket or github repository
- commit and push changes continuously
- use proper commit messages
- share your solution with us (link or read permissions for miroslava.filcakova@goodrequest.com)

## Task 1 : Done

Create authorization layer to enable users to access private API (next Task)

- create new db model User(name:string , surname: string, nickName:string, email: string, age: number, role:[ADMIN/USER])
- add authorization layer
- user can register using email, password and role (for purpose of this assignment, user can choose his role in registration)
- user can log in with email and password
- use proper way how to store user data
- you can use any authorization approach or npm module (preferred is JWT strategy and passport)

---

## Task 2: Done

Create private API for user with role [ADMIN]

ADMIN can:

- create, update or delete exercises
- edit exercises in program (add or remove)
- get all users and all its data
- get user detail
- update any user (name, surname, nickName, age, nickName, role)

## Task 3: not finished

---

Create private API for user with role [USER]

USER can:

- get all users (id, nickName)
- get own profile data (name, surname, age, nickName)
- track exercises he has completed (he can track same exercise multiple times, we want to save datetime of completion and duration in seconds)
- see list of completed exercises (with datetime and duration) in profile
- remove tracked exercise from completed exercises list

USER cannot:

- access ADMIN API
- get or update another user profile

---

## Bonus task 1 - pagination, filter, search: not started

Add pagination to exercise list using query => `/exercises?page=1&limit=10` return 1 page of exercises in maximal length of 10.

Add filter by program => `/exercises?programID=1` return only exercises of program with id = 1

add fultext search on exercise name => `/exercises?search=cis` => return only exercises which name consist of string `cis`

---

## Bonus task 2 - validation: done

Create validation service to check request body, query and params to make sure user sends valid request. For example, in registration, user must send valid email, otherwise return status code 400.
Also you can use validation on query in bonus task 1.

---

## Bonus task 3 - localization: not started

Create localization service to send message attribute in API responses in correct language. Default language is EN, optional is SK. User can send all requests with HTTP header `language: 'sk'` or `language: 'en'` to receive required language localization.

example of response for request with `language: 'sk'`

```javascript
{
  data: {
    id: 1;
  }
  message: "Program bol úspešne vytvorený";
}
```

---

## Bonus task 4 - error handling: done

Create proper way how to handle all errors in application. Use console.error display error in terminal, user can never see stack trace or real error message. You can write error logs to file.

response status code >= 500

```javascript
{
  data: {
  }
  message: "Something went wrong";
}
```

# TODOS:

## Missing:

- Task 3, USER role protected routes, I have prepared role.middleware where we can easily choose which routes USER role can use
- Task 3, get own profile, I can easily read user data from token and select rest of the data from DB
- Task 3, we have to introduce new table which will record exercises done by user {UserId, ExerciseId, duration, datetime} where records can be duplicated
- Task 3, we can select those exercises from table mentioned above

- expiresAt can be implemented
- if there will be more roles we can migrate roles to the separate table, also support for multi-role role->roles
- add swagger
- find way to keep validations schemas and CRUD dtos in sync
