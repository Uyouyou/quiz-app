// console.log("clicked");

const _supabaseUrl = "https://qxocnptqrhhgeibheivb.supabase.co";
const _supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4b2NucHRxcmhoZ2VpYmhlaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyODYwMDMsImV4cCI6MjAzNzg2MjAwM30.mIPMw7owB-Cclc-KGoMBN7dXZxbSVsoY-D1qtP9Kzqo";
const _supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

console.log(localStorage.getItem("data"));
console.log(localStorage.getItem("user"));
document.addEventListener("DOMContentLoaded", function () {
  async function signInWithGithub() {
    try {
      // console.log("clicked");
      const { data, error } = await _supabase.auth.signInWithOAuth({
        provider: "github",
      });
      window.location.href = "https://quiz-application-ruddy.vercel.app/app/quiz.html";
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("user", JSON.stringify(_supabase.auth.getUser()));

      if (error) {
        console.error("Sign-in error:", error);
      } else {
        console.log("Sign-in data:", data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const signInButton = document.getElementById("auth");
  if (signInButton) {
    signInButton.addEventListener("click", signInWithGithub);
  } else {
    console.error("Sign-in button not found");
  }
});