import { useRef, useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
function App() {
  const [board,setBoard] = useState(['','','','','','','','','']);
  const [xturn,setXTurn] = useState(true);
  const [scores,setScores] = useState({xScore:0,oScore:0,tieScore:0})
  const [result,setResult] =  useState('')
  const preventclick = useRef(false)
  const xMove = useRef([])
  const oMove = useRef([])
  const winnerStatus = useRef(false)
  const popup = document.getElementById("popup")
  const tiles = document.getElementsByClassName("tile");
  let cuttingBoard

  const handlePieces = (index) =>{
    if (board[index] !== ''){
      return
    }
    preventclick.current = true
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
      preventclick.current = false
      
      
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
      preventclick.current = false
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
    let filterResultDiagonal_315deg
    let filterResultDiagonal_45deg
    // Check row and column
    for (let i=0; i<3; i++){
      filterResultRow = move.current.filter(e=> e[0] === i)
      filterResultCol = move.current.filter(e=> e[1] === i)
      stepCheck(filterResultRow,player)
      stepCheck(filterResultCol,player)
    }
    // Check diagonal
    filterResultDiagonal_315deg = move.current.filter(e=> e[0] === e[1])
    filterResultDiagonal_45deg = move.current.filter(e=> e[0]+ e[1] === 2)
    stepCheck(filterResultDiagonal_315deg,player)
    stepCheck(filterResultDiagonal_45deg,player)

    if(!winnerStatus.current && (xMove.current.length + oMove.current.length === 9)){
      countScore("0")
      popup.style.top = "10px"
      setResult("tie")
    }
  }

  const stepCheck = (filterResult,player) =>{
    if(filterResult.length === 3){
      countScore(player)
      setResult(player)
      popup.style.top = "10px"
      winnerStatus.current =true
    }
  }

  const countScore = (player) =>{
    
    if(player === 'X'){
      document.getElementById("scoreX").style.boxShadow = "0 0 20px #4ECCA3"
      setScores(prv=> {return{...prv, xScore:prv.xScore + 1 }})
    }
    else if(player === 'O'){
      document.getElementById("scoreO").style.boxShadow = "0 0 20px #FA5B5B"
      setScores(prv=> {return{...prv, oScore:prv.oScore + 1 }})}
    else{
      document.getElementById("scoretie").style.boxShadow = "0 0 20px #EEEEEE"
      setScores(prv=> {return{...prv, tieScore:prv.tieScore + 1 }})}
    preventclick.current = true
  }

  const resetBoard = ()=>{
    preventclick.current = false
    setBoard(['','','','','','','','',''])
    xMove.current = []
    oMove.current = []
    winnerStatus.current = false
    for(let i=0; i<tiles.length; i++){
      tiles[i].className = "tile"
    }
  }

  const clearScore = () =>{
    setScores({xScore:0,oScore:0,tieScore:0})
  }

  const hiding = () => {
    document.getElementById("popup").style.top = "-150px";
    document.getElementById("scoreX").style.boxShadow = "0 0 0px #4ECCA3"
    document.getElementById("scoreO").style.boxShadow = "0 0 0px #FA5B5B"
    document.getElementById("scoretie").style.boxShadow = "0 0 0px #EEEEEE"
    resetBoard()
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
          <div id='scoreX' className='score'>
            <p>X</p>
            <p>{scores.xScore}</p>
          </div>
          <div id="scoretie"className='score '>
            <p>TIES</p>
            <p>{scores.tieScore}</p>
          </div>
          <div id='scoreO' className='score'>
            <p>O</p>
            <p>{scores.oScore}</p>
          </div>
          <button className='btn-clear' onClick={clearScore}>Clear Score</button>
         
        </footer>
      </div>
      <div id='popup' className='wrap-popup'>
            {(result === 'X')&& <p className='wrap-result'><span className='resule xwin'>{result}</span> WIN</p>}
            {(result === 'O')&& <p className='wrap-result'><span className='resule owin'>{result}</span> WIN</p>}
            {(result === 'tie')&& <p className='wrap-result'>TIE</p>}
            {(result !== 'tie') ? <p className='point'>+1 point</p> : <p></p>}
            <button className='close' onClick={()=>hiding()}>Close</button>
        </div>
    </div>
  );
}

export default App;
