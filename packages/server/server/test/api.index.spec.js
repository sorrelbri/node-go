const apiIndexSpec = (chai, knex, server) => {
  const newUserFormData = {
    'username':'newUser',
    'password':'password',
    'confirmPassword':'password',
    'email':'user@example.com'
  }
    
  it('home should return 200 status', done => {
    chai.request(server)
    .get('/api/v1')
    .end((err,res)=> {
      if(err) done(err);
      res.should.status(200);
      done();
    });
  });

  it('home should return user object if req contains verified JWT', done => {
    const agent = chai.request.agent(server);
    agent
    .post('/auth/signup')
    .type('form')
    .send(newUserFormData)
    .end((err, res) => {
      if (err) done(err);
      agent
      .get('/api/v1')
      .end((err,res)=> {
        if(err) done(err);
        res.should.have.property('body').property('username').equal('newUser');
        res.should.have.property('body').property('email').equal('user@example.com');
        res.should.status(200);
        done();
      });
    });
  })

}

module.exports = apiIndexSpec;