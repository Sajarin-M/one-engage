import { existsSync, mkdirSync } from 'fs';

export function ensureDirExistsSync(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}
