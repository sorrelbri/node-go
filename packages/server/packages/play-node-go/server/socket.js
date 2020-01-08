module.exports = {
  socket: io => {
    io.on('connection', () => console.log('connected'))
    io.on('connect', ()=> {
    console.log('connected');
    io.emit('connected', {message: 'socket connected'});
    })
    return io;
  }
}