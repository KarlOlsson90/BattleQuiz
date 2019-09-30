/* 

Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
• Låt användaren bestämma hur många frågor som ska visas.
• Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
• Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. 
• Lämna in projektet som ett git-repo.
• Man ska kunna välja flera svar. Ibland kan ett alternativ vara rätt, ibland flera.
• Frågorna ska läsas in från en JSON-fil.

• VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
• VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
• VG: Responsiv design

*/

document.addEventListener("DOMContentLoaded", function(event) {

    console.log("Allt laddat!")

});

/*
const testQuestion = [fråga1, fråga2, fråga3]


*/

document.addEventListener("DOMContentLoaded", function(event) {
    const button = document.getElementById("startButton");
    button.addEventListener("click", function(asdasd) {
        asdasd.preventDefault();

        console.log("Du tryckte på knappen")

        class Quiz {
            constructor(user, chosenQuestions, resultCorrect, resultWrong) {
                this.user = user;
                this.chosenQuestions = chosenQuestions;
                this.resultCorrect = resultCorrect;
                this.resultWrong = resultWrong;
            }
        }

        class Question {
            constructor(category, question, options, rightOrWrong) {
                this.category = category;
                this.question = question;
                this.options = options;
                this.rightOrWrong = rightOrWrong;
            }
        }


































    });
});