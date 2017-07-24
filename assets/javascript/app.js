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
	askQuestions: function() {
		clearTimeout(timer);
		var questionInPlay = this.questions[this.x].questionText;
		$("#question-text").html(questionInPlay);
		this.generateAnswers(this.x);
		time = 10;
		$("#timer-count").html(time);
		createTimer1();
	},

	//something that populates the html with the answers
	generateAnswers: function(j) {
		var answerArray = this.questions[j].answers;
		for (i = 0; i < answerArray.length; i++) {
			$("#answer" + i).html(answerArray[i]);
		}
		$(".answer").css("background-color", "inherit");
		$(".answer").hover(
			function() { $(this).css("background-color", "#acf9ff") },
			function() { $(this).css("background-color", "inherit") }
		);
	},

	//ask the first question and show the timer
	initializeGame: function() {
		this.correct = 0;
		this.wrong = 0;
		this.x = 0
		this.askQuestions();
		$("#timer").css("display", "block");
	},

	//show the right answer regardless of what the user chooses
	showCorrectAnswer: function() {
		$(".answer:contains(" + this.questions[this.x].rightAnswer + ")").css("background-color", "#6fff43");
		clearTimeout(timer);
		time = 1;
		$("#timer-count").html(time);
		//it took a while to figure out where to place this counter
		this.xCounter();
		createTimer2();
	},

	//define what happens when they choose the correct answer
	correctAnswer: function() {
		console.log("correct");
		$("#question-text").html("Correct!");
		this.correct++;
		this.showCorrectAnswer();
	},

	//define what happens when they choose the wrong answer
	wrongAnswer: function() {
		console.log("wrong");
		$("#question-text").html("Wrong!");
		this.wrong++;
		this.showCorrectAnswer();
	},

	endGame: function() {
		clearTimeout(timer);
		$("#question-text").html("Game Over");
		$("#answer0").html("Correct: " + this.correct);
		$("#answer1").html("Wrong or didn't answer: " + this.wrong);
		$("#answer2").html("");
		$("#answer3").html("");
	},

	//something that increments the index of whichever question is in play
	xCounter: function() {
		this.x++;
	}

}

//what happens when you click the question bar
$("#question-text").click(function() {
	game.initializeGame();
})

//what happens when you click any answer
$(".answer").click(function() {
	if ($(this).html() == game.questions[game.x].rightAnswer) {
		game.correctAnswer();
	} else {
		game.wrongAnswer();
	}
});


//call time variable
var time;

//call variable for settimeout function so that we can clear it later
var timer;

//I ended up having to create two different timer functions

//this first on is specifically just for counting down while the question is waiting to be answered
function createTimer1() {
	timer = setTimeout(function() {
		time--;
		$("#timer-count").html(time);
		createTimer1();
		if (time <= 0) {
			game.wrongAnswer();
		}
	}, 1000);
}

//this second one is specifically for when an answer is either chosen or the first timer runs out
function createTimer2() {
	timer = setTimeout(function() {
		time--;
		$("#timer-count").html(time);
		createTimer2();
		if (time <= 0) {
			if (game.x == game.questions.length) {
				game.endGame();
			} else {
				game.askQuestions(game.x);
			}
		}
	}, 1000);
}