console.log("linked");
//this time, let's try one big object
var game = {

  //questions with answers
  questions: [
    question1 = {
      questionText: "What is your name?",
      answers: [
        "something",
        "something else",
        "not something",
        "something else else",
      ],
      rightAnswer: "not something"
    },
    question2 = {
      questionText: "What is your quest?",
      answers: [
        "not something",
        "something",
        "something else",
        "something else else",
      ],
      rightAnswer: "not something"
    },
    question3 = {
      questionText: "What is the airspeed velocity of an unlaiden swallow?",
      answers: [
        "something",
        "something else",
        "something else else",
        "not something",
      ],
      rightAnswer: "not something"
    }

  ],

  x: 0,

  correct: 0,

  wrong: 0,

  //something that populates the html with the question
  askQuestions: function(){
    var questionInPlay = this.questions[this.x].questionText;
    console.log(questionInPlay);
    $("#question-text").html(questionInPlay);
  },

  //something that populates the html with the answers
  generateAnswers: function(){
    var answerArray = this.questions[this.x].answers;
    console.log(answerArray);
    for (i = 0; i < answerArray.length; i++){
      $("#answer"+i).html(answerArray[i]);
    }
    $(".answer").css("background-color", "inherit");
  },

  showTimer: function(){
  	$("#timer").css("display", "block");
  },

  //show the right answer regardless of what the user chooses
  showCorrectAnswer: function(){
		$(".answer:contains("+this.questions[this.x].rightAnswer+")").css("background-color", "#6fff43");
  },

  //define what happens when they choose the correct answer
  correctAnswer: function(){
  	console.log("correct");
  	$("#question-text").html("Correct!");
  	this.correct++;  	
  },

  //define what happens when they choose the wrong answer
  wrongAnswer: function(){
		console.log("wrong");
  	$("#question-text").html("Wrong!");
  	this.wrong++;
  },

  //something that increments the index of whichever question is in play
  xCounter: function(){
    if(this.x == this.questions.length - 1){
      this.x = 0;
    } else{
      this.x++;
    }
  }

}

//what happens when you click the question bar
$("#question-text").click(function(){
  game.askQuestions();
  game.generateAnswers();
  game.showTimer();
  game.xCounter();
})

//what happens when you click any answer
$(".answer").click(function(){
  game.xCounter();
	game.showCorrectAnswer();
	if($(this).html() == game.questions[game.x].rightAnswer){
		game.correctAnswer();
	} else{
		game.wrongAnswer();
	}
});

var time = 30;

function createTimer(){
	setTimeout(function(){time--}, 1000);
	$("#timer-count").html(time);
}

createTimer();