
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

  //index of whichever question is in play
  x: 0,

  //correct guesses
  correct: 0,

  //wrong guesses
  wrong: 0,

  //something that populates the html with the question
  askQuestions: function(e){
  	clearTimeout(timer);
    var questionInPlay = this.questions[e].questionText;
    $("#question-text").html(questionInPlay);
    this.generateAnswers(e);
    time = 10;
		$("#timer-count").html(time);
    createTimer();
		if(time <= 0){
			this.wrongAnswer();
		}
  },

  //something that populates the html with the answers
  generateAnswers: function(e){
    var answerArray = this.questions[e].answers;
    for (i = 0; i < answerArray.length; i++){
      $("#answer"+i).html(answerArray[i]);
    }
    $(".answer").css("background-color", "inherit");
  },

  //ask the first question and show the timer
  initializeGame: function(){
  	this.askQuestions(0);
  	$("#timer").css("display", "block");
  },

  //show the right answer regardless of what the user chooses
  showCorrectAnswer: function(){
		$(".answer:contains("+this.questions[this.x].rightAnswer+")").css("background-color", "#6fff43");
		clearTimeout(timer);
		time = 3;
		$("#timer-count").html(time);
		createTimer();
		if(time <= 0){
			this.askQuestions(this.x);
		}
  },

  //define what happens when they choose the correct answer
  correctAnswer: function(){
  	console.log("correct");
  	$("#question-text").html("Correct!");
  	this.correct++;
	  this.xCounter();
		this.showCorrectAnswer();
  },

  //define what happens when they choose the wrong answer
  wrongAnswer: function(){
		console.log("wrong");
  	$("#question-text").html("Wrong!");
  	this.wrong++;
	  this.xCounter();
		this.showCorrectAnswer();
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
  game.initializeGame();
})

//what happens when you click any answer
$(".answer").click(function(){
	if($(this).html() == game.questions[game.x].rightAnswer){
		game.correctAnswer();
	} else {
		game.wrongAnswer();
	}
});

var time;

var timer;

function createTimer(){
	timer = setTimeout(function(){
		time--;
		$("#timer-count").html(time);
		createTimer();
	}, 1000);
}
