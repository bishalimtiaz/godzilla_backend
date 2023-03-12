# godzilla_backend
Backend of Godzilla


create migration:
npx sequelize-cli migration:generate --name create-user_role-table



```
├── app
│   ├── api
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   ├── routes
│   │   │   ├── authRouter.js
│   │   └── validators
│   ├── config
│   │   ├── config.js
│   │   ├── database.js
│   ├── data-access
│   │   ├── entities
│   │   │   ├── role.js
│   │   │   └── user.js
|   |   |   └──userRole.js
│   │   ├── migrations
│   │   │   ├── 20230312133150-create-users-table.js
│   │   │   └── 20230312134300-create-role-table.js
|   |   |   └── 20230312134445-create-user_role-table.js
│   │   ├── seeders
│   │   │   ├── 20230312154832-create-role.js
│   │   │   ├── 20230312155138-create-super-admin.js
│   │   └── index.js
│   ├── domain
│   │   ├── exceptions
│   │   ├── models
│   │   │   ├── role.js
│   │   │   ├── user.js
│   │   │   └── userRole.js
│   │   └── services
│   │       ├──
|   |   
│   └── index.js
│   └── .dev.env
│   └── .dockeringnore
│   └── .gitingnore
│   └── .prod.env
│   └── .stag.env
│   └── docker-compose.yml
│   └── Dockerfile
│   └── package.json

```