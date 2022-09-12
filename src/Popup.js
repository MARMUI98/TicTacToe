import React from 'react'
import './Popus.css'
const popup = (props) => {
    ///const popup = document.getElementById("popup")
    const hiding = () => {
        document.getElementById("popup").style.top = "-150px";
    }
  return (
    <>
        <div id='popup' className='wrap-popup'>
            {(props.result === 'X')&& <p className='wrap-result'><span className='resule xwin'>{props.result}</span> WIN</p>}
            {(props.result === 'O')&& <p className='wrap-result'><span className='resule owin'>{props.result}</span> WIN</p>}
            {(props.result === 'tie')&& <p className='wrap-result'>TIE</p>}
            {(props.result !== 'tie') ? <p className='point'>+1 point</p> : <p></p>}
            <button className='close' onClick={()=>hiding()}>Close</button>
        </div>
    </>
  )
}

export default popup