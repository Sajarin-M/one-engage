import chalk from 'chalk';
import express from 'express';
import { env } from './lib/env.js';
import { ensureDirExistsSync } from './lib/utils.js';
import { registerRoutes } from './routers/index.js';

ensureDirExistsSync(env.IMAGES_DIRECTORY);

const app = express();

registerRoutes(app);

app.listen(env.PORT, () =>
  console.log(
    `✅ Server started\n   - Port: ${chalk.blue(env.PORT)}\n   - Mode: ${chalk.blue(env.NODE_ENV)}`,
  ),
);
