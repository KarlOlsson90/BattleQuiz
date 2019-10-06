/* 

G:
[UPPFYLD]                   Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
[UPPFYLD]                   Låt användaren bestämma hur många frågor som ska visas.
[UPPFYLD]                   Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
[UPPFYLD]                   Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. 
[UPPFYLS VID INLÄMNING]     Lämna in projektet som ett git-repo.
[UPPFYLD]                   Man ska kunna välja flera svar. Ibland kan ett alternativ vara rätt, ibland flera.
[UPPFYLD]                   Frågorna ska läsas in från en JSON-fil.

VG:
[UPPFYLD DELVIS]            Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
[UPPFYLD]                   Visa en fråga i taget, låt användaren bläddra mellan dem.
[UPPFYLD]                   Responsiv design

*/

document.addEventListener("DOMContentLoaded", function() {
    // QUIZKLASSEN----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    class Quiz { 
      constructor() {
        this.userName = "";
        this.questions = []; //Databasen, avser alla frågor i JSON
        this.currentQuestion = 0;
        this.numberOfCorrectAnswers = 0;
  
        // "Binds" för respektive funktion
        this.startGame = this.startGame.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.correctQuiz = this.correctQuiz.bind(this);
        this.registerSelectedAlternative = this.registerSelectedAlternative.bind(this);
        this.replaceButton = this.replaceButton.bind(this);
  
        // Eventlisteners för de 4 olika knapparna
        document.querySelector(".js-startGameButton").addEventListener("click", this.startGame);
        document.querySelector(".js-nextQuestionButton").addEventListener("click", this.nextQuestion);
        document.querySelector(".js-previousQuestionButton").addEventListener("click", this.previousQuestion);
        document.querySelector(".js-correctorButton").addEventListener("click", this.correctQuiz);
      }
      
      // Sätt igång spelet
      startGame() {

        // Hämta in användarnamn och antal frågor
        this.userName = document.querySelector(".js-nameInput").value;
        const numberOfQuestionsValue = document.querySelector(".js-numberInput").value;
        
        // Växla vy mellan välkomstsidan och spelsidan
        document.querySelector(".js-preStartContainer").classList.toggle("hidden");
        document.querySelector(".js-questionsContainer").classList.toggle("hidden");
  
        // Hämta in alla frågor fråm JSON
        let JSON = getJSON("./questions.json");
  
        // Välj ut alla frågor från index 0 och antal frågor valda. 
        this.questions = JSON.splice(0, numberOfQuestionsValue);
  
        // Kör igån en fråga utifrån ovan
        new Question(
          this.questions[this.currentQuestion],
          this.currentQuestion,
          this.registerSelectedAlternative
        );
      }
  
      // Kör nästa fråga
      nextQuestion() {

        // Lägg till 1 på frågans index-position
        this.currentQuestion++;
        
        // kör igång en fråga fast nu i nästa index-position
        new Question(
          this.questions[this.currentQuestion],
          this.currentQuestion,
          this.registerSelectedAlternative
        );
        this.replaceButton(); // Körs varje gång en ny fråga görs och kollar om det är sista frågan (då lägger den till en "rätta-knapp" samt döljer "nästa-fråga-knappen")
      }
  
      // Loopa igenom (this.)questions-Arrayen. Om index är detsamma som "currentQuestion" så returneras ett nytt Question-objekt. Question-objektet har sedan en egen map-metod för alternativen.
      registerSelectedAlternative(value) {
        this.questions = this.questions.map((question, index) => {
          if (index === this.currentQuestion) {
            return Object.assign({}, question, {
              alternatives: question.alternatives.map(alternative => {
                if (alternative.value === value) {
                  return { ...alternative, checked: !alternative.checked };
                }
                return alternative;
              })
            });
          }
          return question;
        });
      }

      // Sammanställ resultatet och göm alla knappar
      correctQuiz() {

        // Göm alla knappar
        document.querySelector(".js-previousQuestionButton").classList.toggle("hidden");
        document.querySelector(".js-correctorButton").classList.toggle("hidden");
  
        // Töm frågecontainern
        const questionsContainerHTML = document.querySelector(".js-question");
        questionsContainerHTML.innerHTML = "";
  
        // Skapa scoreScreen-div
        const scoreScreenHTML = document.createElement("div");
        scoreScreenHTML.className = "scoreScreen";
  
        // Skapa ul för slutskärmen
        const resultList = document.createElement("ul");
  
        //Skapa endgame-rubriken (och visa spelarnamnet)
        const userNameDisplayHTML = document.createElement("h2");
        userNameDisplayHTML.innerHTML = "Du är klar med spelet " + this.userName;
        questionsContainerHTML.appendChild(userNameDisplayHTML);
  
        // Skriv ut resultatet på alla frågor var för sig baserat på vad som kryssats i
        const correctCurrentQuestion = (question, questionNumber) => {
          const li = document.createElement("li");
  
          for (let i = 0; i < question.alternatives.length; i += 1) {
            if (question.alternatives[i].checked === true) {
              if (question.correctAnswer.includes(i)) {
                this.numberOfCorrectAnswers++;
                li.innerHTML = "Du svarade rätt på fråga " + questionNumber;
                resultList.appendChild(li);
                return;
              }
            }
          }
  
          li.innerHTML = "Du svarade fel på fråga " + questionNumber;
          resultList.appendChild(li);
        };
  
        // Loopa igenom respektive fråga med en inre loop
        for (let i = 0; i < this.questions.length; i += 1) {
          correctCurrentQuestion(this.questions[i], i + 1);
        }
  
        scoreScreenHTML.appendChild(resultList);
  
        // Skapa p-element och skriv ut total poäng
        const totalScore = document.createElement("p");
        totalScore.innerHTML = "Du fick totalt " + this.numberOfCorrectAnswers + " poäng";
  
        scoreScreenHTML.appendChild(totalScore);
        questionsContainerHTML.appendChild(scoreScreenHTML);
      }
  
      // Lägg till en "rätta-knapp" && dölj "nästa-fråga-knappen" OM spelaren är på sista frågan.
      replaceButton() {
        if (this.currentQuestion == this.questions.length - 1) {
          document.querySelector(".js-nextQuestionButton").classList.toggle("hidden");
          document.querySelector(".js-correctorButton").classList.toggle("hidden");
        }
      }

      // Gå tillbaka en fråga. Man kan bara gå tillbaka förutsatt att man inte är på första frågan
      previousQuestion() {
        
        if (this.currentQuestion !== 0) {
          this.currentQuestion--;
          new Question(
            this.questions[this.currentQuestion],
            this.currentQuestion,
            this.registerSelectedAlternative
          );
          
        }
      }
    }
  
    //QUESTIONKLASSEN----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    class Question { 
      constructor(question, currentQuestion, registerSelectedAlternative) {
        this.questionJSON = question;
        this.registerSelectedAlternative = this.registerSelectedAlternative.bind(this);
        this.currentQuestion = currentQuestion;
        this.createQuestion = this.createQuestion.bind(this);
        this.updateQuestionInQuizClass = registerSelectedAlternative;
  
        this.createQuestion();
      }
  
      registerSelectedAlternative(e) {
        this.updateQuestionInQuizClass(e.target.value);
      }
  
      createQuestion() {
        const questionsContainerHTML = document.querySelector(".js-question");
  
        questionsContainerHTML.innerHTML = "";
  
        // Container för varje enskild fråga
        const questionHTML = document.createElement("div");
        questionHTML.className = "question";
  
        // Skriv ut namn på frågan som en h2-a
        const questionNumberHTML = document.createElement("h2");
        questionNumberHTML.innerHTML = "Fråga " + (this.currentQuestion + 1);
        questionHTML.appendChild(questionNumberHTML);
  
        // Skriv ut den faktuska frågan
        const activeQuestion = document.createElement("p");
        activeQuestion.innerText = this.questionJSON.question;
        questionHTML.appendChild(activeQuestion);
  
        // Checkboxar för svarsalternativen
        const alternatives = document.createElement("ul");
        for (let i = 0; i < this.questionJSON.alternatives.length; i++) {

          const alternative = document.createElement("li");
          alternative.className = "alternativeItem";

            // Skapa checkbox
          const checkBox = document.createElement("input");
          checkBox.type = "checkbox";
          checkBox.className = "alternative";
          checkBox.checked = this.questionJSON.alternatives[i].checked;
          checkBox.value = this.questionJSON.alternatives[i].value;

            // Lyssnar på ikryssade alternativ
          checkBox.addEventListener("click", this.registerSelectedAlternative);
  
          const label = document.createElement("label");
          label.className = "alternativeLabel";
          label.innerText = this.questionJSON.alternatives[i].value;
  
            // positionering
          alternative.appendChild(checkBox);
          alternative.appendChild(label);
          alternatives.appendChild(alternative);
        }
        questionHTML.appendChild(alternatives);
  
        questionsContainerHTML.appendChild(questionHTML);
      }
    }
  
    //INITIERA QUIZ:
    new Quiz();
  });
  