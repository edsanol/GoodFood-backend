import { checkJWT } from '../utils/jwt';

class Socket {
  io: any
  constructor(io: any) {
    this.io = io;
    this.socketEvent();
  }

  socketEvent(): void {
    this.io.on('connection', async (socket: any) => {
      console.log('Client connected');

      const [check, id] = checkJWT(socket.handshake.query['x-token']);
      if (!check) {
        console.log('client not valid');
        return socket.disconnect();
      }

      socket.join(id);

      socket.on('successOrder', (data: any) => {
        console.log(data.to)
        this.io.to(data.to).emit('sendNotification');
      })

      socket.on('disconnect', () => {
        console.log('client disconnected', id);
      });
    });
  }
}

export default Socket;
