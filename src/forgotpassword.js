import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { Link } from "react-router-dom";

function Forgetpassword() {
  const [sendmail, setSendmail] = useState("");
  const [inpdata, setInpdata] = useState({
    email: ""
  });

  function handelinpcng(event) {
    const { name, value } = event.target;
    setInpdata(
      (inpdta) => (
        { ...inpdata, [name]: value }
      )
    );
  }

  async function HandelSumit(e) {
    e.preventDefault();
    setSendmail("Sending Mail...Please Wait ");
    for (const key in inpdata) {
      if (inpdata[key] === "") {
        setSendmail("Please fill in all fields");
        return;
      }
    }

    const { data } = await axios.post('https://auth-backend-9794.onrender.com/forgotpassword', inpdata);
    
    setInpdata({
      email: ""
    });

    console.log(data);

    if (data.status === "ok") {
      setSendmail("Mail Sent Successfully...Check Your Mail Inbox");
    } else {
      setSendmail("Mail not Sent...Because The enter mail is not Registered (or) Due to Some Error");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      
        Forgot Password
        <div>
          <br></br>
          <input name="email" placeholder="Email" type="email" value={inpdata.email} onChange={handelinpcng} />
          <br></br>
          <button onClick={HandelSumit}>Send Mail</button>
          <br></br>
          <Link to="/login"><button>Back</button></Link>
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
