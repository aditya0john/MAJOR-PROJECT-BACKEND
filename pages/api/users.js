import { supabase } from "../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    try {
      const user = await handleGoogleLogin(req.body);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
