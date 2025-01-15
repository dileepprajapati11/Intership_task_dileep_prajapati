// Sample Questions
const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
  { question: "Which programming language is used for web development?", options: ["Python", "C++", "JavaScript", "Java"], correct: 2 },
  { question: "Which HTML tag is used to display an image?", options: ["<img>", "<div>", "<p>", "<link>"], correct: 0 },
  { question: "Which CSS property controls text size?", options: ["font-size", "color", "background", "margin"], correct: 0 },
  { question: "Which company developed JavaScript?", options: ["Microsoft", "Apple", "Netscape", "Google"], correct: 2 }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startPage = document.getElementById("start-page");
const rulesPage = document.getElementById("rules-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");

const startBtn = document.getElementById("start-btn");
const exitBtn = document.getElementById("exit-btn");
const continueBtn = document.getElementById("continue-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const replayBtn = document.getElementById("replay-btn");
const quitBtn = document.getElementById("quit-btn");

const questionTitle = document.getElementById("question-title");
const optionsContainer = document.getElementById("options-container");
const finalScoreElement = document.getElementById("final-score");

// Event Listeners
startBtn.onclick = () => {
  startPage.classList.add("hidden");
  rulesPage.classList.remove("hidden");
};

exitBtn.onclick = () => {
  rulesPage.classList.add("hidden");
  startPage.classList.remove("hidden");
};

continueBtn.onclick = () => {
  rulesPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  loadQuestion();
};

nextBtn.onclick = () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    displayResult();
  }
};

prevBtn.onclick = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
};

replayBtn.onclick = resetQuiz;
quitBtn.onclick = () => {
  resultPage.classList.add("hidden");
  startPage.classList.remove("hidden");
};

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.innerText = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.className = "btn btn-outline-primary d-block mb-2";
    optionButton.innerText = option;
    optionButton.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(optionButton);
  });
}

function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    score++;
  }
}

function displayResult() {
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");
  finalScoreElement.innerText = `${score} / ${questions.length}`;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  loadQuestion();
}
