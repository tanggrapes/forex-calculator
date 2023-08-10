export interface IRateResponse {
  success: boolean;
  historical: boolean;
  date: Date;
  timestamp: number;
  base: string;
  rates: any;
}
