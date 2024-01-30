import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import linkmanager from "./link";
const lnk=linkmanager();
function WelcomeUser() {
    const navigate=useNavigate();
    function Logout(){
        localStorage.setItem('Login', false);
        localStorage.setItem('sesionToken', null);
       return navigate("/auth/login")

    }
    async function getuser(){
        const {data} = await axios.post(lnk+'/user', 
        { 
         nothig: ''
       },{ 
         headers: {
           'acesstoken': localStorage.getItem('sesionToken')
         }
     })
     console.log(data)
    if(data.user===true){
      return setname(data.userData.userName)
    }
    setname("Can't Fetch Details")
    navigate("/auth/login")
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
        <Link to="/user/groups">Go to Groups</Link>
        <div>
            <button onClick={Logout}>Logout</button>
        </div>
      </header>
    </div>
  );
  }
export default WelcomeUser;

