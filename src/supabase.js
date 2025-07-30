import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://ybdtszvxvysizmxnzcpw.supabase.co",
    "sb_publishable_VeJfw1QMjZUTh2XfIaZ5_g_cusplhS9"
);

export default supabase;
