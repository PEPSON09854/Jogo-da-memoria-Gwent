const cards = document.querySelectorAll(".card");
let hasflippedCard = false;
let firstCard, secondCard;
let lockBord = false;


function flipCard() {
    if (lockBord) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!hasflippedCard) {
        hasflippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasflippedCard = false;
    checkForMath();

}

function checkForMath() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCrds();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBord();
}

function unflipCrds() {
    lockBord = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBord = false;

        resetBord();
    }, 1500);
}

function resetBord() {
    [hasflippedCard, lockBord] = [false, false];
    [firstCard, secondCard] = [null, null];

}

(function shiffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })

})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})