let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,
    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    cards: null,

    // seta a carta para um verificação em uma as posições
    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }
        else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    // chacar de as cartas são iguais
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    // libera as cartao que formaram par
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    // desvira as cartas que nao formaram par
    unflipeCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    // verifica se existe um gameOver olhando pro array card.flipped
    checkGameOver() {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    // crear a frente das cartas
    createCardsFromTechs: function () {
        this.cards = [];

        // for (let tech of techs) {
        //     cards.push(createPairFromTech(tech));
        // }
        // substitui o for
        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        });
        // substitui o for

        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    // crear o par de cartas de acordo com as tecnologias
    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }];
    },

    // criar um id randomico para cada carta
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    // embaralhar todas as cartas
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }

}