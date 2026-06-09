export interface RiceRate {
  id: string;
  variety: string;
  form: string;
  inrPerKg: number;
  inrPerMt: number;
  usdPerMt: number;
  updatedAt: string;
}

export interface RiceVariety {
  id: string;
  name: string;
  description?: string;
}

export interface RiceForm {
  id: string;
  name: string;
}
