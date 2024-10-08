import { PrismaClientError } from './PrismaClientError';

export class ForeignKeyConstrantError extends Error {
  constructor(e: PrismaClientError) {
    const foreignKeyField = e.meta.field_name.split('_')[0];
    super(`Foreign key field ${foreignKeyField} is invalid.`);
  }
}
