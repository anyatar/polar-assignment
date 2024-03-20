# Rest API with MySQL 

| Methods	| Urls	          | Actions
| --------- | ----------------| ----------------------------------------- |
| POST      | /signup         | Signs the user up to the application
| PUT       | /update         | Updates the users total running distance
| GET       | /mystats        | Returns the users' ranking


## Project Structure
```bash
├── README.md
├── package-lock.json
├── package.json
+---src
|   |   index.ts
|   |
|   +---controllers
|   |       home.controller.ts
|   |       run.controller.ts
|   |
|   +---db
|   |       index.ts
|   |
|   +---helpers
|   |       cryptoHelper.ts
|   |
|   +---interfaces
|   +---middlewares
|   |       splitRequest.validation.ts
|   |
|   +---models
|   |       person.model.ts
|   |
|   +---repositories
|   |       run.repository.ts
|   |
|   +---routes
|   |       index.ts
|   |       run.routes.ts
|   |
|   \---services
|           run.service.ts
|
\---test
        app.unit.test.ts
└── tsconfig.json
```

## Project setup
```
npm install
```

### Run
```
npm run start
```
