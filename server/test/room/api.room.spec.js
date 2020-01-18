const apiRoomSpec = (chai, knex, server) => {
  const roomEndpoint = '/api/v1/rooms';
  const publicRooms = {rooms: [{id: 1, name: 'main', description: 'A general place to play Go', language: 'EN'}]};
  
  it('seeded rooms should be present in db', done => {
    knex('room').where('id', 1).orWhere('id', 2).select('name').then(roomResults => {
      if (roomResults[0].name === 'main' && roomResults[1].name === 'private') done();
    });
  });

  it('request to api rooms should return 200', done => {
    chai.request(server)
    .get(roomEndpoint)
    .end((err,res)=> {
      if(err) done(err);
      res.should.status(200);
      done();
    });
  })

  it('request to api rooms should return all public rooms', done => {
    chai.request(server)
    .get(roomEndpoint)
    .end((err,res)=> {
      if(err) done(err);
      res.body.should.eql(publicRooms);
      done();
    });
  })
}

module.exports = apiRoomSpec;