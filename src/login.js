import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate();
  const [auth,setauth]=useState("")
  const [inpdata,setInpdata]=useState({
   
    email:"" ,
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
  const {data} = await axios.post('https://auth-backend-9794.onrender.com/login', inpdata)

    setInpdata({
      
      email:"" ,
      password:""
    });
    console.log(data)
    if(data.status==="ok"){
      localStorage.setItem('sesionToken', data.token);
      localStorage.setItem('Login', true);
      setauth(data.token)
      return navigate("/hellouser")
    }
    localStorage.setItem('Login', false);
    setauth("could not verify")
   
}

  return (
    <div className="App">
      <header className="App-header">
          Login
          <div>
              <br></br>
              <input name="email" placeholder="Email" value={inpdata.email}  onChange={handelinpcng}/>
              <br></br>
              <input name="password" placeholder="Password" value={inpdata.password}  onChange={handelinpcng}/>
              <br></br>
              <button onClick={HandelSumit}>submit</button>
              <br></br>
              <Link to="/forgetpassword"><button >Forget Password ?</button></Link>
              <br></br>
              No Acount? <Link to="/">Create</Link>
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

export default Login;

