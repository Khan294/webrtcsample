//https://socket.io/get-started/chat/

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//========================================================
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
//========================================================
app.get('/', (req, res) => {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/user.html');
});

var userlist= [] //{ip: "", socket: ""}

io.on('connection', (socket) => {
  //console.log(`${socket.id} has joined.`);

  var user= {
    ip: socket.handshake.address,
    id: socket.id,
    offer: null,
    status: "free" //free, awaiting, busy
  }
  userlist.push(user)

  socket.on('disconnect', () => {
    //console.log(`${socket.id} has left.`);
    userlist= userlist.filter(function(e) { return e.id!=socket.id })
  });

  socket.on('rtc', (msg) => {
    if(msg.type == "match") {

      var me= userlist.find(function(e) { return e.id==socket.id })
      if (me.busy) {
        return
      }

      var availableUser= userlist.filter((e)=> {
        return !e.offer && e.id != me.id
      });

      if(availableUser.length>0) {
        var newPeer= availableUser[getRndInteger(0, availableUser.length -1)];  
      }
      

      me.connect= socket.id
      newPeer.connect= socket.id 

      newPeer.
    }
    
    

  	//console.log(`${socket.id}: ${msg}`);
  	//socket.broadcast.emit('chat_message', msg);
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});