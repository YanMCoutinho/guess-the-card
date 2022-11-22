window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault()
    addColorToCardSuitSelector()    
    initializeGame()
})

function addColorToCardSuitSelector() {
    let select = document.querySelector('select#card-suit')

    if (select) {
        select.addEventListener('change', (event) => {
            let target = event.target
            if (target.selectedIndex == 0 || target.selectedIndex == 2) {
                target.classList.add('red')
            } else {
                target.classList.remove('red')
            }        
        })
    }
}

function initializeGame() {
    let form = document.querySelector('form.player')
    let scoreHtml = document.querySelector('.score p#points')

    if (form && scoreHtml) {
        sessionStorage.setItem('score', 0)
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            getCard().then((card) => { 
                let isAnswerCorrect = checkAnswer(card)
                changeCardImg(card)

                notifyResult(isAnswerCorrect)
                if (isAnswerCorrect) {
                    increaseScore()
                }
            })                                    
        })
    }
}

async function getCard() {
    const res = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
        .then((data) => data.json())
    
    if (res) {
        return res.cards[0]
    }
}

function notifyResult(isAnswerCorrect) {
    let result = document.querySelector('div#result')
    if (isAnswerCorrect) {
        result.classList.add('bg-blue')
        result.classList.remove('bg-red')
        result.innerHTML = '<p>ACERTOU!</p>'
    } else {
        result.classList.add('bg-red')
        result.classList.remove('bg-blue')
        result.innerHTML = '<p>ERROU!</p>'
    }
}

function changeCardImg(card) {
    let imageHtml = document.querySelector('img#card-img')    
    imageHtml.src = card.image
}

function checkAnswer(card) {
    let cardSuit = card.suit.toLowerCase()
    let cardValue = card.code[0].toLowerCase()


    let guessCardValue = document.querySelector('select#card-value').value
    let guessCardSuit = document.querySelector('select#card-suit').value
    
    console.log()
    console.log('Valor da carta adivinhada')
    console.log(guessCardValue)
    console.log('Valor da carta')
    console.log(cardValue)
    console.log()
    console.log('naipe')
    console.log(cardSuit)

    if (guessCardSuit.toLowerCase() == cardSuit && guessCardValue.toLowerCase() == cardValue) {
        return true
    } else {
        return false
    }    
}

function increaseScore() {
    let scoreHtml = document.querySelector('.score p#points')
    let score = parseInt(sessionStorage.getItem('score')) + 1
    sessionStorage.setItem('score', score)
    
    scoreHtml.innerHTML = 'Pontos: <b>' + score + '</b>'
}