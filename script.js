const entry = [
    'rock',
    'paper',
    'scissor'
  ];
  let enemyPick = entry[Math.floor(Math.random() * entry.length)];
  let l = function(msg){console.log(msg);};
  const choices = document.querySelector('#choices ul');
  let i;
  const roundResult = {
  win:  'You win this round!',
  lose:  'You lose this round!',
  draw:   'This is a draw.'
  };
  let scores = {
    me : 0,
    opponent : 0
  };
  
  const html = {
    myScore : document.getElementById('myScore'),
    eScore : document.getElementById('escore'),
    result : document.getElementById('result'),
    resultField : document.getElementById('result-field'),
    nextRound : document.getElementById('next-round'),
    enemyFloor : document.getElementById('enemy-pick'),
  }
  
  l('enemy pick: ' + enemyPick);
  
  (function(){
    for(i = 0; i<entry.length; i++){
      choices.innerHTML +=
      '<li><button>'+ entry[i]+ '</button></li>';
    }
    html.myScore.textContent = 'My Score: ' + scores.me;
    html.eScore.textContent = 'Opponent Score: ' + scores.opponent;
  }());
  
  const entryChoice = document.querySelectorAll('#choices ul li button');
  
  for(i=0; i < entryChoice.length; i++){
    entryChoice[i].addEventListener('click',function(event){
      html.result.innerHTML = compete(event.target.innerHTML);
  
      html.enemyFloor.innerHTML = enemyPick;
      for(i=0;i < entryChoice.length; i++){
        entryChoice[i].disabled = true;
      }// this disables the entry choices to be clicked
  
      html.nextRound.innerHTML = '<button> Next Round</button>';
      html.nextRound.getElementsByTagName('BUTTON')[0]
      .addEventListener('click', function(){
         for(i=0;i < entryChoice.length; i++){
          entryChoice[i].disabled = false;
        }
        enemyPick = entry[Math.floor(Math.random() * entry.length)];
        // to reset the enemy Pick
        html.enemyFloor.innerHTML = '';
      });
      throwResult();
    });
  }
  
  function compete(pick){
    if (enemyPick == pick)
      return roundResult.draw;
    if(enemyPick == entry[0])
      return pick == entry[1] ? roundResult.win : roundResult.lose;
    if(enemyPick == entry[1])
      return pick == entry[2] ? roundResult.win : roundResult.lose;
    if (enemyPick == entry[2])
      return pick == entry[0] ? roundResult.win : roundResult.lose;
  }
  
  function throwResult(){
    console.log('changing result and checking win')
    let winRound = html.result.innerHTML == roundResult.win;
    html.result.classList.remove('success','lose');
  
    if(html.result.innerHTML != roundResult.draw){
        html.result.classList.add(winRound ? 'success' : 'lose');
        winRound ? scores.me += 1 : scores.opponent += 1 ;
    }
  
    //update Scores
    html.myScore.textContent = 'My Score: ' + scores.me;
    html.eScore.textContent = 'Opponent Score: ' + scores.opponent;
  
    if (scores.me ==  5 || scores.opponent == 5){
      html.nextRound.innerHTML = ''; // to remove the nextRound button
      scores.me == 5 ? win() : lose();
      startNewGame();
    }
  }
  
  function win(){
    alert('win, click new game');
    html.result.innerHTML = 'Congratulations You Win!';
  }
  function lose(){
    alert('lose, click new game');
    html.result.innerHTML = 'LOSER!!!';
  }
  
  function startNewGame(){
    const newGame = document.getElementById('new-game');
    html.nextRound.innerHTML = null ;
    html.resultField.getElementsByTagName("P")[1].innerHTML= null;
    newGame.innerHTML = '<button>New Game</button>';
    newGame.getElementsByTagName('BUTTON')[0]
    .addEventListener('click', function(){
      scores.me = 0;
      scores.opponent = 0;
      html.myScore.textContent = 'My Score: ' + scores.me;
      html.eScore.textContent = 'Opponent Score: ' + scores.opponent;
      html.result.innerHTML = '';
      html.result.classList.remove('success', 'lose');
      html.nextRound.innerHTML = null;
      for(i=0;i < entryChoice.length; i++){
       entryChoice[i].disabled = false;
     }
      enemyPick = entry[Math.floor(Math.random() * entry.length)];
      newGame.innerHTML = '';
    });
  }
  