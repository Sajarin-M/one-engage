import crypto from 'crypto';
import { Router } from 'express';
import 'fs/promises';
import { readFile } from 'fs/promises';
import path from 'path';
import multer from 'multer';
import { getPlaiceholder } from 'plaiceholder';
import { env } from '../lib/env.js';
import { isAdminExpress } from '../lib/helpers.js';

class InvalidFileTypeError extends Error {}

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: env.IMAGES_DIRECTORY,
    filename: (_, file, cb) => cb(null, crypto.randomUUID() + path.extname(file.originalname)),
  }),
  fileFilter: (_, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new InvalidFileTypeError());
    }
  },
}).single('file');

export const imagesRouter = Router();

imagesRouter.post('/upload', isAdminExpress, (req, res) => {
  imageUpload(req, res, async (error) => {
    if (error) {
      if (error instanceof InvalidFileTypeError) {
        return res.status(400).json({ message: 'Invalid file type' });
      } else if (error instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Failed to upload file' });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    const file = req.file;

    if (file) {
      const buffer = await readFile(file.path);
      const { base64, metadata } = await getPlaiceholder(buffer);
      const result = {
        name: file.filename,
        size: file.size,
        blurUrl: base64,
        width: metadata.width,
        height: metadata.height,
      };

      return res.json(result);
    }
    return res.status(400).json({ message: 'No image file provided' });
  });
});
