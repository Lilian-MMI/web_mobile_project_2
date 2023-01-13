import express from 'express';
import sequelize from './configs/sequelize';
import userRouter from './routes/user.routes';
import messageRouter from './routes/message.routes';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import channelRouter from './routes/channel.routes';
import cors from 'cors';

dotenv.config();

// Constants
const PORT = process.env.PORT || 9000;
const corsOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

// App
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigins,
  },
});

app.use(express.json());
app.use(cors({ origin: corsOrigins }));
app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/channels', channelRouter);

/* CONNECT TO DATABASE */
sequelize
  .sync()
  .then(() => console.log('Connected to database successfully'))
  .catch((err) => console.log('Error connecting to database', err));

// Socket.io
io.on('connection', (socket) => {
  let currentChannelId: string;
  let currentUser: { username: string; id: string; email: string };

  socket.on('joinChannel', (data) => {
    currentChannelId = data.channelId;
    data.socketId = socket.id;
    socket.join(currentChannelId);

    currentUser = data.user;

    io.to(currentChannelId).emit('userJoined', data);
  });

  socket.on('addMessage', (data) => {
    io.to(currentChannelId).emit('newMessage', {
      message: data.message,
      type: data.type,
      user: data.user,
    });
  });

  socket.on('channelAdded', () => {
    io.emit('newChannel');
  });

  socket.on('userQuit', (data) => {
    socket.leave(data.channelId);

    io.to(data.channelId).emit('userLeft', data);
  });

  socket.on('disconnect', () => {
    io.to(currentChannelId).emit('userLeft', {
      socketId: socket.id,
      user: currentUser,
    });
  });
});

httpServer.listen(PORT, () => {
  console.log('\x1b[33m%s\x1b[0m', `Server listen on port : ${PORT} 🚀`);
});
