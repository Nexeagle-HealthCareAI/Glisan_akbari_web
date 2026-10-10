import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://kcprzubhdfjpngdjcivj.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_9-dblA8VutGPydSSnmYHaQ_L6Bjbw8F';

/**
 * Supabase client initialized ONLY with the public anon key.
 * Service role key is NEVER used on the frontend to protect patient security.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseAppointment {
  id?: string;
  reference_id: string;
  full_name: string;
  phone: string;
  age?: string | null;
  doctor?: string | null;
  preferred_date: string;
  preferred_time: string;
  reason: string;
  message?: string | null;
  notes?: string | null;
  status: string;
  created_at?: string;
}

/**
 * Generates a cryptographically secure 8-character random reference ID (e.g. '8K3N7P9W').
 */
export function generateReferenceId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => chars[b % chars.length]).join('');
  }
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Inserts a new appointment directly into Supabase table 'appointments'.
 * Public visitors (anon) have INSERT permission under RLS.
 * .select() is omitted because anonymous public visitors do not have SELECT/read permission.
 */
export async function submitAppointmentToSupabase(payload: {
  reference_id: string;
  full_name: string;
  phone: string;
  age?: string;
  doctor?: string;
  preferred_date: string;
  preferred_time: string;
  reason: string;
  message?: string;
  notes?: string;
}): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const insertObj: any = {
      reference_id: payload.reference_id,
      full_name: payload.full_name,
      phone: payload.phone,
      age: payload.age || null,
      doctor: payload.doctor || null,
      preferred_date: payload.preferred_date,
      preferred_time: payload.preferred_time,
      reason: payload.reason,
      message: payload.message || payload.notes || null,
      status: 'Pending',
    };

    let { data, error } = await supabase
      .from('appointments')
      .insert([insertObj]);

    // Graceful fallback if table was previously created with column 'notes' instead of 'message'
    if (
      error &&
      error.message?.includes('column "message" of relation "appointments" does not exist')
    ) {
      delete insertObj.message;
      insertObj.notes = payload.message || payload.notes || null;
      const retry = await supabase.from('appointments').insert([insertObj]);
      data = retry.data;
      error = retry.error;
    }

    // Graceful fallback if column 'doctor' has not been added to remote table yet
    if (
      error &&
      error.message?.includes('column "doctor" of relation "appointments" does not exist')
    ) {
      delete insertObj.doctor;
      const retry = await supabase.from('appointments').insert([insertObj]);
      data = retry.data;
      error = retry.error;
    }

    if (error) {
      console.error('Supabase appointment insertion error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    console.error('Exception submitting appointment to Supabase:', err);
    return {
      success: false,
      error: err?.message || 'Network error connecting to database',
    };
  }
}
