const container = document.getElementById("container");
class game{
  model;
  currentplayer;
  isGameStopped;
  constructor() {
    this.currentplayer = Math.random() < 0.5 ? 1 : 2;
    this.isGameStopped = false;
    this.model = Array(3).fill().map(() => Array(3).fill(0));
    if (this.currentplayer == 2){
      this.computerTurn();
      this.currentplayer = 1;
    }
  }
  UpdateCellView(element, x, y, value){
      switch (value){
        case 0:
          element.innerHTML = " ";
          element.style.backgroundColor = "#474747";
          break;
        case 1:
          element.innerHTML = "X";
          element.style.backgroundColor = "#474747";
          element.style.color = "#ff1303";
          element.style.bold;
          break;
        case 2:
          element.innerHTML = "O";
          element.style.backgroundColor = "#474747";
          element.style.color = "#03bcff";
      }
  }

  UpdateView(element, x, y){
    this.UpdateCellView(element, x, y, this.model[x][y]);
  }

  checkWin(x,y, n){
    var win = true;
    for (var i = 0; i<3; i++){
      if (this.model[i][y] != n){
        win = false;
        break;
      }
    }
    if (win) return win;
    else win = true;
    for (var j = 0; j< 3; j++){
      if (this.model[x][j] != n){
        win = false;
        break;
      }
    }
    if (win) return win;
    else win = true;
    var j = 0;
    for (var i = 0; i<3; i++)
    {

      if (this.model[i][j]!= n){
        win = false;
        break;
      }
      j++;
    }
    if (win) return win;
    else win = true;
    j=2;
    for (var i = 0;  i<3; i++)
    {
      if (this.model[i][j]!=n){
        win = false;
        break;
      }
      j--;
    }
    return win;
  }

  hasEmpty(){
    for (var i = 0; i<3;i++){
      for (var j = 0; j<3;j++)
      {
        if(this.model[i][j]==0) return true;
      }
    }
    return false;
  }

  setSignAndChek(element, x, y ){
    this.model[x][y] = this.currentplayer;
    this.UpdateView(element, x ,y)
    if (this.checkWin(x, y, this.currentplayer)){
      this.isGameStopped = true;
      if(this.currentplayer == 1){
        document.getElementById("message-text-2").innerHTML = `Вы победили!!!`;
        document.getElementById("message-text-2").style.visibility = "visible";
        document.getElementById("message-text-2").style.color = "#3fc9b6"
        document.getElementById("button").style.visibility = "visible";
      }
      else {
        document.getElementById("message-text-2").innerHTML = `Вы проиграли(`;
        document.getElementById("message-text-2").style.visibility = "visible";
        document.getElementById("message-text-2").style.color = "#c9893f"
        document.getElementById("button").style.visibility = "visible";
      }
      return;
      }
    if (!this.hasEmpty()){
      document.getElementById("message-text-2").innerHTML = `Ничья`;
      document.getElementById("message-text-2").style.visibility = "visible";
      document.getElementById("message-text-2").style.color = "#ffe45e"
      document.getElementById("button").style.visibility = "visible";
      return
    }
  }
  onMouseLeftClick(element){

    var parts = element.id.split("-");
    var x = parseInt(parts[1]);
    var y = parseInt(parts[2]);
    console.log(this.model[x][y])
    if(this.model[x][y] != 0 || this.isGameStopped){
      return;
    }
    this.setSignAndChek(element, x, y);
    this.currentplayer = 3-this.currentplayer;
    this.computerTurn();
    this.currentplayer = 3-this.currentplayer;
    }

    computerTurn(){
      if (this.model[1][1]==0){
        console.log("computerTurned");
        this.setSignAndChek(document.getElementById(`cell-${1}-${1}`), 1,1);
        return;
      }
      for(var i = 0; i<3;i++){
        for (var j = 0; j<3; j++){
          if(this.checkFututreWin(i,j,this.currentplayer)){
            this.setSignAndChek( document.getElementById(`cell-${i}-${j}`),i,j)
            return;
          }
        }
      }
      for(var i = 0; i<3;i++){
        for (var j = 0; j<3; j++){
          if(this.checkFututreWin(i,j,3 - this.currentplayer)){
            this.setSignAndChek( document.getElementById(`cell-${i}-${j}`),i,j)
            return;
          }
        }
      }
      for (var i = 0; i<3;i++){
        for (var j = 0; j < 3;j++){
          if (this.model[i][j]==0){
            this.setSignAndChek(document.getElementById(`cell-${i}-${j}`), i,j)
            return;
          }
        }
      }
    }

    checkFututreWin(x, y, n){
      if (this.model[x][y]!=0){
        return false;
      }
      this.model[x][y] = n;
      var isWin = this.checkWin(x, y, n);
      this.model[x][y] = 0;
      return isWin;
    }
}
for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    const cell = document.createElement('div'); // Создаем новый элемент
    cell.className = 'Cell';
    cell.id = `cell-${row}-${col}`;
    cell.textContent = " ";
    cell.onclick = () => OnclicEvent(cell); // Привязываем функцию
    container.appendChild(cell);
  }
}
var Game = new game();
function OnclicEvent(element){
  Game.onMouseLeftClick(element);
  console.log("clicked");
}
document.getElementById("button").style.visibility = "hidden";
document.getElementById("button").onclick = function () {
  // Перезагрузка страницы
  location.reload();
};
