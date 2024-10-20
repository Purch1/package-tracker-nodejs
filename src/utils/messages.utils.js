export const messages = {
  auth: {
    accountAlreadyExists: 'Email already exists',
    accountSuspended: 'Your account has been suspended',
    accountDeactivated: 'Your account has been deactivated',
    accountVerified: 'User Successfully Verified',
    emailAlreadyVerified: 'Your email has already been verified.',
    invalidToken: 'Invalid token provided',
    loginFailure: 'Invalid credentials',
    loginSuccess: 'Login Successful',
    logoutSuccess: 'Logged out successfully',
    noRefreshToken: 'No refresh token provided',
    verifyResetOtp: 'Otp verified successfully',
    passwordReset: 'Password reset successfully',
    refreshTokenReuse: 'Your session has been terminated for security reasons',
    signupSuccess: 'Registration successful',
    tokenRefreshed: 'Access token refreshed successfully',
  },



  common: {
    fn: {
      accepted: (resource) => `${resource} accepted`,
      cancelled: (resource) => `${resource} cancelled successfully`,
      created: (resource) => `${resource} created successfully`,
      deactivated: (resource) => `${resource} deactivated successfully`,
      deleted: (resource) => `${resource} deleted successfully`,
      fetched: (resource) => `${resource} fetched successfully`,
      updated: (resource) => `${resource} updated successfully`,
    },
  },

  exceptions: {
    duplicate: 'Duplicate error occurred',
    authenticationFailure: 'Authentication failed',
    unauthorizedAccess: 'You do not have sufficient permissions to perform this action',
    validation: 'One or more validation errors occurred.',
    fn: {
      notFound: (resource) => `${resource} not found`,
    },
  },

  user: {
    incorrectPassword: 'Password is incorrect',
    similarPassword: 'New password is similar to the previous',
    passwordChanged: 'Password changed successfully',
  },

  NODEMAIL: {
    EMAIL_SUCCESS: 'Verification token sent to your email',
    EMAIL_FAILED: 'Error with token, try again',
  },
};
