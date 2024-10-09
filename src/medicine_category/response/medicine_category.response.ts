export class MedicinCategoryResponse {
  id: number;
  name: string;
  description: string;
}

export function toMedicineCategoryResponse(data: any): MedicinCategoryResponse {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
  };
}
