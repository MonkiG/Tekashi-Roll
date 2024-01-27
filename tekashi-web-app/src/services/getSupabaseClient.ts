"use server"
import { createClient } from "@supabase/supabase-js";
import config from "@/helpers/config";


export async function getSupabaseClient(){
    const supabase = createClient(config.SUPABASE_URL!, config.SUPABASE_ANON_KEY!)

    return supabase
}