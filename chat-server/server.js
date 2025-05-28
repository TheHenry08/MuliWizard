const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configurar CORS para Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // URL de tu app Angular
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Almacenamiento en memoria para usuarios conectados y mensajes
const connectedUsers = new Map();
const messages = []; // Array simple para almacenar mensajes
let messageIdCounter = 1;

// Ruta básica para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.json({ message: 'Chat server is running!' });
});

// Eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Manejar autenticación básica
  socket.on('authenticate', (userData) => {
    if (userData && userData.userId) {
      connectedUsers.set(socket.id, {
        id: userData.userId,
        username: userData.username || userData.email,
        socketId: socket.id
      });
      
      console.log(`Usuario autenticado: ${userData.username || userData.email}`);
      
      // Enviar mensajes anteriores al usuario que se conecta
      socket.emit('previousMessages', messages.slice(-50)); // Últimos 50 mensajes
      
      // Notificar a todos los usuarios el número de usuarios conectados
      io.emit('usersCount', connectedUsers.size);
    }
  });

  // Manejar autenticación desde el handshake
  const userData = socket.handshake.auth;
  if (userData && userData.userId) {
    connectedUsers.set(socket.id, {
      id: userData.userId,
      username: userData.username,
      socketId: socket.id
    });
    
    console.log(`Usuario conectado: ${userData.username}`);
    
    // Enviar mensajes anteriores
    socket.emit('previousMessages', messages.slice(-50));
    
    // Notificar usuarios conectados
    io.emit('usersCount', connectedUsers.size);
  }

  // Recibir y reenviar mensajes
  socket.on('sendMessage', (messageData) => {
    const user = connectedUsers.get(socket.id);
    
    if (!user) {
      socket.emit('auth_error', 'Usuario no autenticado');
      return;
    }

    // Crear mensaje completo
    const fullMessage = {
      id: messageIdCounter++,
      username: user.username,
      message: messageData.message,
      timestamp: new Date(),
      userId: user.id
    };

    // Guardar mensaje en memoria
    messages.push(fullMessage);
    
    // Mantener solo los últimos 1000 mensajes en memoria
    if (messages.length > 1000) {
      messages.shift();
    }
    // Enviar mensaje a todos los usuarios conectados
    io.emit('newMessage', fullMessage);
    
    console.log(`Mensaje de ${user.username}: ${messageData.message}`);
  });

  // Solicitar mensajes anteriores
  socket.on('getPreviousMessages', (data) => {
    const limit = data.limit || 50;
    const previousMessages = messages.slice(-limit);
    socket.emit('previousMessages', previousMessages);
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      console.log(`Usuario desconectado: ${user.username}`);
      connectedUsers.delete(socket.id);
      
      // Notificar a todos los usuarios el nuevo número de usuarios conectados
      io.emit('usersCount', connectedUsers.size);
    }
  });

  // Manejar errores
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor de chat corriendo en puerto ${PORT}`);
  console.log(`CORS configurado para: http://localhost:4200`);
});