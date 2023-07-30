
//MANAGING THE BOARD
const gameBoard = (() =>{
      let arrayBoard = ["","","","","","","","",""];
      let board = document.querySelector(`.board`);
      
      //RENDER BOARD
      const displayBoard = () =>{
        let tempBoard = "";
        arrayBoard.forEach((cell,index) =>{
            tempBoard += `<div class="cell" id=cell-${index}>${cell}</div>`
        })
        board.innerHTML = tempBoard;

        const cells = document.querySelectorAll(`.cell`);

        cells.forEach((cell) => {
            cell.addEventListener(`click`, gamePlay.click);
        })
      }

      //UPDATING THE GAMEBOARD
      const updateBoard = (index, value) =>{
         arrayBoard[index] = value;
         displayBoard();
      }

      //ACCESSOR PROPERTY FOR arrayBord
      const getArrayBoard = () => arrayBoard;


      return{
        displayBoard,
        updateBoard,
        getArrayBoard,
        
      } 
})();

//GAME LOGIC
const gamePlay = (() => {
        let players = [];
        let currentPlayerIndex;
        let gameOver;
        const alert = document.querySelector(`.alert`);
        
        //INTIALIZING GAME SET-UP
        const start = () =>{
            players = [`X`,`O`];
            currentPlayerIndex = 0;
            gameOver = false;
            gameBoard.displayBoard();
        }

        //ACTIONS
        const click = (event) =>{

            let index = parseInt(event.target.id.split(`-`)[1]);

            if(gameBoard.getArrayBoard()[index] !== ""){
                return;
            }
            gameBoard.updateBoard(index, players[currentPlayerIndex]);

            if(checkWin(gameBoard.getArrayBoard(),players[currentPlayerIndex])){
                gameOver = true;
                if(currentPlayerIndex === 0)    
                    alert.innerHTML = "Player X wins";
                else if(currentPlayerIndex === 1)
                alert.innerHTML = "Player O wins";
            }

            else if(checkTie(gameBoard.getArrayBoard(),players[currentPlayerIndex])){
                gameOver = true;
                alert.innerHTML = "It's a Tie";
            }

            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
            
        }
        //RESTART
        const reset = () => {
              for(let i = 0; i < 9; i++){
                gameBoard.updateBoard(i,"");
              }
              gameBoard.displayBoard;
              alert.innerHTML = "";
        }

        return {
            start,
            click,
            reset,
        }
})();

const checkWin = (board) => {
    const winComb = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0; i < winComb.length; i++){
        const [a,b,c] = winComb[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
}

const checkTie = (board) =>{
    return board.every(cell => cell !== "");
}




const btnPlay = document.querySelector(`.btnPlay`);
const btnReset = document.querySelector(`.btnReset`);

btnPlay.addEventListener(`click`, () =>{
    const main = document.getElementById(`main`);
    const intro = document.getElementById(`intro`);
    const body = document.querySelector(`body`);
    

    main.style.cssText = `display: flex`;
    intro.style.cssText = `display: none`;
    body.style.cssText = `overflow: default`;
    btnReset.style.cssText = `display: block`;
    gamePlay.start();
})

btnReset.addEventListener(`click`, () => {
    gamePlay.reset();
})



