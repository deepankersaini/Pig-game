'use strict';

//selecting elemnts

const score0El = document.querySelector('#score--0'); //document.getElementByID('score0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const newGame = document.querySelector('.btn--new');
const holdGame = document.querySelector('.btn--hold');
const currentscore0El = document.querySelector('#current--0');
const currentscore1El = document.querySelector('#current--1');
const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');

let Totalscore, CurrentScore, activePlayer, playing;
const initials = function () {
  Totalscore = [0, 0];
  CurrentScore = 0;
  activePlayer = 0;
  //Initial conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  playing = true;
  currentscore0El.textContent = 0;
  currentscore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  // document.querySelector('.player--0').classList.add('player--active');
  activePlayer0.classList.add('player--active');
  activePlayer1.classList.remove('player--active');

  activePlayer0.classList.remove('player--winner');
  activePlayer1.classList.remove('player--winner');
};

initials();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  CurrentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};

//Rolling dice
rollBtn.addEventListener('click', function () {
  //-> Genrating dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    // console.log(dice);

    //->Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //   ->if dice=1 then switch to second player.
    if (dice !== 1) {
      //Add dice to current score.
      CurrentScore = CurrentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        CurrentScore;
    } else {
      //Switching player.
      switchPlayer();
    }
  }
});

holdGame.addEventListener('click', function () {
  //current ki value score mai add kro
  // score0El.textContent = CurrentScore;
  //hold press krne pr second player active ho
  if (playing) {
    Totalscore[activePlayer] += CurrentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      Totalscore[activePlayer];

    if (Totalscore[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      //winner

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// newGame.addEventListener('click', function () {
//   window.location.reload();
// });

newGame.addEventListener('click', initials);
