import express from 'express';
import mongoose from 'mongoose';
import { userRoutes } from '../infrastructure/http/routes/userRoutes';
import { config } from './config/env';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

mongoose.connect(config.mongoUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
  });

  