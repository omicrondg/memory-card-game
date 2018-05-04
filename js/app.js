/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
const stars = document.querySelector('.stars').querySelectorAll('.fa');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const timer = document.querySelector('.timer');

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


function fillCards(){
    let shuffledCards = shuffle(cardList);
    
    for(let e = 0; e < cards.length; e++){
        let i = document.createElement('i');
        i.setAttribute("class", `${shuffledCards[e]}`);
        cards[e].appendChild(i);
    }
    
    cards.forEach(e => e.addEventListener('click', clickCard));
}

function clearDesc(){
    cards.forEach(element => element.firstChild.remove());
}

function restartGame(){
    cards.forEach(e => e.classList.remove('show', 'open', 'match'));
    moves.innerText = "0";
    stars.forEach(e => e.classList.remove('win'));
    stopTimer();
    resetTimer();
    clearDesc();
    fillCards();
}

restart.addEventListener('click', event => { restartGame(); });

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
let delayShow = 800;

let movesCounter = movesCount();
let matchCounter = 8;

let timerCounter = 0;
let timerState = false;
let second = 1000;
let minute = second * 60;
let hour = minute * 60;
let startDate;

function clickCard(event) {
    let selectedCard = event.target;
    moves.innerText = movesCounter();
    if(timerState === false){
        timerState = true;
        startDate = new Date();
        timerCounter = window.setInterval(startTimer, 1000 / 60);
    }

    if (openedCards.length < 2){
        showCard(selectedCard);
        addToOpenList(selectedCard);
    }

    window.setTimeout(matchCards, delayShow);
}


function showCard(selectedCard) {
    selectedCard.classList.add('show', 'open');
}

function addToOpenList(selectedCard) {
    openedCards.push(selectedCard);
}

function matchCards(){
    if (openedCards.length !== 0 && openedCards.length > 1) {
        let card_1 = openedCards[0].firstElementChild.getAttribute('class');
        let card_2 = openedCards[1].firstElementChild.getAttribute('class');
        
        if (card_1 === card_2) cardsMatched(openedCards[0], openedCards[1]);
        else cardsUnmatched(openedCards[0], openedCards[1]);
    }
}

function cardsMatched(card_1, card_2){
    --matchCounter;
    card_1.classList.add('match');
    card_1.removeEventListener('click', clickCard);
    
    card_2.classList.add('match');
    card_2.removeEventListener('click', clickCard);
    
    openedCards = [];
    
    if (matchCounter === 0) {
        endGame();
    }
}

function cardsUnmatched(card_1, card_2) {
    card_1.classList.add('unmatch');
    card_2.classList.add('unmatch');

    setTimeout(function(){
        card_1.classList.remove('show', 'open', 'unmatch');
        card_2.classList.remove('show', 'open', 'unmatch');
    }, 500);
    
    openedCards = [];
}

function startTimer() {
    let now = new Date();
    let elapsed = now - startDate;
    let parts = [];

    parts[0] = '' + Math.floor((elapsed % hour) / minute);
    parts[1] = '' + Math.floor(((elapsed % hour) % minute) / second);

    parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
    parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];

    timer.innerText = parts.join(':');
}

function stopTimer(){
    timerState = false;
    window.clearInterval(timerCounter);
}

function resetTimer(){
    timer.innerText = "00:00";
}

function movesCount(){
    currCounter = 0;

    return function(){
        return currCounter++;
    }
}

function endGame(){
    stopTimer();
    JSalert();
}

function getScore(){
    totalTime = timer.innerText;
    let min = Number(totalTime.split(':')[0]);
    let sec = Number(totalTime.split(':')[1]);
    let totalMoves = Number(moves.innerText);
    if (totalMoves <= 25 && sec <= 25) {
        for(let s of stars){
            s.classList.add('win');
        }
    } else if (totalMoves > 25 && totalMoves <= 50 && sec > 25 && sec <= 60) {
        stars[0].classList.add('win');
        stars[1].classList.add('win');
    } else {
        stars[0].classList.add('win');
    }
}

function JSalert() {
    getScore();
    swal({
            title: "You Won!",
            text: `Your Score: ${stars.length}, Moves: ${moves.innerText}, Time: ${timer.innerText}`,
            icon: "success",
            buttons: ["No thank you!", "Play again!"],
            dangerMode: false,
        })
        .then((isConfirm) => {
            if (isConfirm) {
                restartGame();
            } else {
                swal("Good By!");
            }
        });
}

