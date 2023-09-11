const startPage = document.querySelector('.start_page');
const quizPage = document.querySelector('.quiz_page');
const resultPage = document.querySelector('.result_page');
const leaderBoardPage = document.querySelector('.leader_board');

const startQuizBtn = document.querySelector('.start_btn');

const currentQ = document.querySelector('.current');
const totaltQ = document.querySelector('.total');
const progress = document.querySelector('.progress-bar .progress');
const questionDiv = document.querySelector('.question');
let optionsDiv = document.querySelector('.options');
const nextBtn = document.querySelector('.quiz_page .next_btn')



const questions = [];

const INCREMENT_SCORE_BY = 10;
let TOTAL_SCORE = 0;

let current_question_number = 0,
CURRENT_SCORE = 0;


// document.addEventListener('load',)
function fetchQuestions(){
    fetch("./js/question.json", {mode:"no-cors"}).then((response )=>{
        return response.json();
    }).then((data) => {
       questions.push(...data)
        TOTAL_SCORE = INCREMENT_SCORE_BY * questions.length;
    })
}
fetchQuestions()





startQuizBtn.addEventListener('click', initializeQuiz)

async function initializeQuiz(){
    console.log(TOTAL_SCORE);
    startPage.classList.add('hide-pages');
    quizPage.classList.remove('hide-pages');
        
    showQuestionCount(currentQ, current_question_number)

    totaltQ.innerText = questions.length;

    showProgress(progress, current_question_number);

    showQuestion(questionDiv, current_question_number);

    showOptions(optionsDiv, current_question_number);

    optionsDiv.addEventListener('click', function(e){
        if (e.currentTarget.getAttribute('disabled') === 'true') { return; }

        const  element = e.target;
        let optionList = optionsDiv.querySelectorAll('li');
        
        if(element.tagName === "LI"){
           let optionValue = e.target.getAttribute('dataSet');
          let answer = questions[current_question_number].answer;
      
          optionsDiv.setAttribute('disabled', true); 

          checkAnswer(answer, optionValue, element, optionList);
  

        }
    })

    nextBtn.addEventListener('click', function () {
        current_question_number++
        optionsDiv.removeAttribute('disabled');
        showQuestionCount(currentQ, current_question_number);
        showProgress(progress, current_question_number);
        showQuestion(questionDiv, current_question_number);
        showOptions(optionsDiv, current_question_number);
        nextBtn.setAttribute('disabled', true);
        showResultPage(current_question_number);
    })
   
}

function showProgress(element, number){
    element.style.width = `${number / questions.length * 100}%`

}

function showQuestionCount(element, number){
    if(number > questions.length -1){return}
    element.innerText = questions.indexOf(questions[number]) + 1;
}

function showQuestion(element, number){
    if(number < questions.length){
        element.innerText = questions[number].question
    }
    return;
}

function showOptions(element, number){
    if(number > questions.length -1){return}
    let {question, answer, ...options} = questions[number];

   let newOptions = "";
   let num =1;
   Object.keys(options).forEach(choice => {
     newOptions +=`<li  dataSet=${num++}>${options[choice]}</li>`
   });
   element.innerHTML = newOptions;
}


function checkAnswer(answer, optionValue, element, optionList){
    if(answer === Number(optionValue)){
        element.classList.add('correct');
        CURRENT_SCORE += INCREMENT_SCORE_BY;
        console.log(CURRENT_SCORE);
     }else{
        element.classList.add('incorrect');
        optionList.forEach((li) => {
            if(Number(li.getAttribute('dataSet')) === answer){
                li.classList.add('correct')
            }
         });
         
    }
    nextBtn.removeAttribute('disabled');
}

function showResultPage(current_question_number) {
    if(current_question_number >= questions.length -1){
        current_question_number= 0;
        quizPage.classList.add('hide-pages');
        resultPage.classList.remove('hide-pages');

        resultPage.querySelector('.score').innerText= CURRENT_SCORE;
        resultPage.querySelector('.total_score').innerText = TOTAL_SCORE;
    }
}



