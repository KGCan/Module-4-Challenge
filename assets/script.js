const startButton = document.getElementById ('start-btn')
const nextButton = document.getElementById ('next-btn')
const questionBoxElement =document.getElementById ('questionbox')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");

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
    element.classList.add('correct');
  } else {
    element.classList.add('incorrect');
  } 
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

function storeHighScores(event) {
  event.preventDefault();
  if (initialInput.value === "") {
    alert("Please enter your initials!");
    return;
  }
}

const questions = [
  {
    question: 'What is JavaScript?',
    answers: [
      { text: 'A text-based programming language used to make web pages interactive', correct: true },
      { text: 'A text-based programming language used to give structure to web pages', correct: false},
      { text: 'A text-based programming language used to style web pages', correct: false },
      { text: 'A coffee order at Dutch Bros', correct: false},
    ]
  },
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<js>', correct: false },
      { text: '<scripting>', correct: false},
      { text: '<script>', correct: true },
      { text: '<javascript', correct: false},
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box using JavaScript?',
    answers: [
      { text: 'alertBox ("Hello World");', correct: false },
      { text: 'msgBox("Hello World");', correct: false},
      { text: 'msg("Hello World");', correct: false },
      { text: 'alert("Hello World");', correct: true},
    ]
  },
  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      { text: 'function:myFunction()', correct: false },
      { text: 'function myFunction()', correct: true},
      { text: 'function = myFunction()', correct: false },
      { text: 'function/myFunction()', correct: false},
    ]
  },
  {
    question: 'How can you add a comment in JavaScript?',
    answers: [
      { text: '<!--This is a comment-->', correct: false },
      { text: '?This is a comment', correct: false},
      { text: '//This is a comment', correct: true },
      { text: '.This is a comment', correct: false},
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