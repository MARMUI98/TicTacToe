import { useRef, useState } from 'react';
import './App.css';
import './Popus.css';
import Popup from './Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [board,setBoard] = useState(['','','','','','','','','']);
  const [xturn,setXTurn] = useState(true);
  const [scores,setScores] = useState({xScore:0,oScore:0,tieScore:0})
  const [result,setResult] =  useState('')
  const xMove = useRef([])
  const oMove = useRef([])
  let [preventclick,setPreventClick] = useState(false)
  const [winnerStatus,setWinnerState] = useState(false)
  const popup = document.getElementById("popup")
  let cuttingBoard
  const tiles = document.getElementsByClassName("tile");
  const handlePieces = (index) =>{
    setPreventClick(true)
    if (board[index] !== ''){
      return
    }
    
    if (xturn){
      cuttingBoard = board
      cuttingBoard.splice(index,1,'X')
      setBoard(cuttingBoard)
      xMove.current.push(mapmoving(index))
      tiles[index].className += " x-tile"
      setTimeout(() =>{
        checkwinner(xMove,"X")
      },200)
      setXTurn(false)
    }else{
      cuttingBoard = board
      cuttingBoard.splice(index,1,'O')
      setBoard(cuttingBoard)
      oMove.current.push(mapmoving(index))
      tiles[index].className += " o-tile"
      setTimeout(() =>{
        checkwinner(oMove,"O")
      },200)
      setXTurn(true)
    }
    
  }
  const mapmoving = (index) =>{

    let move 
    switch(index){
      case 0: return move = [0,0];
      case 1: return move = [0,1];
      case 2: return move = [0,2];
      case 3: return move = [1,0];
      case 4: return move = [1,1];
      case 5: return move = [1,2];
      case 6: return move = [2,0];
      case 7: return move = [2,1];
      case 8: return move = [2,2];
      default: return move
    }
  }
  const checkwinner = (move,player) =>{
    let filterResultRow
    let filterResultCol
    // Check row and column
    for (let i=0; i<3; i++){
      filterResultRow = move.current.filter(e=> e[0] === i)
      filterResultCol = move.current.filter(e=> e[1] === i)
      if(filterResultRow.length === 3){
        countScore(player)
        setResult(player)
        popup.style.top = "10px"
        setWinnerState(true)
        resetBoard()
      }
      if(filterResultCol.length === 3){
        countScore(player)
        setResult(player)
        popup.style.top = "10px"
        setWinnerState(true)
        resetBoard()
      }
    }
    // Check diagonal
    let filterResultDiagonal_315deg
    let filterResultDiagonal_45deg
    filterResultDiagonal_315deg = move.current.filter(e=> e[0] === e[1])
    filterResultDiagonal_45deg = move.current.filter(e=> e[0]+ e[1] === 2)
    if(filterResultDiagonal_315deg.length === 3){
      countScore(player)
      setResult(player)
      popup.style.top = "10px"
      setWinnerState(true)
      resetBoard()
    }
    if(filterResultDiagonal_45deg.length === 3){
      countScore(player)
      setResult(player)
      popup.style.top = "10px"
      setWinnerState(true)
      resetBoard()
    }
    if(!winnerStatus && (xMove.current.length + oMove.current.length > 8)){
      countScore("0")
      popup.style.top = "10px"
      setResult("tie")
      resetBoard()
    }
    setPreventClick(false)
  }

  const countScore = (player) =>{
    if(player === 'X'){setScores(prv=> {return{...prv, xScore:prv.xScore + 1 }})}
    else if(player === 'O'){setScores(prv=> {return{...prv, oScore:prv.oScore + 1 }})}
    else{setScores(prv=> {return{...prv, tieScore:prv.tieScore + 1 }})}
  }
  const resetBoard = ()=>{
    setBoard(['','','','','','','','',''])
    xMove.current = []
    oMove.current = []
    setWinnerState(false)
    for(let i=0; i<tiles.length; i++){
      tiles[i].className = "tile"
    }
  }

  const clearScore = () =>{
    setScores({xScore:0,oScore:0,tieScore:0})
  }

  return (
    <div className="App">
      <div className='wrap'>
        <header>
          <div className='turn'>
            {(xturn)? <p className='player x-tile'>X</p>:<p className='player o-tile'>O</p>}
            <span>TURN</span>
          </div>
          <button className='wrap-reset'><FontAwesomeIcon  icon={faRotateRight} onClick={resetBoard}/></button>
        </header>
        <div className='wrap-board'>
          {board.map((square,index) => 
            <button className='tile' key={index} type='button' disabled = {preventclick.current} onClick={() => {handlePieces(index)}}>{square}</button>
          )}
        </div>
        <footer>
          <div className='score scoreX'>
            <p>X</p>
            <p>{scores.xScore}</p>
          </div>
          <div className='score scoretie'>
            <p>TIES</p>
            <p>{scores.tieScore}</p>
          </div>
          <div className='score scoreO'>
            <p>O</p>
            <p>{scores.oScore}</p>
          </div>
          <button className='btn-clear' onClick={clearScore}>Clear Score</button>
         
        </footer>
      </div>
      <Popup result={result}/>   
    </div>
  );
}

export default App;
