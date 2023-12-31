import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
//import { Link } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link, useNavigate } from "react-router-dom";
import linkmanager from "./link";
const lnk=linkmanager();
function WelcomeUser() {
    const navigate=useNavigate();
    function Logout(){
        localStorage.setItem('Login', false);
        localStorage.setItem('sesionToken', null);
        navigate("/login")

    }
    async function getuser(){
        const {data} = await axios.post(lnk+'userprofile', 
        { 
         nothig: ''
       },{ 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
    if(data.user===true){
      return setname(data.userName)
    }
    setname("Can't Fetch Details")
    navigate("/login")
    }
  const [name,setname]=useState("Fetching Details....")

  useEffect(() => {
   getuser();
  },[]);
  

    
   

  return (
    <div className="App">
      <header className="App-header">
          Welcome
        <div>
          <p>
            {name}
            <br></br>
          </p>
        </div>
        <br></br>
        <br></br>
        <Link to="/usernotes">Go Your Notes</Link>
        <div>
            <button onClick={Logout}>Logout</button>
        </div>
      </header>
    </div>
  );
  }
export default WelcomeUser;

