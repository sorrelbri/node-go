const authSpec = (chai, knex, server) => {
  const newUserFormData = {
    'username':'newUser',
    'password':'password',
    'email':'user@example.com'
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
  })


}
module.exports = authSpec;