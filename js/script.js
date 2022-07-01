const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

startGame();

// da o start do jogo e chama a criação das cartas
function startGame() {
    initializeCards(game.createCardsFromTechs());
}

// cria as divs e classes do tabuleiro
function initializeCards(cards) {

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = '';

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        creaCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// cria as faces da carta, front e back
function creaCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

// cria a face da carta
function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);

    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/" + card.icon + ".svg";
        cardElementFace.appendChild(iconElement);
    }
    else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);
}

// funcao de virar a carta e verifica os pares
function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = 'flex';
                }
            }
            else {
                // desvira as cartas em caso elas nao serem par
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipeCards();
                }, 1000);
            };
        }
    }
}

// reinicia o jogo
function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}


