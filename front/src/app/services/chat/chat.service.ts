import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import  io  from 'socket.io-client';
import { ChatMessage } from '../../chat-side/chat-side.component';

interface ConnectionStatus {
  connected: boolean;
  onlineUsers?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket?: any;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private connectionSubject = new BehaviorSubject<ConnectionStatus>({ connected: false });
  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);

  // Configuración del servidor Socket.IO
  private readonly SERVER_URL = 'http://localhost:3000'; // Cambia por tu URL del servidor

  constructor() {}

  connect(user: any): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(this.SERVER_URL, {
      auth: {
        token: localStorage.getItem('token'), 
        userId: user.id,
        username: user.username || user.email
      },
      transports: ['websocket', 'polling']
    });

    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    if (!this.socket) return;

    // Conexión establecida
    this.socket.on('connect', () => {
      console.log('Conectado al chat');
      this.connectionSubject.next({ connected: true });
    });

    // Desconexión
    this.socket.on('disconnect', () => {
      console.log('Desconectado del chat');
      this.connectionSubject.next({ connected: false });
    });

    // Nuevo mensaje recibido
    this.socket.on('newMessage', (message: ChatMessage) => {
      this.messageSubject.next(message);
    });

    // Actualización de usuarios en línea
    this.socket.on('usersCount', (count: number) => {
      this.connectionSubject.next({ 
        connected: this.socket?.connected || false, 
        onlineUsers: count 
      });
    });

    // Mensajes anteriores
    this.socket.on('previousMessages', (messages: ChatMessage[]) => {
      this.messagesSubject.next(messages);
    });

    // Errores de conexión
    this.socket.on('connect_error', (error: any) => {
      console.error('Error de conexión:', error);
      this.connectionSubject.next({ connected: false });
    });

    // Error de autenticación
    this.socket.on('auth_error', (error: any) => {
      console.error('Error de autenticación:', error);
      this.disconnect();
    });
  }

  sendMessage(message: Partial<ChatMessage>): void {
    if (this.socket?.connected) {
      this.socket.emit('sendMessage', message);
    } else {
      console.error('No hay conexión con el servidor de chat');
    }
  }

  getMessages(): Observable<ChatMessage> {
    return this.messageSubject.asObservable().pipe(
      // Filtrar valores null
      filter(message => message !== null)
    ) as Observable<ChatMessage>;
  }

  getPreviousMessages(): Observable<ChatMessage[]> {
    return this.messagesSubject.asObservable();
  }

  getConnectionStatus(): Observable<ConnectionStatus> {
    return this.connectionSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
    this.connectionSubject.next({ connected: false });
  }
}

// Necesitas instalar socket.io-client:
// npm install socket.io-client @types/socket.io-client