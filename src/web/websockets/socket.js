import { Server } from 'socket.io';
import { DeliveryService } from '../../logic/services/delivery.service.js';

export function initializeWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', ]
    }
  });

  global.io = io;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for location updates
    socket.on('location_changed', async (data) => {
      console.log('Incoming event: location_changed');
      console.log('Data received:', data);

      const { delivery_id, location } = data;
      const delivery = await DeliveryService.updateDeliveryLocation(delivery_id, location);

      // Emit location changed event
      console.log('Outgoing event: location_changed');
      console.log('Data emitted:', { delivery_id, location });
      io.emit('location_changed', { delivery_id, location });

      // Broadcast delivery update event
      deliveryEvents.deliveryUpdated(delivery);
    });

    // Listen for status change events
    socket.on('status_changed', async (data) => {
      console.log('Incoming event: status_changed');
      console.log('Data received:', data);
      const { delivery_id, status } = data;
      const delivery = await DeliveryService.updateDeliveryStatus(delivery_id, status);

      // Emit status changed event
      console.log('Outgoing event: status_changed');
      console.log('Data emitted:', { delivery_id, status });
      io.emit('status_changed', { delivery_id, status });

      // Broadcast delivery update event
      deliveryEvents.deliveryUpdated(delivery);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
