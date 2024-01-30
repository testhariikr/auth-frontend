import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import linkmanager from "./link";
const lnk=linkmanager();
function Register() {
  const navigate=useNavigate();
  const [chckuser,setchckuser]=useState("")
  const [inpdata,setInpdata]=useState({
    userName:"",
    fstName:"",
    lstName:"",
    email:"" ,
    password:""
  });

  function cheklogin(){
    if(localStorage.getItem("Login")==="true"){
      return navigate("/user")
    }
  }

  useEffect(() => {
    cheklogin();
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
    e.preventDefault();
    setchckuser("Creating Account ....Please Wait ");
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setchckuser("Please fill in all fields");
        return;
      }
    }

    const {data} = await axios.post(lnk+'auth/signin', inpdata);

    setInpdata({
      userName:"",
      fstName:"",
      lstName:"",
      email:"" ,
      password:""
    });

    console.log(data);

    if(data.status==="ok"){
      setchckuser("Login okay");
      return navigate("/auth/login");
    }

    setchckuser("Already exist");
  }

  return (
    <div className="App">
      <header className="App-header">
        Register
        <div>
          <br></br>
          <input name="userName"  placeholder="User Name" value={inpdata.userName} onChange={handelinpcng}/>
          <br></br>
          <input name="fstName" placeholder="First Name" value={inpdata.fstName} onChange={handelinpcng}/>
          <br></br>
          <input name="lstName" placeholder="Last Name" value={inpdata.lstName} onChange={handelinpcng}/>
          <br></br>
          <input name="email" type="email" placeholder="Email" value={inpdata.email} onChange={handelinpcng}/>
          <br></br>
          <input name="password" type="password" placeholder="Password" value={inpdata.password} onChange={handelinpcng}/>
          <br></br>
          <button onClick={HandelSumit}>Create</button>
          <br></br>
          Already have an Account <Link to="/auth/login">Login.</Link>
        </div>
        <div>
          <p>
            {chckuser}
          </p>
        </div>
      </header>
    </div>
  );
}

export default Register;
