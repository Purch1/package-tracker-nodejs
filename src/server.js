import 'express-async-errors';
import http from 'http';
import connectDatabse from './config/db.config.js';
import app from './web/application.js';
import { initializeWebSocket } from './web/websockets/socket.js';

const server = http.createServer(app);
const PORT = process.env.PORT;

connectDatabse();

initializeWebSocket(server);

server
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error(`Failed to start server: ${err.message}`);
  });

