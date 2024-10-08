import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export type PrismaClientError = PrismaClientKnownRequestError & {
  meta?: { field_name?: string; target?: string };
};
