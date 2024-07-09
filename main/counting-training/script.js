let trainingInterval;
let currentCardIndex;
let cards = [];
let numDecks;
let numCards;
let speed;
let totalCards;
let runningCount = 0;

function setDecks(decks) {
    numDecks = decks;
    document.getElementById('deckSelection').style.display = 'none';
    document.getElementById('cardSelection').style.display = 'block';
}

function setCards(percentage) {
    totalCards = numDecks * 52;
    numCards = Math.floor(totalCards * (percentage / 100));
    document.getElementById('cardSelection').style.display = 'none';
    document.getElementById('speedSelection').style.display = 'block';
}

function setSpeed(cardSpeed) {
    speed = cardSpeed * 1000; // convert to milliseconds
    document.getElementById('speedSelection').style.display = 'none';
    document.getElementById('cardDisplay').style.display = 'block';
    startTraining();
}

function startTraining() {
    cards = generateCards(numDecks, numCards);
    currentCardIndex = 0;
    runningCount = 0;
    updateCardsRemaining();
    trainingInterval = setInterval(showNextCard, speed);
}

function stopTraining() {
    clearInterval(trainingInterval);
    document.getElementById('deckSelection').style.display = 'block';
    document.getElementById('cardSelection').style.display = 'none';
    document.getElementById('speedSelection').style.display = 'none';
    document.getElementById('cardDisplay').style.display = 'none';
    document.getElementById('currentCard').innerHTML = '';
    document.getElementById('cardsRemaining').innerHTML = '';
    askForRunningCount();
}

function showNextCard() {
    if (currentCardIndex < cards.length) {
        const card = cards[currentCardIndex];
        document.getElementById('currentCard').innerHTML = `<img src="../cards/${card}.png" alt="${card}">`;
        updateRunningCount(card);
        currentCardIndex++;
        updateCardsRemaining();
    } else {
        stopTraining();
    }
}

function generateCards(decks, numCards) {
    const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    const cardSuits = ['clubs', 'diamonds', 'hearts', 'spades'];
    let deck = [];

    for (let i = 0; i < decks; i++) {
        for (let suit of cardSuits) {
            for (let value of cardValues) {
                deck.push(`${value}_of_${suit}`);
            }
        }
    }

    deck = shuffle(deck);

    if (numCards > deck.length) {
        numCards = deck.length;
    }

    return deck.slice(0, numCards);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateCardsRemaining() {
    const remaining = totalCards - currentCardIndex;
    document.getElementById('cardsRemaining').innerText = `Cards Remaining: ${remaining}`;
}

function updateRunningCount(card) {
    const cardValue = card.split('_')[0];
    if (['2', '3', '4', '5', '6'].includes(cardValue)) {
        runningCount += 1;
    } else if (['10', 'jack', 'queen', 'king', 'ace'].includes(cardValue)) {
        runningCount -= 1;
    }
}

function askForRunningCount() {
    const userRunningCount = prompt("What is your running count?");
    alert(`Your running count: ${userRunningCount}\nActual running count: ${runningCount}`);
}
