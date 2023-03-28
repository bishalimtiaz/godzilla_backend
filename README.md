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

docker-compose --env-file .dev.env config

NODE_ENV=dev docker-compose --env-file .dev.env up --build 

npm install -g sequelize-cli

sequelize db:migrate --name=20230312134445-create-user_role-table.js 

equelize db:migrate

sequelize db:seed:all --env development
sequelize db:seed:all


sequelize db:seed --seed 20220309093621-roles-seeder.js

npx sequelize-cli migration:generate --name <migration-name>



Mysql Setup

Docker containers run in an isolated network environment, so they cannot directly access the host machine's network using localhost or 127.0.0.1.

`ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}'`


CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

SELECT User FROM mysql.user;

DROP USER 'username'@'localhost';


