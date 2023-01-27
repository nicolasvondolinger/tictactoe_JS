function changeClass(ev, click = ''){
  const targetId = ev.target.id
  if (targetId != "" && document.getElementById(targetId).className == 'square' && verifyVictory() == 0 && control == 0) {
    click = changePlayerTurn()
    const element = document.getElementById(targetId)
    element.classList.add(click)
    verifyVictory()
    if (verifyVictory() == 0) {
      alertTurn(click)
    }
  }
}

function changePlayerTurn() {
  if (player == "" || player == 'o') {
    player = "x"
    return player
  } else if (player == "x") {
    player = "o"
    return player
  }
}

function alertTurn(player){
  if (player == 'o' && verifyDraw() == 0 && control == 0){
    const name = document.getElementById("player1").value
    document.getElementById(
      "turn"
    ).innerHTML = `<h2 class='playerOneTurnAlert'>${name.toUpperCase()} TURN</h2>`
  } else if (player == "x" && verifyDraw() == 0 && control == 0) {
    const name = document.getElementById("player2").value
    document.getElementById(
      "turn"
    ).innerHTML = `<h2 class='playerTwoTurnAlert'>${name.toUpperCase()} TURN</h2>`
  }
}

function verifyVictory(){
  for (let i = 0; i < 7; i += 3) {
    if(document.getElementById(1 + i).className == document.getElementById(2 + i).className && document.getElementById(1 + i).className == document.getElementById(3 + i).className && (document.getElementById(1+i).className == 'square x' || document.getElementById(1+i).className == 'square o')){
      victoryAlert(document.getElementById(1 + i).className)
      contrastVictory(1+i, 2+i, 3+i)
      return 1
    }
  }

  if(document.getElementById(1).className == document.getElementById(5).className && document.getElementById(1).className == document.getElementById(9).className && (document.getElementById(1).className == 'square x' || document.getElementById(1).className == 'square o')){
    victoryAlert(document.getElementById(1).className)
    contrastVictory(1, 5, 9)
    return 1
  }

  if(document.getElementById(3).className == document.getElementById(5).className && document.getElementById(3).className == document.getElementById(7).className && (document.getElementById(3).className == 'square x' || document.getElementById(3).className == 'square o')){
    victoryAlert(document.getElementById(3).className)
    contrastVictory(3, 5, 7)
    return 1
  }

  for (let i = 0; i < 3; i++){
    if(document.getElementById(1 + i).className == document.getElementById(4 + i).className && document.getElementById(1 + i).className == document.getElementById(7 + i).className && (document.getElementById(1+i).className == 'square x' || document.getElementById(1+i).className == 'square o')){
      victoryAlert(document.getElementById(1 + i).className)
      contrastVictory(1 + i, 4 + i, 7 + i)
      return 1
    }
  }

  verifyDraw()

  return 0
}

function victoryAlert(winner) {
  if (winner == "square x") {
    const name = document.getElementById("player1").value
    document.getElementById(
      "turn"
    ).innerHTML = `<h2 class = 'winnerAlert'>${name.toUpperCase()} won the match! <h2>`
    increasePoints(winner)
  } else {
    const name = document.getElementById("player2").value
    document.getElementById(
      "turn"
    ).innerHTML = `<h2  class = 'winnerAlert'>${name.toUpperCase()} won the match! <h2>`
    increasePoints(winner)
  }
}

function contrastVictory(square_one, square_two, square_three){
  if(document.getElementById(square_one).className == 'square x'){
    document.getElementById(square_one).className = "square x contrast"
    document.getElementById(square_two).className = "square x contrast"
    document.getElementById(square_three).className = "square x contrast"
  } else if(document.getElementById(square_one).className == 'square o'){
    document.getElementById(square_one).className = "square o contrast"
    document.getElementById(square_two).className = "square o contrast"
    document.getElementById(square_three).className = "square o contrast"
  }
}

function verifyDraw(){
  for (let i = 1; i < 10; i++) {
    if(document.getElementById(i).className != 'square x' && document.getElementById(i).className != 'square o'){
      return 0
    } else if (i == 9){
      drawAlert()
      return 1
    }
  }
}

function drawAlert(){
  document.getElementById("turn").innerHTML = `<h2 class='drawAlert'>DRAW<h2>`
}

function increasePoints(winner){
  if(winner == 'square x' && control == 0){
    const points = parseFloat(document.getElementById("player1_points").value) + 1
    document.getElementById('player1_points').value = points
    control = 1
  } else if(winner == 'square o' && control == 0){
    const points = parseFloat(document.getElementById("player2_points").value) + 1
    document.getElementById('player2_points').value = points
    control = 1
  }
}

function resetGame(){
  for (let i = 1; i < 10; i++) {
    const element = document.getElementById(i)
    element.classList.remove("contrast")
    element.classList.remove('x')
    element.classList.remove('o')
  }
  document.getElementById('turn').innerHTML = ''
  control = 0
  alertTurn(player)
}

function resetScore(){
  document.getElementById("player1_points").value = 0
  document.getElementById("player2_points").value = 0
}

document.addEventListener('click', changeClass)

var player = "x"
var control = 0

alertTurn(player)