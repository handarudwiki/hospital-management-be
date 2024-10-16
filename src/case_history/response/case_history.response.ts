import { toUserResponse, UserResponse } from 'src/user/response/user.response';

export class CaseHistoryResponse {
  id: number;
  patient: UserResponse;
  date: Date;
  title: string;
  food_allergies: string;
  bleed_tendency: string;
  heart_disease: string;
  blood_pressure: string;
  diabetic: string;
  surgery: string;
  accident: string;
  family_medical_history: string;
  current_medication: string;
  female_prenancy: string;
  breast_feeding: string;
  low_income: string;
  reference: string;
  others: string;
  status: string;
}

export function toCaseHistoryResponse(caseHistory: any): CaseHistoryResponse {
  return {
    id: caseHistory.id,
    patient: toUserResponse(caseHistory.patient),
    date: caseHistory.date,
    title: caseHistory.title,
    food_allergies: caseHistory.food_allergies,
    bleed_tendency: caseHistory.bleed_tendency,
    heart_disease: caseHistory.heart_disease,
    blood_pressure: caseHistory.blood_pressure,
    diabetic: caseHistory.diabetic,
    surgery: caseHistory.surgery,
    breast_feeding: caseHistory.breast_feeding,
    female_prenancy: caseHistory.female_prengancy,
    low_income: caseHistory.low_income,
    others: caseHistory.others,
    reference: caseHistory.reference,
    status: caseHistory.status,
    accident: caseHistory.accident,
    family_medical_history: caseHistory.family_medical_history,
    current_medication: caseHistory.current_medication,
  };
}
