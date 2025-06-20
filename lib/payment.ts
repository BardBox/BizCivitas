import { supabase } from './db';
import { Payment } from '../types/payment.types';

export async function insertSuccessPayment(payment: Partial<Payment>) {
  try {
    console.log("Inserting payment with notes:", payment);

    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select(); // optionally get back inserted rows

    if (error) {
      console.error("Error inserting payment:", error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error inserting payment:', error);
    throw new Error('Failed to insert payment');
  }
}
