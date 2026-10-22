import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vibcpzbbdyhitcxilquk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Sms5VQFkERm9iOr3PYXEJA_dKOTS_55';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
