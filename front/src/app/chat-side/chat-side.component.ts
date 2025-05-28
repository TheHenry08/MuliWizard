import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';
import { Subscription } from 'rxjs';

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  userId?: string;
}

@Component({
  selector: 'app-chat-side',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-side.component.html',
  styleUrl: './chat-side.component.css'
})
export class ChatSideComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  messages: ChatMessage[] = [];
  newMessage: string = '';
  isConnected: boolean = false;
  currentUser: any = null;
  onlineUsers: number = 0;
  
  private chatSub?: Subscription;
  private connectionSub?: Subscription;
  private userSub?: Subscription;
  private shouldScroll: boolean = false;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Verificar autenticación
    this.userSub = this.authService.user$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.initializeChat();
      } else {
        this.disconnectChat();
      }
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy() {
    this.disconnectChat();
    this.userSub?.unsubscribe();
    this.chatSub?.unsubscribe();
    this.connectionSub?.unsubscribe();
  }

  private initializeChat() {
    if (!this.currentUser) return;

    // Conectar al chat
    this.chatService.connect(this.currentUser);

    // Suscribirse a mensajes
    this.chatSub = this.chatService.getMessages().subscribe((message: ChatMessage) => {
      this.messages.push(message);
      this.shouldScroll = true;
    });

    // Suscribirse al estado de conexión
    this.connectionSub = this.chatService.getConnectionStatus().subscribe((status) => {
      this.isConnected = status.connected;
      this.onlineUsers = status.onlineUsers || 0;
    });

  }

  private disconnectChat() {
    this.chatService.disconnect();
    this.isConnected = false;
    this.messages = [];
    this.onlineUsers = 0;
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.currentUser || !this.isConnected) {
      return;
    }

    const message: Partial<ChatMessage> = {
      username: this.currentUser.username || this.currentUser.email,
      message: this.newMessage.trim(),
      userId: this.currentUser.id
    };

    this.chatService.sendMessage(message);
    this.newMessage = '';
    
    // Enfocar el input después de enviar
    setTimeout(() => {
      this.messageInput.nativeElement.focus();
    }, 0);
  }

  // Mandar mssg
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }


  // Scrolleo
  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  formatTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  isOwnMessage(message: ChatMessage): boolean {
    return this.currentUser && message.userId === this.currentUser.id;
  }

  trackByMessageId(index: number, message: ChatMessage): string {
    return message.id;
  }
}