(function () {
  //"global scope and ensures quiz wont interfere with other script"
  function quizgame() {
    //function that runs at the start
    const output = []; //varible to store the html output

    prompt1.forEach((current, prompt) => {
      //foreach addresses each qustion
      const choice = []; //list of possible answers - list of answer choices

      for (letter in current.choice) {
        //foreach answer..
        choice.push(
          //adds HTML radio btn
          `<label>
                <input type="radio" name="question${prompt}" value="${letter}">
                ${letter} :
                ${current.choice[letter]}
              </label>`
        );
      }

      output.push(
        //add q and a to output
        `<div class="slide">
              <div class="question"> ${current.question} </div>
              <div class="choice"> ${choice.join("")} </div>
            </div>`
      );
    });

    containerquiz.innerHTML = output.join(""); //joins output into one string on page - shows on page
  }

  function showResults() {
    //function that runs after submission
    const answerContainers = containerquiz.querySelectorAll(".choice"); // gets answers from quiz

    let numCorrect = 0; //tracks answers

    prompt1.forEach((current, prompt) => {
      //current q , prompt num - for each qustion
      const answerContainer = answerContainers[prompt];
      const selector = `input[name=question${prompt}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value; //looks for answer

      if (userAnswer === current.correctAnswer) {
        //if answer correct
        numCorrect++; //adds to # of correct answers

        answerContainers[prompt].style.color = "lightgreen"; //right green
      } else {
        answerContainers[prompt].style.color = "red"; //wrong red
      }
    });

    containerR.innerHTML = `${numCorrect} out of ${prompt1.length}`; //answers correct over amt of q
  }

  //show first
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    //^Hide the current slide by removing the active-slide class.
    //Show the new slide by adding the active-slide class.
    //Update the current slide number
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitbtn.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitbtn.style.display = "none";
    }
  }
  //^If we’re on the first slide, hide the Previous Slide button. Otherwise, show the button.
  //If we’re on the last slide, hide the Next Slide button and show the Submit button. Otherwise, show the Next Slide button and hide the Submit button

  function showNextSlide() {
    showSlide(currentSlide + 1); //makes the navigatoin work
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1); //makes navi work
  }

  const containerquiz = document.getElementById("quiz"); //html element storage, and references them in variables
  const containerR = document.getElementById("results");
  const submitbtn = document.getElementById("submit");
  const prompt1 = [
    //quiz game questions
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
  //starts
  quizgame();
  //pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);
  //event listener
  submitbtn.addEventListener("click", showResults); //submit, show results
  previousButton.addEventListener("click", showPreviousSlide); //connects the nvai
  nextButton.addEventListener("click", showNextSlide); //connects the navi
})();
