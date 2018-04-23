/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');

const diamond = "fa fa-diamond";
const plane = "fa fa-paper-plane-o";
const anchor = "fa fa-anchor";
const bolt = "fa fa-bolt";
const cube = "fa fa-cube";
const leaf = "fa fa-leaf";
const bicycle = "fa fa-bicycle";
const bomb = "fa fa-bomb";

const cardList = [diamond, diamond, plane, plane, anchor, anchor, bicycle, bicycle, bolt, bolt, cube, cube, leaf, leaf, bomb, bomb];

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

//cards.forEach(element => element.setAttribute("class", "card show"));

function fillCards(){
    let shuffledCards = shuffle(cardList);

    for(let e = 0; e < cards.length; e++){
        let i = document.createElement('i');
        i.setAttribute("class", `${shuffledCards[e]}`)
        cards[e].appendChild(i);
    }
}

function clearDesc(){
    cards.forEach(element => element.firstChild.remove());
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let openedCards = [];

deck.addEventListener('click', event => {
    let selectedCard = event.target;
    showCard(selectedCard);
    addToOpenList(selectedCard);
})

function showCard(selectedCard) {
    selectedCard.setAttribute('class', 'card show open');
}

function addToOpenList(selectedCard) {
    openedCards.push(selectedCard);
    console.log(openedCards);
}