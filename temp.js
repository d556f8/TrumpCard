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
        
        if      (this.categorie == 1) msg += "club";
        else if (this.categorie == 2) msg += "diamond";
        else if (this.categorie == 3) msg += "heart";
        else if (this.categorie == 4) msg += "spade";
        
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

class Deck {
    constructor() {
        this.ele = document.createElement('div');
        this.ele.className = "eachDeck";

        this.card = [ new Card(), new Card(), new Card(), new Card(), new Card() ];
        this.genealogy;
        this.check;
        
        for (let i = 0; i < this.card.length; i++) {
            this.ele.appendChild(this.card[i].ele);
        }
        document.getElementById("deck").appendChild(this.ele);
    }
    
    generateCard() {
        for (let i = 0; i < this.card.length; i++) {
            this.card[i].newCard();
            this.card[i].update();
            this.card[i].infoCard();
        }

        this.scoring();
    }


    scoring() {
        this.genealogy = Array.from({length: 10}, () => false);
        this.check = Array.from({length: 14}, () => 0);

        for (let i = 0; i < this.card.length; i++) {
            this.check[this.card[i].num]++; 
        }

        // Flush
        if (this.isFlush()) this.genealogy[4] = true;       
        // Straight
        if (this.isStraight()) this.genealogy[5] = true;
        
        // Count Same Number
        for (let i = 0; i < this.check.length; i++) {
            if (this.check[i] == 2 && this.genealogy[8]) {  
                this.genealogy[7] = true;   // two pair
            } else if (this.check[i] == 2) {
                this.genealogy[8] = true;   // one pair
            }
            
            if (this.check[i] == 3) {
                this.genealogy[6] = true;   // triple
            }
            
            if (this.check[i] == 4) {
                this.genealogy[2] = true;   // four card
            }
        }

        // RoyalFlush 
        if (this.genealogy[4] &&
            this.check[1] == 1 && 
            this.check[10] == 1 && 
            this.check[11] == 1 && 
            this.check[12] == 1 && 
            this.check[13] == 1) { 
            this.genealogy[0] = true;
        } 

        // Straight Flush
        if (this.genealogy[4] && this.genealogy[5]) {
            this.genealogy[1] = true;
        }

        // Full house
        if (this.genealogy[6] && this.genealogy[8]) {
            this.genealogy[3] = true;
        }
        
        // High card
        if (this.genealogy.some(i => i == false)) {
            this.genealogy[9] = true;
        }

    }
    
    // 구현성공
    isFlush() {
        let condition = true;
        let headCategorie = this.card[0].categorie;

        for (let i = 0; i < this.card.length; i++) {
            if (this.card[i].categorie != headCategorie) {
                condition = false;
            }
        }

        return condition;
    }

    // 구현성공
    isStraight() {
        let flag = false;
        let count = 0;
        for (let i = 0; i < this.card.length; i++) {
            // exit 
            if (this.check[i] != 1 && flag) {
                break;
            } else if (this.check[i] == 1 && !flag) {
                flag = true;
                count++;
            } else if (this.check[i] == 1 && flag) {
                count++;
            }
        }

        if (count == 5) return true;
        else            return false;
    }
    
    // deck info 구현성공
    infoDeck() {
        for (let i = 0; i < this.card.length; i++) {
            this.card[i].infoCard();
        }
    }

}

// Generate Card
document.getElementById("genCard").addEventListener("click", () => {
    deck.generateCard();
});


const deck = new Deck();