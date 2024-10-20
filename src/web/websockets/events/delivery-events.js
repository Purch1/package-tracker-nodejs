export const deliveryEvents = {
  deliveryCreated: (delivery) => {
    console.log('Outgoing event: deliveryCreated');
    console.log('Data emitted:', { message: 'New delivery created', data: delivery });

    global.io.emit('deliveryCreated', {
      message: 'New delivery created',
      data: delivery
    });
  },

  deliveryUpdated: (delivery) => {
    console.log('Outgoing event: deliveryUpdated');
    console.log('Data emitted:', { message: 'Delivery updated', data: delivery });

    global.io.emit('deliveryUpdated', {
      message: 'Delivery updated',
      data: delivery
    });
  },

  deliveryDeleted: (deliveryId) => {
    console.log('Outgoing event: deliveryDeleted');
    console.log('Data emitted:', { message: 'Delivery deleted', data: { id: deliveryId } });

    global.io.emit('deliveryDeleted', {
      message: 'Delivery deleted',
      data: { id: deliveryId }
    });
  }
};
