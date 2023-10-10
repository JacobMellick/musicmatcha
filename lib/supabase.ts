import { createClient } from "@supabase/supabase-js";

const apiKey = process.env.API_KEY!;
const url = process.env.URL!;
const supabase = createClient(url, apiKey);

export default supabase;
