# Rest API with MySQL 

| Methods	| Urls	                | Actions
| --------- | --------------------- | ---------------------- |
| POST      | api/v1/signup         | Signs the user up to the application
| PUT       | api/v1/update         | Updates the users total running distance
| GET       | api/v1/mystats        | Returns the users' ranking


## Project Structure
```bash
├── README.md
├── package-lock.json
├── package.json
├── server.ts
├── src
│   ├── controllers
│   │   ├── employee.controller.ts
│   │   ├── home.controller.ts
│   │   └── tutorial.controller.ts
│   ├── db
│   │   └── index.ts
│   ├── index.ts
│   ├── interfaces
│   │   └── crud-repository.interface.ts
│   ├── middlewares
│   │   └── auth.validation.ts
│   ├── models
│   │   ├── employee.model.ts
│   │   └── tutorial.model.ts
│   ├── repositories
│   │   ├── employee.repository.ts
│   │   └── tutorial.repository.ts
│   ├── routes
│   │   ├── employee.router.ts
│   │   ├── home.routes.ts
│   │   ├── index.ts
│   │   └── tutorial.routes.ts
│   └── services
│       ├── employee.service.ts
│       └── tutorial.service.ts
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

## More Practice
