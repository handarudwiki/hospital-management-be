import { LapTemplate } from '@prisma/client';

export class LapTemplateResponse {
  id: number;
  name: string;
  template: string;
}

export function toLabTemplateResponse(data: LapTemplate): LapTemplateResponse {
  const { id, name, template } = data;
  const response: LapTemplateResponse = {
    id,
    name,
    template,
  };
  return response;
}
