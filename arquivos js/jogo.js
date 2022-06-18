const cards = document.querySelectorAll(".card");
let hasflippedCard = false;
let firstCard, secondCard;
let lockBord = false;

function insertButton(text, backBtn) {
    const body = document.querySelector('body');
    const btn = document.createElement('button');
    btn.textContent = text;

    backBtn(btn);

    body.insertAdjacentElement('beforeend', btn);

    return btn;
}

insertButton('Start', (button) => {
    button.style.cssText = `
    position: absolute;
    bottom: 350px;
    right: 180px;
    cursor: pointer;
    width: 80px;
    height: 40px;
    border: 2px solid black;
    border-radius: 8px;
    background: #00fff2;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    text-decoration: black;
    `;

    button.addEventListener('click', spreadCards)

})

insertButton('Reload', (button) => {
    button.style.cssText = `
    position: absolute;
    bottom: 280px;
    right: 180px;
    cursor: pointer;
    width: 80px;
    height: 40px;
    border: 2px solid black;
    border-radius: 8px;
    background: #00fff2;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    text-decoration: black;
    `;

    button.addEventListener('click', shiffle)

})

function spreadCards() {
    cards.forEach((card) => {
        card.style.cssText = `
        position: relative;
        `;
    })
}



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

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBord();
}

function unflipCards() {
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

function shiffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })

}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})