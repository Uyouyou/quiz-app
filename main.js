const apiUrl = 'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple';

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
    const container = document.querySelector('.container')
    const resultContainer = document.querySelector('.result-container')
    
    const questionContainer = document.querySelector('.questions');
    const optionsContainer = document.querySelector('section');
    const progressContainer = document.querySelector('.number');
    const nextButton = document.querySelector('button');
    const prevButton = document.querySelector('.nav');    
    const resultScore = document.querySelector('.quiz-score')    

    let currentQuestionIndex = 1;    
    let timer;
    let selectedAnswers = [];    
    let correctAnswers = 0;    
    function showQuestion(index) {
        if (index >= questions.length || index < 0) {
            return;
        }
        const question = questions[index];
        questionContainer.innerHTML = `<p class="auto-questions">${question.question}</p>`;
        optionsContainer.innerHTML = '';
        const answers = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        answers.forEach((answer) => {            
            const optionSpan = document.createElement('span');
            optionSpan.classList.add('options');            
            optionSpan.innerHTML = `
                <label for="id" class="answers">${answer}</label>
                <input class="radio" id="id" type="radio" name="answer" value="${answer}" />
            `;
            optionSpan.addEventListener('click', () => {
                document.querySelectorAll('.options').forEach(option => option.classList.remove('selected'));
                optionSpan.classList.add('selected');
                selectedAnswers[currentQuestionIndex] = answer;                
                
                if (answer === questions[index].correct_answer) {
                    correctAnswers++                    
                }                
            });

            if (selectedAnswers[currentQuestionIndex] === answer) {
                optionSpan.classList.add('selected');                
            }

            optionsContainer.appendChild(optionSpan);
        });
        progressContainer.textContent = `${currentQuestionIndex}/${questions.length}`;        
    }

    function startTimer() {
        let timeLeft = 200;
        document.querySelector('.inner_box').textContent = `${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            document.querySelector('.inner_box').textContent = `${timeLeft}s` ;
            if (timeLeft === 0) {
                clearInterval(timer);
                container.style.display = 'none'
                resultContainer.style.display = 'block'
                resultScore.innerHTML = correctAnswers
            }
            if(timeLeft <= 60){
                document.querySelector('.outer_box').style.background = `conic-gradient(rgb(156, 1, 1) 0turn var(--degrees),#e91212 0turn`
                document.querySelector('.outer_box').classList.add('time-notification')                
            }
        }, 1000);
    }
startTimer()

    function nextQuestion() {          
        if (currentQuestionIndex + 1 === questions.length){
            nextButton.textContent ='Submit'            
        }                           
        if (currentQuestionIndex  >= questions.length) {                                    
            displayResults();
            return;
        }
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);  
        
        function scrollToTop() {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })};                  
        return scrollToTop()

    }

    function prevQuestion() {       
        if(currentQuestionIndex === 1) return
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }

function displayResults() {            
            resultScore.innerHTML = correctAnswers
            container.style.display = 'none'
            resultContainer.style.display = 'block'
}    

    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);

    showQuestion(currentQuestionIndex);
}

fetchQuestions();

