# Node Go
A browser application to play Go in real time.

## Development Demo
[The project in it's current state](https://play-node-go.herokuapp.com/)  
[Client only prototype](https://sorrelbri.github.io/browser-go-proto/)

## Setup
### Local Repo
```sh
$ git clone https://github.com/sorrelbri/node-go.git
```

### Install Deps
```sh
$ npm run bootstrap
```  
Runs lerna `bootstrap` command installing dependencies for project, development and package dependencies

### Initialize Database
#### Download PostgreSQL 
To verify PostgreSQL installation:  
```sh
$ psql -V
```
Node Go API was built with version 11.4.
[See documentation for Postgres download.](https://www.postgresql.org/download/)

#### Create Databases
```sh
$ psql
# psql(11.4)
```
```sql
CREATE DATABASE node-go;
CREATE DATABASE node-go-test; # testing database
```

### Configure Environment
```sh
$ touch packages/server/.env
```

```
# .env
NODE_ENV=development
PORT=# set development port for API
REACT_ADDRESS=http://localhost:3000 # default
PG_CONNECTION_STRING=postgresql://localhost:5432/node-go
PG_CONNECTION_STRING_TEST=postgresql://localhost:5432/node-go-test
JWT_SECRET=# generate a secret key for JWT signing algorithm
TEST_SECRET=# same as above, for test environment
SALT_ROUNDS=# set number of salt rounds for bcrypt hashing function
DOMAIN=localhost
USER_ONE_PASSWORD=# credentials for testing with 
USER_ONE_EMAIL=# same as above
```

### Smoke test
```sh
$ lerna run test
```

### Run Database Migrations
```sh
$ cd packages/server; npm run migrate; npm run seed
```

### Running in development
```sh
$ cd packages/server
$ npm start # or if you have nodemon
$ nodemon
```
```sh
$ cd packages/play-node-go
$ npm start
```

## Known Bugs
- server side move validation not complete, full game logic not implemented
- no authorization for game moves
- websocket connections may remain open, pooling prevents runaway leaks, but tests may hang

## Roadmap 4/20
1. Game logic module
2. Game in progress caching
3. Auth for games
4. Game request creation

## Features
- [ ] Realtime communications
- [ ] Multiple game settings
- [ ] Customizable board size


## Built with
- [Express](https://expressjs.com)
- [React](https://reactjs.org)
- [PostgreSQL](https://postgresql.org)
- [Socket.io](https://socket.io)
- [Sass](https://sass-lang.com)
### Management & Deployment
- Lerna
- CircleCI