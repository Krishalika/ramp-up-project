import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(4001) //--> to make use of socket.io
//   implements OnGatewayConnection, OnGatewayDisconnect
export class NotificationGateway {
  @WebSocketServer() server;

  wsClients = [];
  //   users: number = 0;

  /* async handleConnection() {
    //a client has connected
    this.users++;

    //notify connected clients of current users
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    //a client has disconnected
    this.users--;

    //notify connected clients of current users
    this.server.emit('users', this.users);
  }
  */

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (let c of this.wsClients) {
      c.send(event, broadCastMessage);
    }
  }

  @SubscribeMessage('notification')
  onChgEvent(client: any, payload: any) {
    this.broadcast('notification', payload);
  }

  //listen the incoming messages
  @SubscribeMessage('notification')
  async onChat(client, message) {
    //broadcast -> to receive data for all subscribed clients
    client.broadcast.emit('notification', message);
  }
}
