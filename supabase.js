import { createClient } from "./node_modules/@supabase/supabase-js/dist/main";
const supabaseUrl = "https://qxocnptqrhhgeibheivb.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4b2NucHRxcmhoZ2VpYmhlaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODYwMDMsImV4cCI6MjAzNzg2MjAwM30.mIPMw7owB-Cclc-KGoMBN7dXZxbSVsoY-D1qtP9Kzqo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

