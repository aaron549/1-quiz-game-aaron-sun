(function () {
  function quizgame() {
    const output = [];

    myQuestions.forEach((current, questions) => {
      const answers = [];

      for (letter in current.answers) {
        answers.push(
          `<label>
                <input type="radio" name="question${questions}" value="${letter}">
                ${letter} :
                ${current.answers[letter]}
              </label>`
        );
      }

      output.push(
        `<div class="slide">
              <div class="question"> ${current.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    myQuestions.forEach((current, questions) => {
      const answerContainer = answerContainers[questions];
      const selector = `input[name=question${questions}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === current.correctAnswer) {
        numCorrect++;

        answerContainers[questions].style.color = "lightgreen";
      } else {
        answerContainers[questions].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Which key is a homerow key?",
      answers: {
        a: "L",
        b: "B",
        c: "Q",
      },
      correctAnswer: "a",
    },
    {
      question: "Who invented the typewrite?",
      answers: {
        a: "Nikola Tesla",
        b: "Christopher Latham Sholes",
        c: "Thomas Edison",
      },
      correctAnswer: "b",
    },
    {
      question: "Which country does not have its own unique keyboard layout?",
      answers: {
        a: "Portugal",
        b: "Austria",
        c: "Belgium",
        d: "Switzerland",
      },
      correctAnswer: "b",
    },
  ];

  quizgame();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);

  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
