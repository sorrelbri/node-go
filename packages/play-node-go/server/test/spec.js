process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
var knex = require('../data/db');

const server = require('../server');

const should = chai.should();

const authSpec = require('./auth.spec');

chai.use(chaiHttp);
// ! to run tests from other testing modules
// import someTest from './endpoint/someTest';

const setupDb = () => {
  beforeEach(done => {
    knex.migrate.rollback(true)
    .then(() => knex.migrate.latest())
    .then(() => done());
  });
  afterEach(done => {
    knex.migrate.rollback(true)
    .then(() => done());
  })
}

describe('Auth Routes', function() {
  setupDb();
  
  authSpec(chai, knex, server)

})

describe('API Routes', function() {
  setupDb();

  it('home should return 200 status', done => {
    chai.request(server)
      .get('/')
      .end((err,res)=> {
        if(err) done(err);
        res.should.status(200);
        done();
      })
  })
});


