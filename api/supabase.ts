import AsyncStorage from "@react-native-async-storage/async-storage"
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@env"
import { createClient } from "@supabase/supabase-js"
import 'react-native-url-polyfill/auto'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})