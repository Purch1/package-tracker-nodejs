export const packageEvents = {
  packageCreated: (newPackage) => {
    console.log('Outgoing event: packageCreated');
    console.log('Data emitted:', { message: 'New package created', data: newPackage });

    global.io.emit('packageCreated', {
      message: 'New package created',
      data: newPackage
    });
  },

  packageStatusUpdated: (updatedPackage) => {
    console.log('Outgoing event: packageStatusUpdated');
    console.log(`Data emitted: Package status updated to ${updatedPackage.status}`);
    console.log('Data:', updatedPackage);

    global.io.emit('packageStatusUpdated', {
      message: `Package status updated to ${updatedPackage.status}`,
      data: updatedPackage
    });
  },

  packageUpdated: (updatedPackage) => {
    console.log('Outgoing event: packageUpdated');
    console.log('Data emitted:', { message: 'Package updated', data: updatedPackage });

    global.io.emit('packageUpdated', {
      message: 'Package updated',
      data: updatedPackage
    });
  },

  packageDeleted: (packageId) => {
    console.log('Outgoing event: packageDeleted');
    console.log('Data emitted:', { message: 'Package deleted', data: { id: packageId } });

    global.io.emit('packageDeleted', {
      message: 'Package deleted',
      data: { id: packageId }
    });
  }
};
