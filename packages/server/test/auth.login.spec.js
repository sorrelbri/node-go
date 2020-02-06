const authSignupSpec = (chai, knex, server) => {
  const newUserFormData = {
    'username':'newUser',
    'password':'password',
    'confirmPassword':'password',
    'email':'user@example.com'
  }
  const loginFormData = {
    'username':'newUser',
    'password':'password'
  }

    
  it('post to /login with non-registered user should return status 401 with bad creds err', done => {
    chai.request(server)
    .post('/auth/login')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(401);
      res.body.errors.should.equal('bad credentials');
      done();
    });
  })
  
  it('post to /login with non-registered user should return status 401 with bad creds err', done => {
    chai.request(server)
    .post('/auth/login')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(401);
      res.body.errors.should.equal('bad credentials');
      done();
    })
  })
  
  it('post to /login with registered user should return cookie', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);

      chai.request(server)
      .post('/auth/login')
      .type('form')
      .send(loginFormData)
      .end((err, res) => {
        if(err) done(err);
        res.should.status(200);
        res.should.cookie('token');
        done();
      })
    })
  })



}
module.exports = authSignupSpec;