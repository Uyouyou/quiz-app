const _supabaseUrl = "https://qxocnptqrhhgeibheivb.supabase.co";
// const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4b2NucHRxcmhoZ2VpYmhlaXZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjI4NjAwMywiZXhwIjoyMDM3ODYyMDAzfQ.3peqXd2XGAI368FklgVdKFLmRfzv4MZXXWX8Rdp_lbA'

const _supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4b2NucHRxcmhoZ2VpYmhlaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODYwMDMsImV4cCI6MjAzNzg2MjAwM30.mIPMw7owB-Cclc-KGoMBN7dXZxbSVsoY-D1qtP9Kzqo";
const _supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

async function signOut() {
  try {
    await _supabase.auth.signOut();
    localStorage.removeItem("data");
    localStorage.removeItem("user");
    window.location.href = "https://quiz-application-ruddy.vercel.app";
  } catch (error) {
    console.error("Sign-out error:", error);
  }
}

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", signOut)
if (logoutBtn) {
  logoutBtn.addEventListener("click", signOut);
} else {
  console.error("Logout button not found");
}

// console.log({ user: _supabase.auth });
