import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export async function handleGoogleLogin({ sub, name, email }) {
  let { data: user, error } = await supabase
    .from("users")
    .upsert({ google_id: sub, name, email }, { onConflict: "google_id" })
    .select()

  if (error) throw error;

  return user;
}
