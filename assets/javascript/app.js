//this time, let's try one big object

var game = {

	//questions with answers, I apologize in advance if I forget to replace these placeholders with actual questions and answers, my original plan was to use an api I found online that generates questions and answers for you, but I ran out of time
	questions: [
		question0 = {
			questionText: "What is your name?",
			answers: [
				"something",
				"something else",
				"not something",
				"something else else",
			],
			rightAnswer: "not something"
		},
		question1 = {
			questionText: "What is your quest?",
			answers: [
				"not something",
				"something",
				"something else",
				"something else else",
			],
			rightAnswer: "not something"
		},
		question2 = {
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

	//ask the first question and show the timer, there is an edge case where a user can click this any time to restart the game, and doing so will reset their stats back to 0, so it kinda ends up being a feature as well
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
	wrongAnswer: function(message) {
		console.log(message);
		$("#question-text").html(message);
		this.wrong++;
		this.showCorrectAnswer();
	},

	//this shows up after the final question
	endGame: function() {
		clearTimeout(timer);
		$("#question-text").html("Click me to start over!");
		$("#answer0").html("Game Over");
		$("#answer1").html("Correct: " + this.correct);
		$("#answer2").html("Wrong or didn't answer: " + this.wrong);
		$("#answer3").html("");
	},

	//something that increments the index of whichever question is in play
	xCounter: function() {
		this.x++;
	}

}

//this is as far as I was able to get in making one big object for my game, I learned a lot about objects in the process, but my timer functions and my click functions needed to exist outside of the object

//what happens when you click the question bar
$("#question-text").click(function() {
	game.initializeGame();
})

//what happens when you click any answer, the bug where a user can click an answer multiple times to rack up points (correct or wrong) still exists, my attempt to get around it is to have only 1 second where the answer is shown
$(".answer").click(function() {
	if ($(this).html() == game.questions[game.x].rightAnswer) {
		game.correctAnswer();
	} else {
		game.wrongAnswer("Wrong!");
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
			game.wrongAnswer("Time's up!");
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