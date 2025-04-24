function Gameboard() {
  const rows = 3
  const columns = 3

  const board = []

  for (let i = 0; i < rows; i++) {
    board[i] = []
    for(let j = 0; j < columns ; j++) {
      board[i].push(cell())
    }
  }
  
  const getBoard = () => board



  return { getBoard

  }

}

//cell function
function cell() {

  let value = 0

  const getValue = () => value

  const setValue = (newValue) => {

    value = newValue
  }

  return {
    getValue,
    setValue
  }

}

function GameController (
  playerOneName = "player one",
  playTwoName = "player two") {

    const gameboard = Gameboard()

    const players = [
      {
        name:playerOneName,
        symbol : "X"
      },
      {
        name: playTwoName,
        symbol: "O"
      }
    ]

    let activePlayer = players[0]
    let gameover = false
    
    const switchPlayerTurn = () => {

      activePlayer = activePlayer === players[0]? players[1]: players[0] 
    }

    const getActivePlayer = () => activePlayer
    const getGameover = () => gameover

    const checkWinner = () =>{
        
      const board = gameboard.getBoard()

      const Symbol = activePlayer.symbol
    
      const ROWS = board.length
      const COLS = board[0].length
      
      //check rows 
      for (let row = 0; row < ROWS; row++) {
    
        if (
          board[row][0].getValue() === Symbol &&
          board[row][1].getValue() === Symbol &&
          board[row][2].getValue() === Symbol
        ) return `${activePlayer.name} wins!`
      }
    
      //check cols
    
      for (let col = 0; col < COLS; col++) {
        if (
          board[0][col].getValue() === Symbol &&
          board[1][col].getValue() === Symbol &&
          board[2][col].getValue() === Symbol
        ) return `${activePlayer.name} wins!`
      }
    
      //check diagonals
      
      if(
        board[0][0].getValue() === Symbol &&
        board[1][1].getValue() === Symbol &&
        board[2][2].getValue() === Symbol
      )return `${activePlayer.name} wins!`
    
      if(
        board[0][2].getValue() === Symbol&&
        board[1][1].getValue() === Symbol &&
        board[2][0].getValue() === Symbol
      ) return `${activePlayer.name} wins!`
    
      //check draw 
    
      const isDraw = board.flat().every(cell => cell.getValue() !== 0);
      if (isDraw) {
        return "It's a draw!";
      }
    
    }      
      
    const playRound = () => {

      if(gameover) return 
      
      let results = checkWinner()
      if(results) {
        
        gameover = true
        return results
        
      }

      switchPlayerTurn()

    }

    return {
      playRound,
      getActivePlayer,
      getGameover,
      getBoard: gameboard.getBoard,
      
    }

}

function screenController () {

  let game = GameController()

  const playerTurnDiv = document.querySelector(".turn")
  const boardDiv = document.querySelector(".board")
  const resultDiv = document.querySelector(".result")
  const resetBtn = document.querySelector("#resetBtn")
  

  const updateScreen = () => {

    boardDiv.textContent = ""

    const board = game.getBoard()

    const activePlayer = game.getActivePlayer()

    playerTurnDiv.textContent = `${activePlayer.name} turns`
    board.forEach((row) => {

      row.forEach((cell) => {

        const cellButton = document.createElement("button")

        cellButton.classList.add("cell")

      

        cellButton.textContent = cell.getValue()

        cellButton.addEventListener("click", ()=> {
          
          
          if(cell.getValue() !== 0 || game.getGameover()) return

          cell.setValue(activePlayer.symbol)
          

          let result = game.playRound()
          resultDiv.textContent = result

          updateScreen()
          
          
        })
       

        boardDiv.appendChild(cellButton)
      })

      })

  }

  const resetGame = () => {   
    game = GameController()          
    resultDiv.textContent = ""          
    playerTurnDiv.textContent = ""       
    updateScreen()   
  }
  resetBtn.addEventListener("click", resetGame )


 updateScreen()

}

screenController()


