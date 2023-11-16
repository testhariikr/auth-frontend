import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
//import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigate } from "react-router-dom";

function WelcomeUser() {
    const navigate=useNavigate();
    function Logout(){
        localStorage.setItem('Login', false);
        localStorage.setItem('sesionToken', null);
        navigate("/login")

    }
    async function getuser(){
        const {data} = await axios.post('https://auth-backend-9794.onrender.com/userprofile', 
        { 
         nothig: ''
       },{ 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
    if(data.user===true){
      setfstname(data.fstName)
      return setname(data.userName)
    }
    setname("can't get name")
    }
  const [name,setname]=useState("")
  const [fstname,setfstname]=useState("")
  useEffect(() => {
   getuser();
  }, []);
  

    
   

  return (
    <div className="App">
      <header className="App-header">
          Welcomee
        <div>
          <p>
            {name}
            <br></br>
          </p>
        </div>
        <div>
            <button onClick={Logout}>Logout</button>
        </div>
      </header>
      <div className="App">
      <footer className="App-header">
        <div >
          This Website will have many feature in upcoming days {fstname}....Thank you
        </div>
        <br></br>
        <div >
          Team Harii Prasath K R
        </div>
      </footer>
      </div>
      
    </div>
  );
  }
export default WelcomeUser;

