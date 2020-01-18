process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../data/db');

const server = require('../server');

const should = chai.should();

const authSignupSpec = require('./auth.signup.spec');
const authLoginSpec = require('./auth.login.spec');
const apiIndexSpec = require('./api.index.spec');
const apiRoomSpec = require('./room/api.room.spec');

chai.use(chaiHttp);
// ! to run tests from other testing modules
// import someTest from './endpoint/someTest';

const setupDb = () => {
  beforeEach(done => {
    knex.migrate.rollback(true)
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()
      .then(() => done())
    );
  });
  afterEach(done => {
    knex.migrate.rollback(true)
    .then(() => done());
  })
}

describe('Auth Routes', function() {
  setupDb();
  
  authSignupSpec(chai, knex, server);
  authLoginSpec(chai, knex, server);
});

describe('API Routes', function() {
  setupDb();
  
  apiIndexSpec(chai, knex, server)
  apiRoomSpec(chai, knex, server)
  
});
