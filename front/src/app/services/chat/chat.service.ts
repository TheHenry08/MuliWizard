// src/app/services/chat.service.ts
  // import { Injectable } from '@angular/core';
  // import { io, Socket } from 'socket.io-client';
  // import { Observable } from 'rxjs';

  // @Injectable({
  // providedIn: 'root'
  // })
  // export class ChatService {
  // private socket: Socket;
  // private readonly SERVER_URL = 'http://localhost:3000';

  // constructor() {
  //   this.socket = io(this.SERVER_URL);
  // }

  // sendMessage(message: string) {
  //   this.socket.emit('chatMessage', message);
  // }

  // onMessage(): Observable<string> {
  //   return new Observable(observer => {
  //     this.socket.on('chatMessage', (msg: string) => {
  //       observer.next(msg);
  //     });
  //   });
  // }
  // }
