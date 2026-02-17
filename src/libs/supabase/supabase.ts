import { createClient } from "@supabase/supabase-js";
import environment from "../../config/environment";

const supabase = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_API_KEY,
);

export default supabase;

export const BUCKET_PARTICIPANT_PROFILE = "participant_profiles";
