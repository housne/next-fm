import { Profile } from "@prisma/client";
import { Session as SupabaseSession } from "@supabase/supabase-js";


export type Session = SupabaseSession & {
  profile?: Profile | null
}