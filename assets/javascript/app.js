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
    $(".radio").css("display", "block");
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

$("#submit").click(function(){
  game.askQuestions();
  game.generateAnswers();
  game.xCounter();
})
