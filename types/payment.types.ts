import { UTMParams } from './common.types';

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
  paidFor:  number | string | null | undefined;
  utm_source: number | string | null | undefined;
  utm_medium: number | string | null | undefined;
  utm_campaign: number | string | null | undefined;
  created_at: string; // ISO timestamp;
}

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  amount: number;
  phone: string;
  companyName: string;
  gstNumber?: string;
  whyToAttend?: string; // Optional field for why to attend
  referredBy?: string; // Optional field for referred by
}

export interface PaymentProps extends UTMParams {
  onClose?: () => void;
  color : string; // Optional color prop for Razorpay theme
  amount : number;  // Payment data to be passed to the component
  isEvent?: boolean; // Optional prop to indicate if it's an event payment
  paidFor : string;
}
