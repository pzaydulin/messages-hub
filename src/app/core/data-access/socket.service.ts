import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;
  
  constructor() { 
    this.socket = io('http://localhost:4000');
  }

  sentMessage(msg: string) {
    this.socket.emit('message sent', msg);
  }

  getMessage() {
    return new Observable((observer) => {
      this.socket.on('message sent', () => {
        observer.next();
      });
    });
  }

  
}
