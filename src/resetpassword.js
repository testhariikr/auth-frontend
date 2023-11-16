import React, { useState } from "react";
import './App.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom/dist/umd/react-router-dom.development";

function ResetPassword() {
  const navigate = useNavigate();
  const { resettoken } = useParams();
  const [auth, setAuth] = useState("");
  const [inpdata, setInpdata] = useState({
    password: ""
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
    if (inpdata.password === "") {
      setAuth("Please enter a password");
      return;
    }

    const { data } = await axios.post(`https://auth-backend-9794.onrender.com/resetpassword/${resettoken}`, inpdata);

    setInpdata({
      password: ""
    });

    console.log(data);

    if (data.status === "ok") {
      setAuth("Password reset successful");
      return navigate("/login");
    }

    setAuth("Could not reset password");
  }

  return (
    <div className="App">
      <header className="App-header">
        Reset Password
        <div>
          <br></br>
          <input name="password" placeholder="Password" value={inpdata.password} onChange={handelinpcng} />
          <br></br>
          <button onClick={HandelSumit}>Submit</button>
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
