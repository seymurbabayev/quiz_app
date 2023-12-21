const questions = [
    {
        question: "What does the acronym 'DOM' stand for in JavaScript?",
        options: [
            "A) Document Object Model",
            "B) Data Object Model",
            "C) Dynamic Object Model",
            "D) Document Oriented Model",
        ],
        answer: "A) Document Object Model",
    },
    {
        question: "Which keyword is used to declare variables in JavaScript?",
        options: ["A) var", "B) let", "C) const", "D) all of the above"],
        answer: "D) all of the above",
    },
    {
        question: "What is the purpose of the setTimeout function in JavaScript?",
        options: [
            "A) To set a time delay before executing a function",
            "B) To repeat a function at regular intervals",
            "C) To define a callback function",
            "D) To declare a constant timeout value",
        ],
        answer: "A) To set a time delay before executing a function",
    },
    {
        question: "Which of the following is not a valid way to create a function in JavaScript?",
        options: [
            "A) function myFunction() {}",
            "B) var myFunction = function() {};",
            "C) () => {}",
            "D) function = myFunction() {}",
        ],
        answer: "D) function = myFunction() {}",
    },
    {
        question: "What does the 'NaN' value represent in JavaScript?",
        options: ["A) Not a Null", "B) Not a Number", "C) No Action Needed", "D) No Argument Necessary"],
        answer: "B) Not a Number",
    },
    {
        question: "What is the purpose of the === operator in JavaScript?",
        options: ["A) Assignment", "B) Strict Equality", "C) Type Coercion", "D) Logical AND"],
        answer: "B) Strict Equality",
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: ["A) push()", "B) pop()", "C) shift()", "D) unshift()"],
        answer: "A) push()",
    },
];

class QuestionGame {
    point = 0;
    nextQuestionIndex = -1;
    qData = [];
    currentQuestion = null;
    questionWeight = null;

    constructor(data) {
        this.qData = data;
        this.questionWeight = Math.round(100 / this.qData.length)
    }

    incrementPoint() {
        console.log(this.point);
        console.log(this.questionWeight);
        this.point += this.questionWeight
    }

    nextQuestion() {
        if (this.nextQuestionIndex == this.qData.length - 1) {
            console.log("the end");
            progressBar.style.width = '100%';
            gameOver()
            return false;
        } else {
            this.nextQuestionIndex += 1;
            const questionItem = this.qData[this.nextQuestionIndex];
            this.currentQuestion = questionItem;
            return questionItem;
        }
    }
}

const game = new QuestionGame(questions);

const pointEl = document.querySelector("#pointEl");
const progressBar = document.querySelector("#progressBar");
const qTitle = document.querySelector("#qTitle");
const btnGroup = document.querySelector("#btnGroup");
let barWidth = 0;

function startGame() {
    game.nextQuestion();

    const qObj = game.currentQuestion; 
    qTitle.innerHTML = (game.nextQuestionIndex + 1) + '. ' + qObj.question;
    const btnOptions = qObj.options
        .map(
            (option) => `
        <button class="btn btn-outline-light" onclick="evaluateAnswers('${option}')">${option}</button>
    `
        )
        .join("");
    btnGroup.innerHTML = btnOptions;
}

startGame();

function evaluateAnswers(userOption){
    const correctAnswer = game.currentQuestion.answer;
    const buttons = document.querySelectorAll('#btnGroup button')
    
    
    buttons.forEach(button => {
        const option = button.innerText;
        if(option === userOption){
            button.classList.remove('btn-outline-light')
            if(userOption === correctAnswer){
                button.classList.add('bg-success')
                game.incrementPoint()
                pointEl.innerHTML = game.point;
            } else {
                button.classList.add('bg-danger')
                
                buttons.forEach(button => {
                    if(button.innerText === correctAnswer) {
                        button.classList.add('bg-success');
                    }
                })
            }
        }
    })
    barWidth += game.questionWeight;
    progressBar.style.width = barWidth + '%'
    setTimeout(startGame, 1000)
}

function gameOver() {
    const game_over = document.querySelector('#game_over')
    const questions_block = document.querySelector('#questions_block')

    questions_block.classList.add('d-none');
    game_over.classList.remove('d-none');
    game_over.classList.add('d-block');
}


