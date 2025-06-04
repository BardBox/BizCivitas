import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vxgwzfourhzoxwejijxl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4Z3d6Zm91cmh6b3h3ZWppanhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDAzNzEsImV4cCI6MjA2MzY3NjM3MX0.CcSPEYkbp9gXmCXGOrr0STqh88pfE_1j5U6zBkaTZeU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)