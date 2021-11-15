const app = document.querySelector("#my-app")
app.innerHTML = `
  <input type="text" name="guess"/><span id="essais"></span>
  <div id="error"></div>
  <div id="log"></div>
  <button id="restart">Nouveau jeu</button>
`

// variables et constantes 
const guess = document.querySelector("input[name='guess']")
const log = document.querySelector("#log")
const restartBtn = document.querySelector("#restart")
const essais = document.getElementById('essais')
const error = document.getElementById('error')

let game = {
  nombreMystere: 0,
  nbEssai: 0,
  start: function () {
    game.nombreMystere = Math.round(Math.random() * 100)
    game.nbEssai = 0
    log.textContent = ''
    essais.textContent = game.nbEssai
    console.log(game.nombreMystere)
  }
}

// initialisation
game.start()

// évènements
guess.addEventListener('keydown', (event) => {
  
  if(isNaN(+guess.value)) {
    error.textContent = 'Vous devez saisir un nombre'
  } else {
    error.textContent = ''
  }

  if(event.keyCode === 13) {
    sendGuess()
  } 
})

restartBtn.addEventListener('click', game.start)

function sendGuess() {
  const value = +guess.value

  // Ajoute un paragraphe avec le proposition du joueur
  const guessLog = document.createElement("p")
  guessLog.append(value)
  log.append(guessLog)

  // Vide le champ de proposition
  guess.value = ''

  // Incrémente le nombre d'essai
  game.nbEssai++
  essais.textContent = game.nbEssai

  // Ajoute un paragraphe avec la réponse
  const responseLog = document.createElement("p")

  if(value === game.nombreMystere) {
    responseLog.append("Bravo vous avez devinez !")
    game.start()
  } else if (value > game.nombreMystere) {
    responseLog.append("C'est plus petit")
  } else {
    responseLog.append("C'est plus grand")
  }

  log.append(responseLog)
}