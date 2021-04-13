(function () {
  function quizgame() {
    const output = [];

    prompt1.forEach((current, prompt) => {
      const choice = [];

      for (letter in current.choice) {
        choice.push(
          `<label>
                <input type="radio" name="question${prompt}" value="${letter}">
                ${letter} :
                ${current.choice[letter]}
              </label>`
        );
      }

      output.push(
        `<div class="slide">
              <div class="question"> ${current.question} </div>
              <div class="choice"> ${choice.join("")} </div>
            </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".choice");

    let numCorrect = 0;

    prompt1.forEach((current, prompt) => {
      const answerContainer = answerContainers[prompt];
      const selector = `input[name=question${prompt}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === current.correctAnswer) {
        numCorrect++;

        answerContainers[prompt].style.color = "lightgreen";
      } else {
        answerContainers[prompt].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${prompt1.length}`;
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
  const prompt1 = [
    {
      question: "Which key is a homerow key?",
      choice: {
        a: "L",
        b: "B",
        c: "Q",
      },
      correctAnswer: "a",
    },
    {
      question: "Which country have the shortest space keys?",
      choice: {
        a: "Japan",
        b: "Canada",
        c: "Italy",
      },
      correctAnswer: "a",
    },
    {
      question: "Which of the following is the father of all keyboards?",
      choice: {
        a: "AEK M0115",
        b: "Cherry G80-3000SAV",
        c: "IBM model M",
      },
      correctAnswer: "c",
    },
    {
      question: "Which country have the shortest space keys?",
      choice: {
        a: "Japan",
        b: "Canada",
        c: "Italy",
      },
      correctAnswer: "a",
    },
    {
      question: "Who invented the typewriter?",
      choice: {
        a: "Nikola Tesla",
        b: "Christopher Latham Sholes",
        c: "Thomas Edison",
      },
      correctAnswer: "b",
    },
    {
      question: "Which country does not have its own unique keyboard layout?",
      choice: {
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
