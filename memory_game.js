const cards = document.querySelectorAll(".memory-card");

shuffle();

let hasFlippedCard = false;
let firstCard,secondCard;
let lockBoard = false;
var count=0;
var levelCompleted=false;
var hideNo=0;

function flipCard(){
  if(lockBoard) return;
  if(this==firstCard && hasFlippedCard) return;
  this.classList.add('flip');

  count++;
  if(!hasFlippedCard){
    hasFlippedCard=true;
    firstCard = this;
    return;
  }

  hasFlippedCard=false;
  secondCard=this;
  checkForMatch();
}

function checkForMatch(){

   firstCard.dataset.framework==secondCard.dataset.framework?hideCards():unflipCards();

}

function hideCards(){
  firstCard.removeEventListener("click",flipCard);
  secondCard.removeEventListener("click",flipCard);
  setTimeout(function(){
    firstCard.firstElementChild.classList.add("hide-card");
    secondCard.firstElementChild.classList.add("hide-card");
  },1500);
  hideNo++;
  if(hideNo==cards.length/2){
    levelCompleted=true;
    console.log(count);
  }
}

function unflipCards(){
  lockBoard=true;

  setTimeout(function(){
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
  lockBoard=false;},1500);


}

function shuffle(){
  for(var i=0;i<cards.length;i++){
    let randomPos = Math.floor(Math.random()*12);
    cards[i].style.order = randomPos;
  }
}

for(var i=0;i<cards.length;i++){
  cards[i].addEventListener("click",flipCard);
}
