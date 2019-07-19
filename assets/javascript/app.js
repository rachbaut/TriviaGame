var card = $("#quiz-area");

// Questions 
var questions = [
  {
    question: "Who was in the Battle of the Bastards?",
    answers: ["Reek", "Ramsay", "Tyrion", "Bran"],
    correctAnswer: "Ramsay"
  },
  {
    question: "Who poisoned King Joffrey?",
    answers: ["Margaery", "Sansa", "Tyrion", "Olenna"],
    correctAnswer: "Olenna"
  },
  {
    question: "Which place did Arya Stark go to meet Jaqen?",
    answers: ["Winterfell", "Highgarden", "Meereen", "Braavos"],
    correctAnswer: "Braavos"
  },
  {
    question: "Who does Tormund fancy?",
    answers: ["Brienne", "Sansa", "Gilly", "The Giant"],
    correctAnswer: "Brienne"
  },
  {
    question: "Which of Cersei's children dies first?",
    answers: ["Tommen", "Myrcella", "The one in her belly", "Joffrey"],
    correctAnswer: "Joffrey"
  },
  {
    question: "When did Daenery's dragons hatch?",
    answers: ["End of Season 1", "Beginning of Season 2", "Middle of Season 2", "Middle of Season 1"],
    correctAnswer: "End of Season 1"
  },
  {
    question: "What man loved Daenerys but she always friendzoned him?",
    answers: ["Daario", "Jon", "Jorah", "Khal Drogo"],
    correctAnswer: "Jorah"
  },
  {
    question: "How was the Knight King created?",
    answers: ["Children of the Forest", "Dark Magic", "The Cold", "Hunger"],
    correctAnswer: "Children of the Forest"
  },
  {
    question: "Which dragon was revived by the Knight King?",
    answers: ["Drogon", "Viserion", "Rhaegal", "Balerion"],
    correctAnswer: "Viserion"
  },
  {
    question: "Who did Daenerys Targaryen almost marry for politics?",
    answers: ["Daario", "Khal Drogo", "Jon", "Hizdahr"],
    correctAnswer: "Hizdahr"
  },
];

// Timer
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 45,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIMES UP!");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Remaining Time: <span id='counter-number'>45</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<button id='done'>Done</button>");
  },

  done: function() {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  result: function() {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2>Complete!</h2>");
    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  }
};

// ON CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
