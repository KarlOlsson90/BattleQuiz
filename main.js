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

class Quiz {
    constructor() {
        this.placeholder = [];
    }
}

class Question {
    constructor() {
        this.placeholder = [];
    }
}