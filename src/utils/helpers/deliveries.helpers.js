/**
 * Enum representing delivery statuses in the system.
 * @enum {string}
 * @readonly
 */
export const DeliveryStatus = {
    /** Represents an open delivery request. */
    OPEN: 'open',
  
    /** Represents a delivery that has been picked up. */
    PICKED_UP: 'picked-up',
  
    /** Represents a delivery that is currently in transit. */
    IN_TRANSIT: 'in-transit',
  
    /** Represents a successfully delivered package. */
    DELIVERED: 'delivered',
  
    /** Represents a failed delivery attempt. */
    FAILED: 'failed'
  };
  
  /**
   * Array of all delivery statuses.
   * This can be used for validation or other purposes where 
   * you need to check available delivery statuses.
   */
  export const deliveryStatuses = Object.values(DeliveryStatus);
  