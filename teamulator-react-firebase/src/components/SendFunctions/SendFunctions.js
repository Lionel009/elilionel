import React, {useState} from 'react'

const SendFunctions = () => {

const [inputMail, setInputMail] = useState()

const cliktoFetch = async () => {
    let highscore = 150381
    console.log(highscore);
 
  
    let message = {
        message : ""
    }
    const blabala =  await window.fetch(`http://localhost:5001/solajump-cf/us-central1/addMessage` , { method: 'POST', body : JSON.stringify(message), headers: {"Content-Type": "application/json",},})
    console.log(blabala);  
}

const clickToSearch = async () => {

    const blabala =  await window.fetch(`http://localhost:5001/solajump-cf/us-central1/readContest` , { method: 'POST', body : "", headers: {"Content-Type": "application/json",},})
    console.log(blabala);  
}

const sendEmail = async (e) => {
    console.log('sendEmail activé');
    e.preventDefault()
    let message = {
        email : inputMail
    }
    console.log(message);
     const blabala =  await window.fetch(`http://localhost:5001/solajump/us-central1/sendEmail` , { method: 'POST', body : JSON.stringify( message ), headers: {"Content-Type": "application/json",},})
    console.log(blabala);  
}

    return (
        <div>
            <div className="text-light h1 text-center">GO Function</div>
            <button className='btn btn-warning' onClick={cliktoFetch}>cliktoFetch</button>
            <button className='btn btn-warning' onClick={clickToSearch}>click to Search</button>

            <br />
            <br />
            <br />
            <br />
            <br />
            <form >
            <input type="email" value={inputMail} className="form-control" placeholder="" id="inputEmail4"      onChange={(event) => { setInputMail(event.target.value)}} />
            <button type='submit' onClick={sendEmail}>Send Mail</button>
            </form>
        </div>
    )
}

export default SendFunctions
