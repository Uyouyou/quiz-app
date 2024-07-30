const apiUrl = 'https://opentdb.com/api.php?amount=30&category=9&difficulty=medium&type=multiple';

async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayQuestions(data.results);
    } catch (error) {
        console.log('Error fetching data', error);
    }
}

function displayQuestions(questions) {
    const questionContainer = document.querySelector('.questions');
    const optionsContainer = document.querySelector('section');
    const progressContainer = document.querySelector('.number');
    const nextButton = document.querySelector('button');
    const prevButton = document.querySelector('.nav');

    let currentQuestionIndex = 0;
    let timer;
    let selectedAnswers = {};

    function showQuestion(index) {
        if (index >= questions.length || index < 0) {
            return;
        }
        const question = questions[index];
        questionContainer.innerHTML = `<p class="auto-questions">${question.question}</p>`;
        optionsContainer.innerHTML = '';
        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        answers.forEach(answer => {
            const optionSpan = document.createElement('span');
            optionSpan.classList.add('options');
            optionSpan.innerHTML = `
                <p class="answers">${answer}</p>
                <input class="radio" type="radio" name="answer" value="${answer}" />
            `;
            optionSpan.addEventListener('click', () => {
                document.querySelectorAll('.options').forEach(option => option.classList.remove('selected'));
                optionSpan.classList.add('selected');
                selectedAnswers[currentQuestionIndex] = answer;
            });

            if (selectedAnswers[currentQuestionIndex] === answer) {
                optionSpan.classList.add('selected');
            }

            optionsContainer.appendChild(optionSpan);
        });

        progressContainer.textContent = `${index + 1}/${questions.length}`;
        startTimer();
    }

    function startTimer() {
        let timeLeft = 30;
        document.querySelector('.inner_box').textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            document.querySelector('.inner_box').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        clearInterval(timer);
        if (currentQuestionIndex + 1 >= questions.length) {
            displayResults();
            return;
        }
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }

    function prevQuestion() {
        clearInterval(timer);
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }

    

    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);

    showQuestion(currentQuestionIndex);
}

fetchQuestions();
