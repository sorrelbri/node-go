process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../server');

const should = chai.should();


chai.use(chaiHttp);
// ! to run tests from other testing modules
// import someTest from './endpoint/someTest';

describe('API Routes', function() {
  // ! should be a function that returns tests to be run
  // someTest(chai)
});


