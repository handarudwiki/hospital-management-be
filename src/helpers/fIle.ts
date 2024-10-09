import * as path from 'path';
import * as fs from 'fs/promises';

export function generateFilepath(filepath: string, filename: string) {
  return path.join('uploads', filepath, filename);
}

export async function deleteFile(filepath: string) {
  filepath = path.join(process.cwd(), filepath);
  try {
    await fs.unlink(filepath);
  } catch (error) {
    console.error('Error deleting file ', error);
  }
}
