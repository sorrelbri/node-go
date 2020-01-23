const apiRoomSpec = (chai, knex, server) => {
  const roomEndpoint = '/api/v1/rooms';
  const publicRooms = {rooms: [{id: 1, name: 'main', description: 'A general place to play Go', language: 'EN'}]};
  const roomOne = {
    currentRoom: {
      id: 1,
      name: 'main',
      description: 'A general place to play Go',
      language: 'EN'
    },
    roomGames: [ {
      id: 1,
      komi: 6.5,
      handicap: 0,
      board_size: 19,
      player_black: 'anon',
      player_white: 'anon',
      player_black_rank: 'K3',
      player_white_rank: 'K2'
    } ],
    messages: [ {
      content: 'Hey! Welcome to the general room!',
      username: 'user-one',
      admin: true
    } ]
  }
  
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

  it('request to api room/1 should return 1 room record with game and message information', done => {
    chai.request(server)
    .get(`${roomEndpoint}/1`)
    .end((err,res)=> {
      if(err) done(err);
      res.body.should.eql(roomOne);
      done();
    });
  })
}

module.exports = apiRoomSpec;