
// ======================================
// THREADVERSE LITTLE - SUPABASE CONNECTION
// ======================================

// Your Supabase project details
const SUPABASE_URL = "https://hitclqiiepzlakmkizcl.supabase.";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5Ek-hFur4QJKH3gZPlZnaA_giy3tEiQ";

// Create Supabase connection
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Make connection available to script.js
window.supabaseClient = supabaseClient;

console.log("THREADVERSE LITTLE: Supabase client initialized!");
