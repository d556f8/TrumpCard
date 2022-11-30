
class Card {
    constructor() {
        // elements
        this.ele = document.createElement('div');
        this.ele.className = "card";

        // member variables
        this.categorie;
        this.num;
        this.lock = false;

        // lock 
        this.ele.addEventListener("click", () => {
            this.lock = !this.lock;
            this.ele.classList.toggle('lock');
        })
    }
    
    newCard() {
        if (this.lock == false) {
            this.categorie = Math.floor(Math.random() * 4) + 1;
            this.num = Math.floor(Math.random() * 13) + 1;
        }


    }

    infoCard() {
        let msg = "병과: ";
        switch (this.categorie) {
            case 1:
                msg += "club";
                break;
            case 2:
                msg += "diamond";
                break;
            case 3:
                msg += "heart";
                break;
            case 4:
                msg += "spade";
                break;
        }
        msg += ", 수: " + this.num;

        console.log(msg);
    }

    update() {
        let x;
        let y;
        
        x = -148 * (this.num - 1);

        if      (this.categorie == 1) y = 0;
        else if (this.categorie == 2) y = -230;
        else if (this.categorie == 3) y = -460;
        else if (this.categorie == 4) y = -690;

        this.ele.style.backgroundPositionX = x + "px";
        this.ele.style.backgroundPositionY = y + "px";
    }
}
const card1 = new Card();
const card2 = new Card();
const card3 = new Card();
const card4 = new Card();
const card5 = new Card();
const deck = [card1, card2, card3, card4, card5];
const deckScore = Array.from({length: 10}, () => false);

function tellGenealogy(deck) {
    // isFlush?
    let isflush = true;
    let headCategorie = deck[0].categorie;

    for (i in deck) {
        if (deck[i].categorie != headCategorie) isflush = False;
    }

}

// Deck child elements initializing
const deckEle = document.getElementById("deck");
for (i in deck) {
    deckEle.appendChild(deck[i].ele);
}

// Generate Card
document.getElementById("genCard").addEventListener("click", () => {
    for (i in deck) {
        deck[i].newCard();
        deck[i].update();
        deck[i].infoCard();
    }
});

