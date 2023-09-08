const startPage = document.querySelector('.start_page');
const quizPage = document.querySelector('.quiz_page');
const resultPage = document.querySelector('.result_page');
const leaderBoardPage = document.querySelector('.leader_board');

const startQuizBtn = document.querySelector('.start_btn');

const currentQ = document.querySelector('.current');
const totaltQ = document.querySelector('.total');
const progress = document.querySelector('.progress-bar .progress')
const questionDiv = document.querySelector('.question')
const options = document.querySelector('.options')


const questions = [];


// document.addEventListener('load',)

const INCREMENT_SCORE_BY = 10;
const TOTAL_SCORE =  INCREMENT_SCORE_BY * questions.length;
let current_question_number = 15,
score_counter;

function fetchQuestions(){
    fetch("./js/question.json", {mode:"no-cors"}).then((response )=>{
        return response.json();
    }).then((data) => {
       questions.push(...data)
    })
}
fetchQuestions()


startQuizBtn.addEventListener('click', initializeQuiz)

function initializeQuiz(){
    startPage.classList.add('hide-pages');
    quizPage.classList.remove('hide-pages');
        
    showQuestionCount(currentQ, current_question_number)

    totaltQ.innerText = questions.length;

    showProgress(progress, current_question_number);

    showQuestion(questionDiv, current_question_number);

    console.log(options);
    options.innerHTML = questions[current_question_number].map((option)=>{
        return `
        <li>${option.choice1}</li>
        <li>${option.choice2}</li>
        <li>${option.choice3}</li>
        <li>${option.choice4}</li>
        `

    })
    
}

function showProgress(element, number){
    element.style.width = `${number / questions.length * 100}%`

}

function showQuestionCount(element, number){
    element.innerText = questions.indexOf(questions[number]) + 1;
}

function showQuestion(element, number){
    element.innerText = questions[number].question
}



