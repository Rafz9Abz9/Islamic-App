/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 9*/

const startPage = document.querySelector('.start_page');
const quizPage = document.querySelector('.quiz_page');
const resultPage = document.querySelector('.result_page');

const startQuizBtn = document.querySelector('.start_btn');

const currentQ = document.querySelector('.current');
const totaltQuiz = document.querySelector('.total');
const progress = document.querySelector('.progress-bar .progress');
const questionDiv = document.querySelector('.question');
const optionsDiv = document.querySelector('.options');
const nextBtn = document.querySelector('.quiz_page .next_btn');
const restartBtn = document.querySelector('.restart_btn');
const quitBtn = document.querySelector('.quit_btn');


const questionData = [];
const questions = [];

const INCREMENT_SCORE_BY = 10;
let TOTAL_SCORE = 0,
CURRENT_SCORE = 0,
current_question_number = 0;

function fetchQuestions(){
    fetch("./js/question.json", {mode:"no-cors"}).then((response )=>{
        return response.json();
    }).then((data) => {
        questionData.push(...data);
        TOTAL_SCORE = INCREMENT_SCORE_BY * questions.length;
    });
}
fetchQuestions();

startQuizBtn.addEventListener('click', initializeQuiz);

async function initializeQuiz(){
    questions.splice(0, questions.length);
    questions.push(...shuffleArray(questionData));
    startPage.classList.add('hide-pages');
    quizPage.classList.remove('hide-pages');
    current_question_number = 0;
    CURRENT_SCORE= 0;
    TOTAL_SCORE = INCREMENT_SCORE_BY * questions.length;
        
    showQuestionCount(currentQ, current_question_number);

    totaltQuiz.innerText = questions.length;

    showProgress(progress, current_question_number);

    showQuestion(questionDiv, current_question_number);

    showOptions(optionsDiv, current_question_number);

    optionsDiv.addEventListener('click', function(e){
        if (e.currentTarget.getAttribute('disabled') === 'true') { return; }

        const  element = e.target;
        let optionList = optionsDiv.querySelectorAll('li');
        
        if(element.tagName === "LI"){
           let optionValue = e.target.innerText;
          let answer = questions[current_question_number].answer;
      
          optionsDiv.setAttribute('disabled', true); 

          checkAnswer(answer, optionValue, element, optionList);
  

        }
    });
}

nextBtn.addEventListener('click', function () {
    current_question_number++;
    optionsDiv.removeAttribute('disabled');
    showQuestionCount(currentQ, current_question_number);
    showProgress(progress, current_question_number);
    showQuestion(questionDiv, current_question_number);
    showOptions(optionsDiv, current_question_number);
    nextBtn.setAttribute('disabled', true);
    showResultPage(current_question_number);
});

restartBtn.addEventListener('click', function() {
    resultPage.classList.add('hide-pages');
    initializeQuiz();
});

quitBtn.addEventListener('click', function() {
    current_question_number = 0;
    CURRENT_SCORE= 0;
    TOTAL_SCORE = INCREMENT_SCORE_BY * questions.length;
    quizPage.classList.add('hide-pages');
    resultPage.classList.add('hide-pages');
    startPage.classList.remove('hide-pages');
});

function shuffleArray(array) {
   return array.sort(()=>{ return Math.random() - 0.5;});
}

function showProgress(element, number){
    element.style.width = `${number / questions.length * 100}%`;

}

function showQuestionCount(element, number){
    if(number > questions.length -1){return;}
    element.innerText = questions.indexOf(questions[number]) + 1;
}

function showQuestion(element, number){
    if(number < questions.length){
        element.innerText = questions[number].question;
    }
    return;
}

function showOptions(element, number){
    if(number > questions.length){return;}
    let {question, answer, ...options} = questions[number];

   let newOptions = "";
   shuffleArray(Object.keys(options)).forEach(choice => {
     newOptions +=`<li>${options[choice]}</li>`;
   });
   element.innerHTML = newOptions;
}

function checkAnswer(answer, optionValue, element, optionList){
    if(answer.toLowerCase() == optionValue.toLowerCase() ){
        element.classList.add('correct');
        CURRENT_SCORE += INCREMENT_SCORE_BY;
     }else{
        element.classList.add('incorrect');
        optionList.forEach((li) => {
            if(li.innerText.toLowerCase()  == answer.toLowerCase()){
                li.classList.add('correct');
            }
         });
         
    }
    nextBtn.removeAttribute('disabled');
}

function showResultPage(current_question_number) {
    if(current_question_number > questions.length){
        current_question_number=  questions.length;
        quizPage.classList.add('hide-pages');
        resultPage.classList.remove('hide-pages');
        resultPage.querySelector('.score').innerText= CURRENT_SCORE;
        resultPage.querySelector('.total_score').innerText = TOTAL_SCORE;
    }
}





