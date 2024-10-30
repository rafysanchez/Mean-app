export const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/meanapp',
    jwtSecret: process.env.JWT_SECRET || '8357374250'
  };