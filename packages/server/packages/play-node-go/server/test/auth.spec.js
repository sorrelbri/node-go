const authSpec = (chai, knex, server) => {
  const newUserFormData = {
    'username':'newUser',
    'password':'password',
    'email':'user@example.com'
  }
  const loginFormData = {
    'username':'newUser',
    'password':'password'
  }

  it('post to sign up should return 200 status', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(200);
      done();
    });
    });
    
  it('post to sign up should return token', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.cookie('token');
      done();
    });
  });
    
  it('post to sign up should add user to db', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      knex('user').where({'username': newUserFormData.username}).then(results => {
        const newUser = results[0];
        if (newUser.username === newUserFormData.username) done();
      })
    });
  })
    
  it('post to sign up should add user to db with password', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      knex('user').where({'username': newUserFormData.username}).then(results => {
        const newUser = results[0];
        if (newUser.password !== newUserFormData.password) done();
      })
    });
  });
    
  it('post to login with non-registered user should return status 401 with bad creds err', done => {
    chai.request(server)
    .post('/auth/login')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(401);
      res.body.err.should.equal('bad credentials');
      done();
    });
  })
  
  it('post to login with non-registered user should return status 401 with bad creds err', done => {
    chai.request(server)
    .post('/auth/login')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(401);
      res.body.err.should.equal('bad credentials');
      done();
    })
  })
  
  it('post to login with registered user should return cookie', done => {
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
module.exports = authSpec;