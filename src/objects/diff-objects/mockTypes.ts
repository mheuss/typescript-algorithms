export interface IBankData {
  routing_number?: number;
  bank_name?: string;
  city: string;
  state: string;
  zip: string;
}

export type Banks = IBankData[];
