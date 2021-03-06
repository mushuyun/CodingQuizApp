
//set up variables*/
var startBtn = document.getElementById("start-btn");
var quizContainer = document.getElementById("quiz-container");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var correct = document.getElementById("correct");
var submitBtn= document.getElementById("submit-btn");
var highScoreContainer = document.getElementById("highScore-container");
var goBackBtn = document.getElementById("goBack-btn");
var scoreContainer = document.getElementById("scoreContainer")
var clearHighScoreBtn = document.getElementById("clearHighScore-btn");
var timer = document.getElementById("timer");

/*create questions*/
var questions = [
    {
        question : "A very useful tool used during development and debugging for printing content to the debugger is:",
        choiceA: "JavaScript",
        choiceB: "Terminal",
        choiceC: "for loop",
        choiceD: "console.log",
        correct: "D"
    },
    {
        question: "What does CSS stand for?",
        choiceA: "JavaScript",
        choiceB: "Terminal",
        choiceC: "for loop",
        choiceD: "Cascading Style Sheets",
        correct: "D"
    },
    {
        question : "String value must be included within____when being assigned to variables",
        choiceA: "commas",
        choiceB: "curly brackets",
        choiceC: "quotations",
        choiceD: "prentices",
        correct: "C"
    },
    {
        question : "Arrays is javascript can be used to store:",
        choiceA: "numbers and strings",
        choiceB: "other arrays",
        choiceC: "box",
        choiceD: "all of the above",
        correct: "A"
    }, 
    {
        question : "The condition in an if/else statement is enclose within____",
        choiceA: "quotes",
        choiceB: "curly brackets",
        choiceC: "prentices",
        choiceD: "square brackets",
        correct: "B"
    }
];

//set variables

var count=15;
var lastQuestionIndex = questions.length-1;
var runningQuestionIndex = 0;
var questionTime =15;
var TIMER;
var score = 0;
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime;


startBtn.addEventListener("click",startQuiz);
submitBtn.addEventListener("click",submit);
goBackBtn.addEventListener("click", function(){
    startBtn.style.display="block";
    highScoreContainer.style.display="none";
});
clearHighScoreBtn.addEventListener("click",clear);

// start quiz
function startQuiz(){
    runningQuestionIndex = 0;  
    count = 15;
    score = 0;  
    comment.innerText="";
    startBtn.style.display = "none";
    renderQuestion();
    timer.style.display="block";
    quizContainer.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1500); // 1000ms = 1s
}   
  // render question
function renderQuestion(){
    var q = questions[runningQuestionIndex];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML=  q.choiceA;
    choiceB.innerHTML = q.choiceB; 
    choiceC.innerHTML = q.choiceC; 
    choiceD.innerHTML = q.choiceD;
    correct.innerHTML = q.correct
}

//check answer
function checkAnswer(answer){
    var q = questions[runningQuestionIndex];
  
   if( answer == q.correct) {
       score = score + 20;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }

    if(runningQuestionIndex < lastQuestionIndex){
        runningQuestionIndex++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreDisplay();
    }
}

var comment = document.createElement("P");
comment.setAttribute("style", "font-weight:bold;");

function answerIsCorrect(answer){           
    comment.innerText = "Correct!";              
    document.getElementById("quiz-container").appendChild(comment);
}

function answerIsWrong(answer){         
    comment.innerText = "Wrong, deduct 5 seconds!"; 
    count= count - 5;             
    document.getElementById("quiz-container").appendChild(comment);
}
   
//render counter
function renderCounter(){        
        if(count > 0){
            count--;
            counter.innerHTML = count;  
            timeGauge.style.width = count * gaugeUnit + "px";    
            }else {
                clearInterval(TIMER);
                scoreDisplay();
            }
    }

//load score page
function scoreDisplay(){
    quizContainer.style.display="none";
    scoreContainer.style.display = "block";  
    document.getElementById("score").innerHTML = score;
    return "Your final score is: " + score;
    }

function submit(){
    scoreContainer.style.display = "none";
    highScoreContainer.style.display = "block";
    timer.style.display="none";
    var initial = document.getElementById("initial");
    localStorage.setItem("initial", initial.value);
    localStorage.setItem("score", JSON.stringify(score));
    highScoreDisplay();
}

//load highScore page
function highScoreDisplay(){
    var name = document.getElementById("name");
    var initial = document.getElementById("initial");
    var highScore = document.getElementById("highScore");
    name.innerText = localStorage.getItem("initial");
    highScore.innerText = localStorage.getItem("score");   
    }

//storage
function clear(){
    var name = document.getElementById("name");
    var initial = document.getElementById("initial");
    var highScore = document.getElementById("highScore");
        localStorage.clear();
        highScore.innerText="";
        name.innerText="";
        initial.value="";
}




    