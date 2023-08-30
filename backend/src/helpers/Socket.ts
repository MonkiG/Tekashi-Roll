import { type Socket, type Server } from 'socket.io'
import OrderControllers from '../controllers/OrderControllers'

export default class SocketConnection {
  io: Server

  constructor (io: Server) {
    this.io = io
  }

  public onConnection (socket: Socket): void {
    /* TODO
     pasar this.io y socket a las funciones controladoras
     registerOrderHandlers(io, socket);
     registerUserHandlers(io, socket);
    */

    socket.on('order:create', OrderControllers.createOrder)
  }
}
