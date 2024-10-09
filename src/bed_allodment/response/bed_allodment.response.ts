import { BedAllodment } from '@prisma/client';

export class BedAllodmentResponse {
  patient_id: number;
  bed_id: number;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  status: string;
}

export function toBedAllodmentResponse(
  data: BedAllodment,
): BedAllodmentResponse {
  return {
    patient_id: data.patient_id,
    bed_id: data.bed_id,
    start_date: data.start_date,
    end_date: data.end_date,
    start_time: data.start_time,
    end_time: data.end_time,
    status: data.status,
  };
}
