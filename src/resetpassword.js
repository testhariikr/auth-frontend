import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom/dist/umd/react-router-dom.development";
function ResetPassword() {
  const navigate=useNavigate();
    const {resettoken}=useParams();
  const [auth,setauth]=useState("")
  const [inpdata,setInpdata]=useState({
    password:""
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
  const {data} = await axios.post(`https://auth-backend-9794.onrender.com/resetpassword/${resettoken}`, inpdata)

    setInpdata({
      password:""
    });
    console.log(data)
    if(data.status==="ok"){
      setauth("reseted")
      return navigate("/login")
    }
    setauth("could not reset")
    
    
   
}
  return (
    <div className="App">
      <header className="App-header">
      
          Reset Password
          <div>
              <br></br>
              <input name="password" placeholder="Password" value={inpdata.password}  onChange={handelinpcng}/>
              <br></br>
              <button onClick={HandelSumit}>submit</button>
          </div>
        <div>
          <p>
            {auth}
          </p>
        </div>
      </header>
    </div>
  );
}

export default ResetPassword;

