const verifyToken = require('../services/verifyToken');

const authSignupSpec = (chai, knex, server) => {
  const newUserFormData = {
    'username':'newUser',
    'password':'password',
    'confirmPassword':'password',
    'email':'user@example.com'
  }
  const invalidEmailFormData = {
    'username':'newUser',
    'email': 'useremail',
    'password':'password',
    'confirmPassword':'password'
  }
  const scriptInjectionFormData = {
    'username': '<script> alert("hello, there");</script>',
    'password':'password',
    'confirmPassword':'password',
    'email':'user@example.com'
  }
  const sqlInjectionFormData = {
    'username': '; DROP TABLE user;',
    'password':'password',
    'confirmPassword':'password',
    'email':'user@example.com'
  }

  it('post to /signup should return 201 status', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(201);
      done();
    });
  });
    
  it('post to /signup should return token', done => {
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
    
  it('post to /signup should add user to db', done => {
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
    
  // it('post to /signup should add user to db with password', done => {
  //   chai.request(server)
  //   .post('/auth/signup')
  //   .type('form')
  //   .send(newUserFormData)
  //   .end((err, res) => {
  //     if (err) done(err);
  //     knex('user').where({'username': newUserFormData.username}).then(results => {
  //       const newUser = results[0];
  //       if (newUser.password !== newUserFormData.password) done();
  //     })
  //   });
  // });

  it('post to /signup with invalid email should return 422', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(invalidEmailFormData)
    .end((err, res) => {
      if (err) done(err);
      res.should.status(422);
      done();
    });
  })
  
  it('post to /signup should return cookie with jwt for user', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      const cookie = res.headers['set-cookie'][0];
      const token = cookie.split(';')[0].split('token=')[1]
      const verifiedToken = verifyToken(token);
      const userAssertion = verifiedToken.should.have.property('user');
      userAssertion.with.property('username');
      userAssertion.with.property('email');
      userAssertion.not.with.property('password');
      done()
    })
  })
  
  it('post to /signup should sanitize inputs for script injection', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(scriptInjectionFormData)
    .end((err, res) => {
      if (err) done(err);
      const cookie = res.headers['set-cookie'][0];
      const token = cookie.split(';')[0].split('token=')[1]
      const verifiedToken = verifyToken(token);
      verifiedToken.should.have.property('user')
      .with.property('username')
      .to.not.equal('<script> alert("hello, there");</script>')
      done()
    })
  })

  // it('post to /signup should sanitize inputs for sql injection', done => {
  //   chai.request(server)
  //   .post('/auth/signup')
  //   .type('form')
  //   .send(sqlInjectionFormData)
  //   .end((err, res) => {
  //     if (err) done(err);
  //     knex('user')
  //     .where('id', 1)
  //     .select('id','username','email')
  //     .then(results => {
  //       const newUser = results[0];
  //       if (newUser) done();
  //     })
  //   })
  // })

  it('post to /signup with already registered user should return 409 error', done => {
    chai.request(server)
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);

      chai.request(server)
      .post('/auth/signup')
      .type('form')
      .send(newUserFormData)
      .end((err, res) => {
        if(err) done(err);
        res.should.status(409);
        done();
      })
    })
  })

}
module.exports = authSignupSpec;