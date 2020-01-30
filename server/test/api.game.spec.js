const apiRoomSpec = (chai, knex, server) => {
  const gameEndpoint = '/api/v1/games';

  const gameOne = {
    id: 1,
    room: 1,
    application: 'node-go',
    application_version: '0.1.0',
    board_size: 19,
    komi: 6.5,
    handicap: 0,
    open: false,
    win_type: null,
    player_black: 'user-one',
    player_black_rank: 'UR',
    player_white: 'user-two',
    player_white_rank: 'UR',
    captures_black: null,
    captures_white: null,
    score: null,
    description: null,
    event: null,
    round: null,
    name: null,
    main_time: 'untimed',
    time_period: 1,
    period_length: 0,
    overtime: 'untimed',
    overtime_period: 0,
    overtime_length: 0
  }

  const recordOne = [
    // {}
  ]

  it('request to api games/1 should return 1 room game information with moves', done => {
    chai.request(server)
    .get(`${gameEndpoint}/1`)
    .end((err,res)=> {
      if(err) done(err);
      res.body.should.eql({ game: gameOne, record: recordOne });
      done();
    });
  })
}

module.exports = apiRoomSpec;