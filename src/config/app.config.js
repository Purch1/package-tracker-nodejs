import dotenv from 'dotenv';
dotenv.config();  

const config = {
  database: {
    uri: process.env.MONGODB_URI 
  },
  server: {
    port: process.env.PORT || 3000,  
  },
  jwt: {
    issuer: process.env.ISSUER || 'defaultIssuer',
    secret: process.env.JWT_SECRET || 'defaultSecret',
    ttl: {
      accessInMs: (process.env.ACCESS_TOKEN_TTL || 1200) * 1_000,  
      accessInSec: process.env.ACCESS_TOKEN_TTL || 1200,
      refreshInMs: (process.env.REFRESH_TOKEN_TTL || 43200) * 1_000,  
      refreshInSec: process.env.REFRESH_TOKEN_TTL || 43200,
    }
  }
};

export default config;
