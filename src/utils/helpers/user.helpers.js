/**
 * Enum representing user roles in the system.
 * @enum {string}
 * @readonly
 */
export const UserRole = {
  /** Represents an administrator user with full access. */
  ADMIN: 'admin',

  /** Represents a driver user with access to driver-related functionalities. */
  DRIVER: 'driver',

  /** Represents a customer user with access to customer-related functionalities. */
  CUSTOMER: 'customer'
};

/** 
 * Array of all user roles.
 * This can be used for validation or other purposes where 
 * you need to check available user roles.
 */
export const userRoles = Object.values(UserRole);
