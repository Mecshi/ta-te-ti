import { useState } from "react"
import { Square } from "./components/Square"
import confetti from "canvas-confetti"
import {TURNS} from './components/constants'
import { WinnerModal } from "./components/WinnerModal"
import { checkWinnerFrom, checkEndGame } from "./logic/board"



//ver spreed operator and rest operator
function App() {
  // creacion de tablero de juego: Array de 9 filas rellenas con null en un UseState y le ponemos el array de 9 filas como estado inicial
  const [board, setBoard] = useState(Array(9).fill(null))

  //creamos un useState para saber de quien es el turno, en este caso comienza siempre X
  const [turn, setTurn] = useState(TURNS.X)
  //estado si hay un ganador
  const [winner, setWinner]= useState(null) //null no hay ganador, false hay un empate



  //para resetear el juego, hay que poner los estados a sus valores originales

  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  


  const updateBoard = (index) => {
    //si ya tiene algo en esa posicion, entonces no lo actualiza
    if (board[index] || winner) return 
    //actualizar el tablero
    const newBoard =[...board]
    newBoard[index]=turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X  
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner =checkWinnerFrom(newBoard)
    if (newWinner){
      
      confetti()
      setWinner(newWinner)
      
      
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (

    <main className='board'>

      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Reset Game!</button>

      <section className='game'>
        {/* retornamos desde un map para rellenar el board de juego  */}
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }

      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>)
}

export default App
