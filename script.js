class Question {
    static lastId = 0;

    Name = "";
    #correctAnswer = "";
    option1 = "";
    option2 = "";
    option3 = "";
    option4 = "";

    isFinish = false;

    constructor() {
        this.id = ++Question.lastId;
    }

    setAnswer(answer) {
        this.#correctAnswer = answer;
    }

    display() {
        console.log(`Q${this.id}: ${this.Name}`);
        console.log("A) " + this.option1);
        console.log("B) " + this.option2);
        console.log("C) " + this.option3);
        console.log("D) " + this.option4);
    }

    checkAnswer(providedAnswer) {
        return providedAnswer === this.#correctAnswer;
    }
}

const q1 = new Question();
q1.Name = "What is the capital of Nepal?";
q1.option1 = "Kathmandu";
q1.option2 = "Pokhara";
q1.option3 = "Biratnagar";
q1.option4 = "Lalitpur";
q1.setAnswer("Kathmandu");

const q2 = new Question();
q2.Name = "Which mountain is the highest peak in Nepal and the world?";
q2.option1 = "K2";
q2.option2 = "Lhotse";
q2.option3 = "Kangchenjunga";
q2.option4 = "Mount Everest";
q2.setAnswer("Mount Everest");

const q3 = new Question();
q3.Name = "Who was the first elected Prime Minister of Nepal?";
q3.option1 = "B.P. Koirala";
q3.option2 = "Girija Prasad Koirala";
q3.option3 = "Pushpa Kamal Dahal";
q3.option4 = "King Mahendra";
q3.setAnswer("B.P. Koirala");

const q4 = new Question();
q4.Name = "Which river is the longest in Nepal?";
q4.option1 = "Gandaki";
q4.option2 = "Koshi";
q4.option3 = "Karnali";
q4.option4 = "Bagmati";
q4.setAnswer("Karnali");

const q5 = new Question();
q5.Name = "What is the currency of Nepal?";
q5.option1 = "Rupee";
q5.option2 = "Dollar";
q5.option3 = "Yen";
q5.option4 = "Taka";
q5.setAnswer("Rupee");

const AllQuestions = [q1, q2, q3, q4, q5];
let count = 0;
let selectedAnswer = "";
let Total = AllQuestions.length;
let Marks = 0;
let intervalId;
let Timer = 15;
function handleInterval() {
    intervalId = setInterval(CountIncrement, 1000);
}


const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const quizBox = document.getElementById("quiz-container");
const Quiz = document.getElementById("Quiz");
const ProgressBar = document.getElementById("progress-bar");
const ResultBox = document.getElementById("Result-Box");
const Counter = document.getElementById("timecounter");


const buttons = document.querySelectorAll(".option-btn");
const QuestionAsked = document.getElementById("question");

QuestionAsked.innerText = AllQuestions[count].Name;
option1.innerText = AllQuestions[count].option1;
option2.innerText = AllQuestions[count].option2;
option3.innerText = AllQuestions[count].option3;
option4.innerText = AllQuestions[count].option4;

function QuestionChange() {
    QuestionAsked.innerText = AllQuestions[count].Name;
    option1.innerText = AllQuestions[count].option1;
    option2.innerText = AllQuestions[count].option2;
    option3.innerText = AllQuestions[count].option3;
    option4.innerText = AllQuestions[count].option4;
}

startTimer();

quizBox.addEventListener('submit', function (event) {
    event.preventDefault();
    if (selectedAnswer !== "") {
        if (AllQuestions[count].checkAnswer(selectedAnswer)) {
            Marks++;
        }
        StopInterval();
        Timer = 15;
        Submit();
    }

});


function startTimer() {
    Counter.innerText = `${Timer}`;
    handleInterval();
    console.log(Number(Timer));
}


function CountIncrement() {
    let total = 15;
    if (Timer >= 0) {
        Counter.innerText = `${Timer--}`;
    }
    else {
        Counter.innerText = "Times Up";
        StopInterval();
        Timer = 15;
        Submit();
    }
}


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove "selected" from all buttons
        buttons.forEach(b => b.classList.remove("selected"));
        console.log("button clicked");
        // Add "selected" to the clicked button
        btn.classList.add("selected");
        selectedAnswer = btn.innerText;
        console.log(selectedAnswer);
    });
});



function Submit() {
    count++;
    let progress = ((count + 1) / Total) * 100;
    quizBox.style.display = "none"
    document.getElementById('loader').style.display = "block";
    ProgressBar.style.width = `${progress}%`;
    if (count === Total) {
        quizBox.style.display = "none"
        let result = document.createElement("h2");
        result.innerText = `${Marks}/${Total}  ✊ `;
        ResultBox.appendChild(result);
        setTimeout(() => {
            selectedAnswer = "";
            ResultBox.style.display = "block";
            document.getElementById('loader').style.display = "none";
        }, 1000);
    } else {
        buttons.forEach(b => b.classList.remove("selected"));
        setTimeout(() => {
            QuestionChange();
            selectedAnswer = "";
            document.getElementById('loader').style.display = "none";
            quizBox.style.display = "block";
        }, 1000);
        startTimer();
    }
}


function StopInterval() {
    clearInterval(intervalId);
}