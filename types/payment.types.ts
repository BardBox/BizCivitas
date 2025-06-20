export interface Payment {
  id: string; // UUID
  payment_id: string;
  order_id: string;
  amount: number;
  captured: boolean | null;
  amount_refunded: number | string | null | undefined;
  description: number | string | null | undefined;
  email: number | string | null | undefined;
  phone: number | string | null | undefined;
  first_name: number | string | null | undefined;
  last_name: number | string | null | undefined;
  gst_number: number | string | null | undefined;
  company_name: number | string | null | undefined;
  membership_type: number | string | null | undefined;
  utm_source: number | string | null | undefined;
  utm_medium: number | string | null | undefined;
  utm_campaign: number | string | null | undefined;
  created_at: string; // ISO timestamp
}