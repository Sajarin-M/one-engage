import cors from 'cors';
import express, { Express } from 'express';
import { env } from '../lib/env.js';

export function registerRoutes(app: Express) {
  app.use(cors());
  app.use('/api/images/', express.static(env.IMAGES_DIRECTORY, { maxAge: Infinity }));
}
