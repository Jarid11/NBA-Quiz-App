"use strict";

let questionNumber = 0;
let score = 0;
let numQuestions = STORE.length;


//generate Questions. With all answers by calling promptAnswers()
function generateQuestions() {
   if(questionNumber < numQuestions) {
      $("main").html(`
        <div class="questionAnswerForm"></div>
          <div class="questionForm">
            <h2>${STORE[questionNumber].question}</h2>
            <form>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
            <span>${STORE[questionNumber].answers[0]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
            <span>${STORE[questionNumber].answers[1]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
            <span>${STORE[questionNumber].answers[2]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
            <span>${STORE[questionNumber].answers[3]}</span>
            </label>
            <button type="submit" id="submitButton">Submit</button>
            </form>
          </div>
        </div>
      `);
    }
}

function finishGame(score) {
  if(questionNumber < numQuestions-1) {
  } else if (score >= 8) {
      $("main").html(`
        <div class="questionForm">
          <h1>You know NBA history and your a baller!</h1>
          <button type="button" id="playAgainButton">Play Again</button>
        </div>
      `);
      resetGame();
    } else if (score >= 6) {
      $("main").html(`
        <div class="questionForm">
          <h1>You did well, you might be able to ace this quiz next time!</h1>
          <button type="button" id="playAgainButton">Play Again</button>
        </div>
      `);
      resetGame();
    } else {
      $("main").html(`
        <div class="questionForm">
          <h1>Maybe get some snacks and watch some NBA before next time</h1>
          <button type="button" id="playAgainButton">Play Again</button>
        </div>
      `);
      resetGame();
    }
}

//resets game
function resetGame() {
  $("main").on("click", "#playAgainButton", function() {
      $("ul").html(`
        <li>Question: <span class="questionNumber">0</span>/10</li>
        <li>Score: <span class="score">0</span>/10</li>
      `);
      $("main").html(`
        <div class="questionAnswerForm">
            <h1>You ready to test your NBA knowledge?</h1>
            <button type="button" id="startButton">Let's go!</button>
        </div>
      `);
      score = 0;
      questionNumber = 0;
  });
}


//checks users answer to determine if right or wrong when answer submitted
function userSelectAnswer () {
  $("form").on("submit", function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      increaseScore();
      showCorrectAnswer();
    } else {
      showWrongAnswer();
    }
  });
    finishGame(score);
}

//show correct answer
function showCorrectAnswer() {
  $("main").html(`
    <div class="questionForm">
      <h2>Your are correct!</h2>
      <img src="${STORE[questionNumber].icon}" class="rightAnswerPic"</img>
      <button type="button" id="nextButton">${ questionNumber < numQuestions-1 ? "Next" : "Finish"}</button>
    </div>
  `);
}

function showWrongAnswer() {
  $("main").html(`
    <div class="questionForm">
      <h2>The correct answer is : <span>${STORE[questionNumber].correctAnswer}</span></h2>
      <img src="https://heavyeditorial.files.wordpress.com/2017/06/gettyimages-693604194.jpg?quality=65&strip=all&w=780&strip=all" class="wrongAnswerPic"</img>
      <button type="button" id="nextButton">${ questionNumber < numQuestions-1 ? "Next" : "Finish"}</button>
    </div>
  `);
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
// function startQuiz () {
//   $('main').on('click', '#startButton', function (event) {
//     $('.quizStart').remove();
//     $('.questionAnswerForm').css('display', 'block');
//     $('.questionNumber').text(1);
// });
// }

//when start button clicked show questions and answers
$("main").on("click", "#startButton", function() {
  generateQuestions();
  userSelectAnswer();
  $(".questionNumber").text(questionNumber+1);
});

//when next button clicked increase questionNumber before calling generateQuestion.
$("main").on("click", "#nextButton", function() {
  increaseQuestionNum();
  generateQuestions();
  userSelectAnswer();
});

//increase question number
function increaseQuestionNum() {
  if (questionNumber < numQuestions-1) {
    questionNumber++;
  }
  $(".questionNumber").text(questionNumber+1);
}

//increase score of quiz
function increaseScore() {
  score++;
  $(".score").text(score);
}
