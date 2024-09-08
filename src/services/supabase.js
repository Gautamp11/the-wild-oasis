import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tifqawwuaiorgvqycztr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZnFhd3d1YWlvcmd2cXljenRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2Mzk2NTcsImV4cCI6MjAzOTIxNTY1N30.JjlSWm0ME7QEDC6KjbA5DN7yLCrniwzMYZA-xn6yQqQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
