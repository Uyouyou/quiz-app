function startQuiz() {
  event.preventDefault();
  const nameInput = document.getElementById("text").value;
  if (nameInput) {
    window.location.href = `quiz.html?name=${encodeURIComponent(nameInput)}`;
  } else {
    alert("Please enter your name");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("name-form");
  form.addEventListener("submit", startQuiz);
  document.getElementById("start-button").addEventListener("click", startQuiz);
});
// console.log("clicked");
