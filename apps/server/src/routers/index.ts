import cors from 'cors';
import express, { Express } from 'express';
import { env } from '../lib/env.js';
import { errorHandler } from '../lib/helpers.js';
import authRouter from './auth.js';
import contentsRouter from './contents.js';
import { imagesRouter } from './images.js';
import noMattersRouter from './no-matters.js';
import pageContentRouter from './page-content.js';
import slidersRouter from './sliders.js';
import unlockYourWorldRouter from './unlock-your-world.js';
import whatWeOfferRouter from './what-we-offer.js';
import whoWeAreRouter from './who-we-are.js';

export function registerRoutes(app: Express) {
  app.use(cors());
  app.use(express.json());

  app.use('/api/images/', express.static(env.IMAGES_DIRECTORY, { maxAge: Infinity }));

  app.use('/api/contents', contentsRouter);

  app.use('/api/admin/auth', authRouter);
  app.use('/api/admin/images', imagesRouter);
  app.use('/api/admin/sliders', slidersRouter);
  app.use('/api/admin/page-content', pageContentRouter);
  app.use('/api/admin/who-we-are', whoWeAreRouter);
  app.use('/api/admin/what-we-offer', whatWeOfferRouter);
  app.use('/api/admin/unlock-your-world', unlockYourWorldRouter);
  app.use('/api/admin/no-matters', noMattersRouter);

  app.use(errorHandler);
}
