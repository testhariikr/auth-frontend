import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { Link } from "react-router-dom";

function Forgetpassword() {
  const [sendmail,setsendmail]=useState("")
  const [inpdata,setInpdata]=useState({
    
    email:"" 
});

function handelinpcng(event){
    const{name,value}=event.target;
    setInpdata(
        (inpdta)=>(
            {...inpdata,[name]:value }
        )
    )
}
async function HandelSumit(e){
  e.preventDefault ()
    const {data} = await axios.post('https://auth-backend-9794.onrender.com/forgotpassword',inpdata)
    setInpdata({
      email:"" 
    });
    console.log(data)
    if(data.status==="ok"){
      return setsendmail("mail sended")
    }
    setsendmail("mail not send")
}
  return (
    <div className="App">
      <header className="App-header">
      
            Forgot Password
          <div>
              <br></br>
              <input name="email" placeholder="Email" value={inpdata.email}  onChange={handelinpcng}/>
              <br></br>
              <button onClick={HandelSumit}>submit</button>
              <br></br>
              <Link to="/login"><button > Back</button></Link>
          </div>
          <div>
            <p>
              {sendmail}
            </p>
          </div>
      </header>
    </div>
  );
}

export default Forgetpassword;

