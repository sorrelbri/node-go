const authSpec = (chai, server) => {
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
}
module.exports = authSpec;