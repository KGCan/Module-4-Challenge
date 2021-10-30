const startButton = document.getElementById ('start-btn')
const nextButton = document.getElementById ('next-btn')
const questionBoxElement =document.getElementById ('questionbox')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startQuiz() {
  console.log('Started')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionBoxElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetQuestion()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', chooseAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetQuestion() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function chooseAnswer (e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex +1) {nextButton.classList.remove('hide')
} else {
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
}
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  } 
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

const questions = [
  {
    question: 'Question 1?',
    answers: [
      { text: 'correct', correct: true },
      { text: 'incorrect', correct: false},
      { text: 'incorrect2', correct: false },
      { text: 'incorrect3', correct: false},
    ]
  }
]


//Quiz Timer//
//var count = 15;
//var timer = setInterval(function() {
  //console.log(count);
  //count--;
  //if(count === 0) {
    //stopInterval()
  //}
//}, 1000);

//var stopInterval = function() {
  //console.log('time is up!');
  //clearInterval(timer);
//}